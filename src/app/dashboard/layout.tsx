import { getUser } from "@/lib/actions/User";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "../../../lib/db";
import UserInitializer from "@/customHooks/UserInitializer";
import NoProject from "@/components/dashboard/globals/NoProject";
import ProjectInitialize from "@/customHooks/ProjectInitialize";
import SidebarComponent from "@/components/dashboard/globals/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WebisteInitial from "@/customHooks/WebisteInitial";
import MonitoringBanner from "@/components/dashboard/globals/MonitoringBanner";

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

  let currentUser = userExists;
  
  if (!userExists) {
    currentUser = await prisma.user.create({
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
        <UserInitializer user={currentUser!} />
        <NoProject />
      </>
    );
  }

  return (
    <SidebarProvider>
      <UserInitializer user={currentUser!} />
      <ProjectInitialize project={projects} />
      <WebisteInitial  userId={user.id} />
      <SidebarComponent />
      <main className="flex-1 min-h-screen">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-4 p-4 border-b bg-background">
            <SidebarTrigger className="md:hidden hover:bg-accent hover:text-accent-foreground" />
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <MonitoringBanner />
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default layout;
