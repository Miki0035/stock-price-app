import { connectToDatabase } from "@/database/mongoose";
import { getNews } from "../actions/finnhub.actions";
import { getAllUsersForNewsEmail, getAllUsersSessionExpired7Days } from "../actions/user.actions";
import { getWatchlistSymbolsByEmail } from "../actions/watchlist.actions";
import { sendNewsSummaryEmail, sendReminderEmail, sendWelcomeEmail } from "../nodemailer";
import { getFormattedTodayDate } from "../utils";
import { inngest } from "./client";
import { NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

export const sendSignUpEmail = inngest.createFunction({
    id: 'sign-up-email',
}, {
    event: 'app/user.created'
}, async ({ event, step }) => {
    const userProfile = `
        - Country: ${event.data.country}
        - Investment goals: ${event.data.investmentGoals}
        - Risk tolerance: ${event.data.riskTolerance}
        - Preffered industry: ${event.data.preferredIndustry}
    `

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

    const response = await step.ai.infer('generate-welcome-intro', {
        model: step.ai.models.gemini({ model: 'gemini-2.0-flash-lite' }),
        body: {
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        }
    })

    await step.run('send-welcome-email', async () => {
        const part = response.candidates?.[0]?.content?.parts?.[0]
        const introText = (part && 'text' in part ? part.text : null) ||
            `Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.`
        // SEND EMAIL LOGIC FROM NODEMAILER
        const { data: { email, name, } } = event;
        return await sendWelcomeEmail({
            email,
            name,
            intro: introText
        })
    })

    return {
        success: true,
        message: 'Welcome email sent successfully'
    }
})


export const sendDailyNewsSummary = inngest.createFunction({
    id: 'daily-news-summary'
}, [
    {
        event: 'app/send.daily.news',
    },
    {
        cron: '0 12 * * *'
    }
    // {
    //     cron: '* * * * *'
    // }
],
    async ({ step }) => {
        // STEP #1: Get all users for news delivery
        const users = await step.run('get-all-users', getAllUsersForNewsEmail)  // step is what runs your background jobs

        if (!users || users.length === 0) return { success: false, message: 'No users found for news email' }

        // STEP #2: Fetch personalized news for each user
        const results = await step.run('fetch-user-news', async () => {
            const perUser: Array<{ user: UserForNewsEmail; articles: MarketNewsArticle[] }> = [];
            for (const user of users as UserForNewsEmail[]) {
                try {
                    const symbols = await getWatchlistSymbolsByEmail(user.email)
                    let articles = await getNews(symbols);
                    // Enforce max 6 articles per user
                    articles = (articles || []).slice(0, 6);
                    // If still empty , fallback to general news articles
                    if (!articles || articles.length === 0) {
                        articles = await getNews();
                        articles = (articles || []).slice(0, 6)
                    }
                    perUser.push({ user, articles })
                } catch (error) {
                    console.error('Error daily news summary function', error)
                    perUser.push({ user, articles: [] })
                }
            }
            return perUser;
        })

        // STEP #3: Summarize these news via AI for each user
        const userNewsSummaries: { user: User; newsContent: string | null }[] = []
        for (const { user, articles } of results) {
            try {
                const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(`{{newsData}}`, JSON.stringify(articles, null, 2))

                const response = await step.ai.infer(`summarize-news-${user.email}`, {
                    model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),
                    body: {
                        contents: [
                            {
                                role: "user",
                                parts: [{ text: prompt }]
                            }
                        ]
                    }
                })

                const part = response.candidates?.[0].content?.parts?.[0];
                const newsContent = (part && 'text' in part ? part.text : null) || 'No market news.'

                userNewsSummaries.push({ user, newsContent })
            } catch (error) {
                console.error('Error summarizing news via AI', error)
                userNewsSummaries.push({ user, newsContent: null })
            }
        }

        // STEP #4: Send emails
        await step.run('send-news-emails', async () => {
            await Promise.all(
                userNewsSummaries.map(async ({ user, newsContent }) => {
                    if (!newsContent) return false;

                    return await sendNewsSummaryEmail({ email: user.email, date: getFormattedTodayDate(), newsContent })
                })
            )
        })

        return { success: true, message: `Daily news summary emails sent successfully` }
    }
)

export const reminderEmail = inngest.createFunction(
    {
        id: 'reminder-email'
    }, [
    {
        event: 'app/user.reminder.email'
    },
    {
        cron: '0 12 * * *'
    },
    // {
    //     cron: '* * * * *'
    // }
],
    async ({ step }) => {
        // get the users whose sessions expired 7 days ago
        const users = await step.run('get-expired-user-sessions', getAllUsersSessionExpired7Days);

        // Send reminder emails to users with expired sessions
        await step.run('send-reminder-emails', async () => {
            if (!users || users.length === 0) return { success: true, message: 'No users to send email' };;

            await Promise.all(
                users.map(async (user) => {
                    sendReminderEmail({ email: user.email, name: user.name });
                })
            )

            return {
                success: true,
                message: `Reminder emails sent to ${users.length} users successfully`
            }
        })

    })