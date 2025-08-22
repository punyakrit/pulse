"use server"

import { prisma } from "@/lib/prisma/db";


export async function createProjectQuery(userId: string, name: string) {

    const project = await prisma.project.create({
        data: {
            name,
            userId,
        }
    })
}   