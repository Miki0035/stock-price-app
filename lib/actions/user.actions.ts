"use server"
import { prisma } from "../prisma"
export const getAllUsersForNewsEmail = async () => {
    try {
        // b/c we are in a server action we need to reconnect to database
        // but b/c it is cached it will not recreate it
        // Better Auth stores users in the "user" collection
        const users = await prisma.user.findMany()


        return users.filter((user) => user.email && user.name).map((user) => ({
            id: user.id || '',
            email: user.email,
            name: user.name
        }))

    } catch (error) {
        console.error('Error get all users for news email action', error)
        return []
    }

}


export const getAllUsersSessionExpired7Days = async () => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const sessions = await prisma.session.findMany({
            where: {
                expiresAt: { lte: sevenDaysAgo }
            }
        })


        if (sessions?.length === 0 || sessions === undefined) return [];

        const users: User[] = [];

        for (const session of sessions) {
            const user = await prisma.user.findFirstOrThrow({
                where: {
                    id: session.id
                }
            })
            if (user) {
                users.push({
                    id: user?.id,
                    email: user?.email,
                    name: user?.name
                });
            }

        }
        return users;

    } catch (error) {
        console.error('Error fetching user sessions action', error)
    }
}