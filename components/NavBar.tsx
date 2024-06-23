"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { SearchIcon, ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserAuthOptions from "./UserAuthOptions";

const NavBar = ({ userId }: { userId: string }) => {
	const [isSearchActive, setIsSearchActive] = useState<Boolean>(false);

	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='w-full text-center px-4 font-lato uppercase font-light text-2xl flex justify-evenly'>
				<div
					className={cn(
						"text-[12px] h-full flex w-[42%] justify-start items-center gap-6 font-bold tracking-[0.2rem] pl-4 text-center"
					)}>
					<div className='relative py-5 font-semibold group h-full text-[white]'>
						<p className='nav'>Team-18 Formidium Hackathon&apos;24</p>
					</div>
				</div>

				<div
					className={cn(
						"text-sm flex w-1/3 justify-end items-center gap-4 font-bold"
					)}>
					<div
						className={cn(
							"bg-none hover:bg-transparent hover:scale-110 transition"
						)}>
						{userId !== undefined && userId ? (
							<UserAuthOptions />
						) : (
							<Link
								href={`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/sign-in`}>
								<Button className='rounded-full  bg-[#337eff] hover:bg-[#305697] font-lato uppercase font-semibold text-xs tracking-widest'>
									Login
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
