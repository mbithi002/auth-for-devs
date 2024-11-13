import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config()

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT || 'htpps://send.api.mailtrap.io'

export const mailTrapClient = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.com",
    name: "Lucky Mbithi",
};

