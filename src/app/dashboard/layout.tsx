import { getUser } from "@/lib/actions/User";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "@/lib/prisma/db";
import UserInitializer from "@/customHooks/UserInitializer";
import NoProject from "@/components/dashboard/globals/NoProject";
import ProjectInitialize from "@/customHooks/ProjectInitialize";
import SidebarComponent from "@/components/dashboard/globals/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WebisteInitial from "@/customHooks/WebisteInitial";

interface layoutProps {
  children: React.ReactNode;
}

async function layout({ children }: layoutProps) {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  const userExists = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!userExists) {
    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email as string,
        name: user.given_name,
      },
    });
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
  });

  if (projects.length === 0) {
    return (
      <>
        <UserInitializer user={userExists!} />
        <NoProject />
      </>
    );
  }

  return (
    <SidebarProvider>
      <UserInitializer user={userExists!} />
      <ProjectInitialize project={projects} />
      <WebisteInitial  userId={user.id} />
      <SidebarComponent />
      <main className="flex-1">
        <div className="flex flex-col  gap-2 p-4">
            {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

export default layout;
