import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { ReactNode } from "react";
import "@uiw/react-textarea-code-editor/dist.css";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

const CodeEditor = dynamic(
	() => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
	{ ssr: false }
);
interface messageProps {
	role: string;
	content: string | undefined;
	feature: string;
}

const Message = ({ role, content, feature }: messageProps): ReactNode => {
	return (
		<div className='flex items-center justify-evenly gap-5 font-mono '>
			<div className='rounded-full relative border overflow-clip w-auto text-center phone:hidden tablet:flex bg-neutral-300'>
				<Avatar className='phone:w-8 phone:h-8 tablet:w-10 tablet:h-10 flex justify-center items-center'>
					{role === "user" ? (
						<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
					) : (
						<AvatarImage src='https://github.com/shadcn.pngb' alt='@shadcn' />
					)}
					<AvatarFallback className='text-neutral-700 font-medium '>
						{role === "user" ? "U" : "AI"}
					</AvatarFallback>
				</Avatar>
			</div>

			<div className='text-white laptop:w-[90%] tablet:w-[90%] phone:w-[90%]'>
				{role === "user" ? (
					<CodeEditor
						value={content}
						disabled={true}
						className='rounded-lg relative border border-neutral-800'
						language={feature === "command" ? "git" : "js"}
						placeholder='Please enter your code snippet here.'
						padding={15}
						data-color-mode='dark'
						style={{
							fontSize: 12,
							backgroundColor: "black",
							fontFamily:
								"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
						}}
					/>
				) : (
					<div className='p-[15px] text-justify rounded-xl bg-neutral-900'>
						{content && content && (
							<ReactMarkdown
								components={{
									pre: ({ node, ...props }) => (
										<div>
											<pre
												className='overflow-auto w-full my-2 bg-neutral-800 p-2 rounded-xl'
												{...props}
											/>
										</div>
									),
									code: ({ node, ...props }) => (
										<code
											className='bg-neutral-500 rounded-lg p-1'
											{...props}
										/>
									),
								}}
								className='text-sm overflow-hidden leading-7'>
								{content}
							</ReactMarkdown>
						)}
						{/* <p className="text-sm text-neutral-300 ">{content}</p> */}
					</div>
				)}
				{role !== "user" && (
					<hr className='tablet:hidden mt-5 border-neutral-500' />
				)}
			</div>
		</div>
	);
};

export default Message;
