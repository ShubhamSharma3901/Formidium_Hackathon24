"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
// import logo from "@/public/logo.png";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

function Page() {
	const search = useSearchParams();
	const error = search.get("error");
	const router = useRouter();

	return (
		<>
			<div className='w-screen h-screen flex justify-center items-center'>
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
						<div className='w-full flex justify-center items-center gap-4 max-w-[400px] bg-red-50 text-start rounded-lg p-6 font-lato tracking-widest text-red-600 font-semibold'>
							<ExclamationTriangleIcon className='w-6 h-6' />

							{error === "Verification" ? (
								<>This Link might be used before or has expired</>
							) : (
								error ?? "Error"
							)}
						</div>
					</div>
					<div className='w-full max-w-[400px]'>
						<Button
							type='button'
							onClick={() =>
								router.replace(`${process.env.NEXT_PUBLIC_APP_URL}`)
							}
							variant='default'
							className=' bg-[#A77737] hover:bg-[#9a6c30] w-full py-6 rounded-xl shadow-xl hover:shadow-none transition font-lato tracking-widest'>
							<span className='uppercase tracking-widest'>Back Home</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Page;
