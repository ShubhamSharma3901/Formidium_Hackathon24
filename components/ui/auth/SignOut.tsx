"use client";
import React, { useState } from "react";

import Image from "next/image";
// import logo from "@/public/logo.png";
import { Button } from "../button";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

function SignOut() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	async function handleSubmit() {
		try {
			setIsSubmitting(true);
			await signOut({
				redirect: true,
				callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
			});
		} catch (err) {
			console.error("Failed to sign out", err);
			toast.error("Failed to sign out");
		} finally {
			setIsSubmitting(false);
		}
	}
	return (
		<>
			<div className='w-screen h-screen flex justify-center items-center'>
				<div className='laptop:w-[40%] tablet:w-[70%] border border-[#2c69d1] xsPhone:w-full h-fit p-20 flex flex-col justify-center items-center gap-10'>
					<div className='w-full text-center font-playfair text-3xl text-[#2c69d1]'>
						<div className='w-full flex justify-center items-center'>
							<div
								className='w-1/3 text-center uppercase flex justify-center items-center font-lato tracking-widest'
								onClick={() =>
									localStorage.setItem("category", JSON.stringify([""]))
								}>
								{/* <Image src={logo} alt={"logo"} className="w-10 h-auto mr-2" /> */}
								Formidium
							</div>
						</div>
					</div>
					<div className='w-full flex flex-col justify-center items-center gap-10'>
						<div className='w-full max-w-[400px]'>
							<Button
								type='button'
								onClick={handleSubmit}
								variant='default'
								className='mt-3 bg-[#2c69d1] hover:bg-[#2f5495] w-full py-6 rounded-xl shadow-xl hover:shadow-none transition font-lato tracking-widest'
								disabled={isSubmitting}>
								{isSubmitting ? (
									<Loader2 className={cn("animate-spin mr-2")} />
								) : (
									<span className='uppercase tracking-widest'> Sign-Out</span>
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignOut;
