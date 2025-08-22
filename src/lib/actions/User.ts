"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUser() {
  const session = await getKindeServerSession()

    const user = await session.getUser()


  if (!session) {
    return null;
  }
  return user;
}
