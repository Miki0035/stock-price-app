'use server';
import { prisma } from "../prisma";

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
    if (!email) return [];

    try {

        // Better Auth stores users in the "user" collection
        const user = await prisma.user.findFirstOrThrow({
            where: {
                email
            },

        })

        if (!user) return [];

        const userId = (user.id as string) || String(user.id || '');
        if (!userId) return [];

        const items = await prisma.watchlist.findMany({

            where: {
                userId,
            }
        })

        return items.map((i) => String(i.symbol));
    } catch (err) {
        console.error('getWatchlistSymbolsByEmail error:', err);
        return [];
    }
}