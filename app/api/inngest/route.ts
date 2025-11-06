import { inngest } from "@/lib/inngest/client";
import { sendSignUpEmail } from "@/lib/inngest/functions";
import { serve } from "inngest/next"

export const { GET, POST, PUT } = serve({
    client: inngest,
    // jobs executed on the background by inngest
    functions: [
        sendSignUpEmail
    ],
})