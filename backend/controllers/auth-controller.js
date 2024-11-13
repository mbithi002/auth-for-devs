import bcryptjs from 'bcryptjs';
import { sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Please provide all fields' });
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ error: 'Email is already taken' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = await generateVerificationToken();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        await user.save();
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken)
        res.status(200).json({
            message: 'User created successfully',
            user: { ...user._doc, password: undefined },
        });
    } catch (error) {
        console.error('Error in signUp:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}
export const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ error: "Invalid / expired code" })
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name)
        res.status(200).json({
            message: "Email verified successfully",
            user: { ...user._doc, password: undefined },
        })
    } catch (error) {
        console.error('Error in verify-email:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export const login = async (req, res) => {
    try {

    } catch (error) {

    }
}
export const logout = async (req, res) => {
    try {

    } catch (error) {

    }
}