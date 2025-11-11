'use server'

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { AlertModel } from "@/database/models/alert.model";

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

        const result = await AlertModel.create({
            alertName, symbol, alertType, condition, threshold, frequency, user: userId
        })
        if (!result._id) {
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
