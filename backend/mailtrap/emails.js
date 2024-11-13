import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
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

export const sendOasswordResetEmail = async (email, resetUrl) => {
    const recipient = [{ email }]
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password reset",
        })
        // console.log("Reset password email sent", response);
        // console.log(resetUrl);
        return response
    } catch (error) {
        // console.error("Error sending password-reset E-mail", error)
        throw new Error("Error sending password-reset E-Mail", error)
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }]
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset success!",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password reset",
        })
        // console.log("Reset password success email sent", response);
        return response
    } catch (error) {
        // console.error("Error sending password-reset succes E-mail", error)
        throw new Error("Error sending password-reset succes E-Mail", error)
    }
}