import React from "react";
import Image from "next/image";
import vec from "@/public/Animation - 1702546837163.json";
import Lottie from "lottie-react";
function Empty() {
	return (
		<div className='flex items-center justify-center flex-col w-full h-[60vh] overflow-y-scroll border border-neutral-600 p-[5%] bg-neutral-950 rounded-xl mt-5'>
			<Lottie animationData={vec} loop={true} />
			<p className='text-muted-foreground font-extralight text-sm text-center'>
				Nothing To Show Yet !
			</p>
		</div>
	);
}

export default Empty;
