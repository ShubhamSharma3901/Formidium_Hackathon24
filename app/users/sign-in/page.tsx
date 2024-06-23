import React from "react";
import SignIn from "@/components/ui/auth/SignIn";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";

async function page() {
  const session = await auth();

  if (session?.user?.id) {
    redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
  }

  return (
    <div>
      <SignIn />
    </div>
  );
}

export default page;
