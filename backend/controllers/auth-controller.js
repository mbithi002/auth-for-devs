import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { sendOasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';
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
    const { code } = req.body;

    try {
        const user = await User.findOne({ verificationToken: code });
        if (!user) {
            return res.status(400).json({ error: "Invalid verification token" });
        }
        if (user.verificationTokenExpiresAt <= Date.now()) {
            return res.status(400).json({ error: "Verification token has expired" });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({
            message: "Email verified successfully",
            user: { ...user._doc, password: undefined },
        });
    } catch (error) {
        console.error("Error in verifyEmail:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
export const getNewVerificationToken = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        const newToken = await generateVerificationToken()
        user.verificationToken = newToken
        await user.save()
        const ressponse = await sendVerificationEmail(email, newToken)
        if (!ressponse) {
            return res.status(500).json({ error: 'Failed to send verification email' })
        }
        return res.status(200).json(ressponse)
    } catch (error) {
        console.error('Error in getNewVerificationToken:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" })
        }
        const isPassword = await bcryptjs.compare(password, user.password)
        if (!isPassword) {
            return res.status(400).json({ error: "Invalid email or password" })
        }
        generateTokenAndSetCookie(res, user._id)
        user.lastLogin = new Date()
        await user.save()
        res.status(200).json({
            message: "Login successfull",
            user: { ...user._doc, password: undefined },
        })
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        console.error('Error in logout:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        if (!email) {
            return res.status(400).json({ error: "Email is required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000;
        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt
        await user.save()
        await sendOasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json({
            message: "password reset email sent successfully"
        })
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export const resetPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    try {
        if (!password) {
            return res.status(400).json({ error: "Password is required" })
        }
        const user = await User.findOne({ resetPasswordToken: token })
        if (!user) {
            return res.status(400).json({ error: "Invalid token" })
        }
        const resetTokenExpiresAt = user.resetPasswordExpiresAt
        if (resetTokenExpiresAt < Date.now()) {
            return res.status(400).json({ error: "Expired token" })
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = null
        user.resetPasswordExpiresAt = null
        await user.save()
        await sendResetSuccessEmail(user.email)
        res.status(200).json({
            message: "Password reset successfully"
        })
    } catch (error) {
        console.error('Error in resetPassord:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export const checkAuth = async (req, res) => {
    const { user } = req
    try {
        if (!user) {
            return res.status(404).json({ error: "check auth User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error('Error in checkAuth:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}