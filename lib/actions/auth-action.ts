'use server'

import { headers } from "next/headers"
import { auth } from "../better-auth/auth"
import { inngest } from "../inngest/client"

export const signUpWithEmail = async ({ email, fullName, password, investmentGoals, preferredIndustry, country, riskTolerance }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: fullName
            }
        })

        if (response) {
            await inngest.send({
                // name of the inngest event to trigger function

                name: 'app/user.created',
                // data send to the injest  event 
                data: {
                    email,
                    name: fullName,
                    country,
                    riskTolerance,
                    preferredIndustry,
                    investmentGoals
                }
            })
        }
        return {
            success: true,
            data: response
        }
    } catch (error) {
        console.error('Sign up action failed, ', error)
        return {
            success: false,
            error: 'Sign up failed'
        }
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() })
    } catch (error) {
        console.error('Sign out action error', error)
        return {
            success: false,
            error: 'Sign out failed'
        }
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        return {
            success: true,
            data: response
        }
    } catch (error) {
        console.error('Sign in action failed, ', error)
        return {
            success: false,
            error: 'Sign in failed'
        }
    }
}