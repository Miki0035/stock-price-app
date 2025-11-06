"use server"

import { connectToDatabase } from "@/database/mongoose"

export const getAllUsersForNewsEmail = async () => {
    try {
        // b/c we are in a server action we need to reconnect to database
        // but b/c it is cached it will not recreate it
        const mongoose = await connectToDatabase()
        const db = mongoose.connection.db
        if (!db) throw new Error('Mongoose connection not connected')

        const users = await db.collection('user').find({
            email: { $exists: true, $ne: null },
        },
            {
                projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 }
            }).toArray()

        return users.filter((user) => user.email && user.name).map((user) => ({
            id: user.id || user._id.toString() || '',
            email: user.email,
            name: user.name
        }))

    } catch (error) {
        console.error('Error get all users for news email action', error)
        return []
    }

}