"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import Message from "./ui/message";
import Loader from "./ui/Loader";
import Empty from "./ui/Empty";
import Heading from "./ui/Heading";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";

const CodeEditor = dynamic(
	() => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
	{ ssr: false }
);

export const interpretRequestMessagesSchema = z.object({
	inputMessage: z.string().min(1, { message: "Message Cannot be empty" }),
});
const InputBox = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [messages, setMessages] = useState<any>([]);

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
	}: z.infer<typeof interpretRequestMessagesSchema>) {
		const newMessages = [...messages, { role: "user", content: inputMessage }];
		setMessages(newMessages);

		const assistantResponse = await axios.post("/api/commands", {
			message: newMessages,
		});

		newMessages.push({
			role: "assistant",
			content: assistantResponse.data.content,
		});
		setMessages(newMessages);

		console.log("assistantResponse.data==", assistantResponse.data);

		if (assistantResponse.data.functionCall) {
			const { name, arguments: funcArgs } = assistantResponse.data.functionCall;

			if (name === "getReportUrl") {
				try {
					const args = JSON.parse(funcArgs);
					const reportUrlResponse = await axios.post("/api/getReports", {
						params: args,
					});

					newMessages.push({
						role: "assistant",
						content: `Here is your report: ${reportUrlResponse.data}`,
					});
				} catch (error) {
					newMessages.push({
						role: "assistant",
						content: "Failed to retrieve the report URL. Please try again.",
					});
				}
			}
		}

		setMessages(newMessages);
	}
	console.log(messages);
	return (
		<div className='flex justify-center items-center flex-col w-full relative z-[100] border gap-[3rem] h-screen'>
			<Heading heading='FormiBot' content='AI Bot For Fast Report Delivery' />
			<div className='flex  gap-[1rem] flex-col justify-center items-center w-[90%]'>
				<div className='h-[100%] w-[90%]'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col w-full items-center justify-between gap-5'>
						<div className='relative group w-full'>
							<div
								className={cn(
									"absolute bg-gradient-to-br from-white/50 to-white/20 -inset-[0.05rem] blur-0 group-focus-within:blur group-focus-within:bg-white/50 group-hover:bg-white/50 transition rounded-lg"
								)}></div>

							<input
								disabled={isSubmitting}
								{...register("inputMessage")}
								type='text'
								className='relative rounded-lg w-full p-3 font-poppins text-[#2c69d1]'
								placeholder='Which Report Are You Looking For Today?'></input>
						</div>
						<div className='w-full flex justify-end items-center'>
							{isSubmitting ? (
								<Button
									disabled
									className='font-semibold w-full'
									variant='secondary'>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Please wait
								</Button>
							) : (
								<Button
									type='submit'
									className='font-semibold w-full bg-gradient-to-br from-slate-100 via-slate-300 to-slate-400 backdrop-blur-sm text-black shadow-lg  shadow-muted-foreground/30 border border-neutral-600 transition-colors ease-in-out hover:animate-in hover:bg-neutral-600/50'
									variant='secondary'
									size='lg'>
									Submit
								</Button>
							)}
						</div>
					</form>
				</div>
				<div className='w-[90%]'>
					{messages.length === 0 ? (
						<Empty />
					) : (
						<div className='w-full h-[60vh] overflow-y-scroll border border-neutral-600 p-[5%] bg-neutral-950 rounded-xl'>
							{messages.map((mess: any, index: any) => {
								return (
									<div key={mess?.role} className='my-5'>
										<Message
											role={mess?.role}
											content={mess?.content?.toString()}
											feature={"command"}
										/>
									</div>
								);
							})}
							{isSubmitting && <Loader />}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default InputBox;
