"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
// import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

function Page() {
	const router = useRouter();

	return (
		<>
			<div className='w-screen h-[100dvh] flex justify-center items-center'>
				<div className='laptop:w-[40%] tablet:w-[70%] border border-[#2c69d1] xsPhone:w-full h-fit p-20 flex flex-col justify-center items-center gap-10'>
					<div className='w-full text-center font-playfair text-3xl text-[#2c69d1]'>
						<div className='w-full flex justify-center items-center'>
							<div
								className='w-1/3 text-center uppercase flex justify-center items-center font-lato tracking-widest'
								onClick={() =>
									localStorage.setItem("categories", JSON.stringify([""]))
								}>
								{/* <Image src={logo} alt={"logo"} className='w-10 h-auto mr-2' /> */}
								Formidium
							</div>
						</div>
					</div>
					<div className='w-full flex flex-col justify-center items-center'>
						<div className='w-full tablet:flex tablet:flex-row xsPhone:flex-col justify-center items-center max-w-[400px] text-sm bg-orange-50 tablet:text-start xsPhone:text-center rounded-lg p-6 font-lato tracking-widest text-orange-600 font-semibold'>
							<MailIcon className='tablet:w-[20%] w-full h-8 xsPhone:mb-4 tablet:mb-0' />
							<span className='tablet:w-[80%]'>
								A Sign-In Link has been sent to your email address.
							</span>
						</div>
					</div>
					<div className='w-full max-w-[400px]'>
						<Button
							type='button'
							onClick={() =>
								router.replace(`${process.env.NEXT_PUBLIC_APP_URL}`)
							}
							variant='default'
							className=' bg-[#2c69d1] hover:bg-[#2f5495] w-full py-6 rounded-xl shadow-xl hover:shadow-none transition font-lato tracking-widest'>
							<span className='uppercase tracking-widest'>Back Home</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Page;
