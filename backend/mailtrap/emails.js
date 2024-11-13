import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailTrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        // console.log("Email sent successfully", response);
        return response
    } catch (error) {
        console.error("Error sending verification", error)
        throw new Error("Error sending verification E-Mail", error)
    }
}

export const sendWelcomeEmail = async (email, userName) => {
    const recipient = [{ email }]
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: 'db699a28-f7e5-4233-b2bb-4e45fe22f0b8',
            template_variables: {
                "company_info_name": "Auth Company",
                "name": userName
            }
        })
        console.log("Welcome Email sent", response);
        return response
    } catch (error) {
        // console.error("Error sending Welcome E-mail", error)
        throw new Error("Error sending Welcome E-Mail", error)
    }
}