import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import EmailProvider from "next-auth/providers/nodemailer";
import { Resend } from "resend";
import MagicLinkEmail from "@/emails/MagicLinkEmail";
import { renderAsync } from "@react-email/components";
import Email from "next-auth/providers/nodemailer";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	secret: process.env.AUTH_SECRET,
	providers: [
		GoogleProvider({
			id: "google",
			clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
			clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
			profile(profile) {
				return {
					id: profile.sub,
					email: profile.email,
					name: profile.name,
					image: profile.image,
				};
			},
			authorization: {
				params: {
					prompt: "consent",
				},
			},
		}),
		EmailProvider({
			id: "resend",
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
			sendVerificationRequest: async (params) => {
				const { identifier, url } = params;
				const { host } = new URL(url);

				//     //! Below Line is Important in RESEND v2 as this will fix the webpack error during builds
				const rct = await renderAsync(MagicLinkEmail({ url, host }));

				await resend.emails.send({
					from: "Acme <onboarding@resend.dev>",
					to: [identifier],
					subject: `Log into ${host}`,
					text: `Sign into ${host}`,
					html: rct,
				});
			},
		}),
	],

	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
			},
		}),
		redirect: ({ url, baseUrl }) => {
			return url.startsWith(baseUrl)
				? Promise.resolve(url)
				: Promise.resolve(baseUrl);
		},
	},
	pages: {
		signIn: `/users/sign-in`,
		verifyRequest: `/users/verify`,
		signOut: `/users/sign-out`,
	},
});
