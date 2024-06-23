"use client";
import React, { useState } from "react";

import EmailSignInForm from "./EmailSignIn";
import GoogleSignInButton from "./GoogleSignIn";
import Image from "next/image";
// import logo from "@/public/logo.png";
import { Button } from "../button";

import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

function SignIn() {
	const [isSubmitting, setIsSubmitting] = useState(false);
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
							<EmailSignInForm
								isSubmitting={isSubmitting}
								setIsSubmitting={setIsSubmitting}
							/>
						</div>
						<div className='flex w-full justify-center items-center'>
							<hr className='w-full border mr-2' />
							<span className='text-neutral-400'> OR</span>
							<hr className='w-full border ml-2' />
						</div>
						<div className='w-full flex justify-center items-center'>
							<GoogleSignInButton
								isSubmitting={isSubmitting}
								setIsSubmitting={setIsSubmitting}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignIn;
