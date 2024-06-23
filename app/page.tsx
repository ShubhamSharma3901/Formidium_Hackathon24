import Image from "next/image";
import headerSVG from "@/public/Header Wave.svg";

import InputBox from "@/components/InputBox";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Chatbot from "@/components/ChatBot";
import NavBar from "@/components/NavBar";
import MobNav from "@/components/MobNav";
export default async function Home() {
	const session = await auth();

	if (!session?.user?.id) {
		redirect(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signin`);
	}
	console.log(session.user);
	return (
		<div
			style={{
				background:
					"linear-gradient(180deg, hsla(216, 100%, 50%, 1) -70%, hsla(228, 93%, 5%, 1) 19%, hsla(227, 100%, 5%, 1) 65%, hsla(228, 93%, 5%, 1) 50%)",
			}}
			className='min-h-screen w-screen relative flex flex-col justify-start items-center gap-10'>
			<Image
				src={headerSVG}
				alt=''
				className='w-full h-auto absolute bottom-0'
			/>
			{/* <p className='font-poppins text-white text-[min(5vh,5vw)] font-bold tracking-wide'>
				AI Report Delivery
			</p> */}
			<div className='w-full absolute top-[2rem] z-[200]'>
				<div className='xsPhone:hidden smTablet:block bg-transparent text-white relative'>
					<NavBar userId={session.user.id as string} />
				</div>
				<div className='smTablet:hidden xsPhone:block bg-transparent text-white relative z-[400]'>
					<MobNav userId={session.user.id as string} />
				</div>
			</div>
			<div className='w-full flex flex-col justify-center items-center '>
				<div className='w-full flex justify-center items-center'>
					<InputBox />
					{/* <Chatbot /> */}
				</div>
			</div>
		</div>
	);
}
