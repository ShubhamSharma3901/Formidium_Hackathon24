"use client";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User2Icon, UserIcon } from "lucide-react";
import Link from "next/link";

function UserAuthOptions() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='rounded-full px-2 py-2 bg-[#337eff]'>
				<UserIcon className='w-6 h-6 text-white' />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='z-[400] relative tablet:w-[13rem] xsPhone:w-[12rem] p-0 mr-4'>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='p-4 bg-red-50 font-lato tracking-widest font-semibold text-[13px]'>
					<Link href={`/api/auth/signout`} className='text-red-600'>
						Sign-Out
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserAuthOptions;
