import React from "react";

interface HeadingProps {
	heading: string;
	content: string;
}

function Heading({ heading, content }: HeadingProps) {
	return (
		<div className='text-white text-center max-w-[90%] flex flex-col flex-wrap justify-center items-center gap-4'>
			<h1 className='font-black text-3xl tablet:text-3xl laptop:text-[40px] tracking-medium bg-gradient-to-br from-white via-slate-300 to-slate-500 text-transparent bg-clip-text'>
				{heading}
			</h1>
			<p className='font-lighter phone:text-[12px] tablet:text-[15px] font-mono tracking-tighter  text-zinc-400 phone:w-[80%] tablet:w-full'>
				{content}
			</p>
		</div>
	);
}

export default Heading;
