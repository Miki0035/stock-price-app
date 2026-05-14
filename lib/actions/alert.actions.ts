'use server'
import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { prisma } from "../prisma";

export const createAlert = async (alertData: AlertFormData) => {
    try {
        const { alertName, symbol, alertType, condition, threshold, frequency } = alertData;
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session?.user) {
            return {
                success: false,
                error: 'User not authenticated'
            }
        }
        const userId = session.user.id;

        const result = await prisma.alert.create({
            data: {
                alertName,
                symbol,
                alertType,
                condition,
                threshold,
                frequency,
                userId: userId
            },
            // adds the user reference when returing result
            // include: {
            //     user: true
            // }
        })
        if (!result.id) {
            return {
                success: false,
                error: 'Failed to create alert'
            }
        }

        // inngest service schedule comes
        return {
            success: true,
            message: 'Alert created successfully',
        }
    } catch (error) {
        console.error('Error creating alert action', error)
    }
}
