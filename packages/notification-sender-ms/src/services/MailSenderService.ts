import { MessageClient } from "cloudmailin"
import { Email } from "../data/Email";

export async function sendMessage(email: Email) {
    if (!process.env.MAIL_USERNAME || !process.env.MAIL_API_KEY)
        throw new Error("Error with CloudMailin auth credentials");

    const client = new MessageClient({ username: process.env.MAIL_USERNAME, apiKey: process.env.MAIL_API_KEY});
    
    await client.sendMessage({
    to: email.to,
    from: email.from,
    plain: 'test message',
    html:  email.text,
    subject: email.subject
    });
}