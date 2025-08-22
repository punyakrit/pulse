import { getUser } from "@/lib/actions/User";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "@/lib/prisma/db";
import UserInitializer from "@/customHooks/UserInitializer";
import NoProject from "@/components/dashboard/NoProject";
import ProjectInitialize from "@/customHooks/ProjectInitialize";

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
    <div>
      <UserInitializer user={userExists!} />
      <ProjectInitialize project={projects} />
      {children}
    </div>
  );
}

export default layout;
