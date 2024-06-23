"use client";
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/logo.png";
import { MenuIcon, SearchIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import UserAuthOptions from "./UserAuthOptions";

const MobNav = ({ userId }: { userId: string }) => {
	const [isSearchActive, setIsSearchActive] = useState<Boolean>(false);
	return (
		<>
			<div className='flex justify-end items-center p-4 '>
				<div className={cn("flex justify-end items-center gap-4 w-1/3")}>
					<div
						className={cn(
							"bg-none hover:bg-transparent hover:scale-110 transition"
						)}>
						{userId !== undefined && userId ? (
							<UserAuthOptions />
						) : (
							<Link href={`${process.env.NEXT_PUBLIC_APP_URL}/users/sign-in`}>
								<Button className='rounded-full px-2 bg-[#A77737] hover:bg-[#865e29] font-lato uppercase font-semibold text-xs tracking-widest'>
									Login
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MobNav;
