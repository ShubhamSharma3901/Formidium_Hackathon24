import { auth } from "@/auth";
import SignOut from "@/components/ui/auth/SignOut";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
	const session = await auth();

	if (!session?.user?.id) {
		redirect(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signin`);
	}
	return (
		<div>
			<SignOut />
		</div>
	);
}

export default page;
