"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const interpretRequestMessagesSchema = z.object({
	inputMessage: z.string().min(1, { message: "Message Cannot be empty" }),
});
const InputBox = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);
	const form = useForm<z.infer<typeof interpretRequestMessagesSchema>>({
		resolver: zodResolver(interpretRequestMessagesSchema),
		defaultValues: {
			inputMessage: "",
		},
	});
	const { register, handleSubmit } = form;

	const isSubmitting = form.formState.isSubmitting;

	if (isLoaded === false) {
		return (
			<div className='h-screen w-full flex justify-center items-center'>
				<Loader2 className='animate-spin h-auto w-[10%] text-white' />
			</div>
		);
	}

	async function onSubmit({
		inputMessage,
	}: z.infer<typeof interpretRequestMessagesSchema>) {}

	return (
		<div className='w-[75%] flex justify-center items-center'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-[80%] flex flex-col justify-center items-center gap-5'>
				<div className='relative group w-full '>
					<div
						className={cn(
							"absolute bg-gradient-to-br from-white/50 to-white/20 -inset-[0.05rem] blur-0 group-focus-within:blur group-focus-within:bg-white/50 group-hover:bg-white/50 transition rounded-lg w-full"
						)}></div>
					<input
						disabled={isSubmitting}
						{...register("inputMessage")}
						type='text'
						className='relative rounded-lg w-full p-3 font-poppins text-[#2c69d1]'
						placeholder='Which Report Are You Looking For Today?'></input>
				</div>
				<button
					disabled={isSubmitting}
					className='w-full flex justify-center items-center text-center relative text-white rounded-lg p-2 bg-[#2c69d1] font-poppins  tracking-widest '>
					{isSubmitting ? (
						<Loader2 className='animate-spin w-6 h-auto' />
					) : (
						<>Submit</>
					)}
				</button>
			</form>
		</div>
	);
};

export default InputBox;
