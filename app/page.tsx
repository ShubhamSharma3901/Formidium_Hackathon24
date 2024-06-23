import Image from "next/image";
import headerSVG from "@/public/Header Wave.svg";

import InputBox from "@/components/InputBox";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Chatbot from "@/components/ChatBot";
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
			className='min-h-screen w-screen relative flex flex-col justify-start items-center py-[2rem] gap-10'>
			<Image
				src={headerSVG}
				alt=''
				className='w-full h-auto absolute bottom-0'
			/>
			<p className='font-poppins text-white text-[min(5vh,5vw)] font-bold tracking-wide'>
				AI Report Delivery
			</p>
			<div className='w-full flex flex-col justify-center items-center fixed bottom-10'>
				<div className='w-full flex justify-center items-center'>
					{/* <InputBox /> */}
					<Chatbot />
				</div>
			</div>
		</div>
	);
}
