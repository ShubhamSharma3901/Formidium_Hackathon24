"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import EmailProvider from "next-auth/providers/email";
import { Input } from "../input";
import { Button } from "../button";
import { SetStateAction, useRef, useState } from "react";
import { Loader, Loader2, MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmailSignInForm({
	isSubmitting,
	setIsSubmitting,
}: {
	isSubmitting: boolean;
	setIsSubmitting: React.Dispatch<SetStateAction<boolean>>;
}) {
	const emailRef = useRef<string>();

	async function handleSubmit() {
		const email = emailRef.current;
		console.log(email);
		setIsSubmitting(true);
		await signIn("resend", {
			email,
			redirect: true,
			callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
		});
		setIsSubmitting(false);
	}

	return (
		<form className='w-full'>
			<div className='space-y-2'>
				<Input
					id='email'
					name='email'
					type='email'
					placeholder='hello@me.com'
					autoComplete='email'
					onChange={(e) => {
						emailRef.current = e.target.value;
					}}
					required
					className='py-6 rounded-xl font-lato tracking-widest'
					disabled={isSubmitting}
				/>
			</div>
			<Button
				type='button'
				onClick={handleSubmit}
				variant='default'
				className='mt-3 bg-[#2c69d1] hover:bg-[#2f5495] w-full py-6 rounded-xl shadow-xl hover:shadow-none transition font-lato tracking-widest'
				disabled={isSubmitting}>
				{isSubmitting ? (
					<Loader2 className={cn("animate-spin mr-2")} />
				) : (
					<MailIcon className='mr-5' />
				)}
				Continue with E-mail
			</Button>
		</form>
	);
}
