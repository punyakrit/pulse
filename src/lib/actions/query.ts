"use server"

import { prisma } from "../../../lib/db";


export async function createProjectQuery(userId: string, name: string) {
    if (!userId || !name) {
        throw new Error("User ID and project name are required");
    }

    const project = await prisma.project.create({
        data: {
            name,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })

    const settings = await prisma.setting.create({
        data: {
            projectId: project.id,
        }
    })

    return project; 
}   


export async function getWebsitesQuery(projectId: string) {
    const websites = await prisma.website.findMany({
        where: {
            projectId: projectId,
        },
    });
    return websites;
}

export async function getProjectQuery(userId: string) {
    const project = await prisma.project.findMany({
        where: {
            userId: userId,
        },
    });
    return project;
}


export async function createWebsiteQueryFirst(projectId: string, url: string) {
    const website = await prisma.website.create({
        data: {
            projectId: projectId,
            url: url,
        },
    });
    const UpdateProject = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            status: "online",
        },
    });
    return website;
}

export async function getSettingsQuery(projectId: string) {
    const settings = await prisma.setting.findUnique({
        where: {
            projectId: projectId,
        },
    });
    return settings;
}

export async function updateSettingsQuery(
    projectId: string, 
    status: boolean, 
    interval: number, 
    notifyType: string
) {
    const settings = await prisma.setting.update({
        where: {
            projectId: projectId,
        },
        data: {
            status,
            interval,
            notifyType,
        },
    });
    return settings;
}


export async function getChecksQueryLatest(websiteId: string) {
    const checks = await prisma.check.findMany({
        where: {
            websiteId: websiteId,
        },
        orderBy: {
            checkedAt: "desc",
        },
        take: 2,
    });
    return checks;
}


export async function deleteWebsiteQuery(websiteId: string) {
    const website = await prisma.website.delete({
        where: {
            id: websiteId,
        },
    });
    return website;
}