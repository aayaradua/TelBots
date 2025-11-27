import { User } from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { signAccessToken, signRefreshToken, verifyJwtToken } from "../utils/jwt.js";
import { v4 as uuid } from 'uuid';
import { Token } from "../models/Token.js";
import { generateToken, hashToken } from "../utils/crypto.js";
import { transporter } from "../utils/nodemailer.js";
import { ENV } from "../config/index.js";

export const signUp = async(req, res) => {
    try {
        const { name, email, password, username, telegramUserId, telegramUsername} = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({error: "Email already used."});
        };
            
        const hashedPassword = await hashPassword(password);
        const verificationToken =  generateToken();
        const hashedToken = hashToken(verificationToken);

        const verificationUrl = `${ENV.FRONTEND_URL}/verify-email/${verificationToken}`;
        const message = `
            <h1>Email Verification</h1>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${verificationUrl}">Verify Email</a>`;

        try {
            await transporter.sendMail({
                to: email, 
                subject: "Email Verification", 
                html: message });
            } catch (err) {
                console.log("err", err);
              throw err
        }

        await User.create({
            name,
            email, 
            password: hashedPassword,
            username, 
            telegramUserId, 
            telegramUsername,
            verificationToken: hashedToken,
            verificationTokenExpires: Date.now() + 3600000
        });

        return res.status(201).json({
            status: "Success",
            message: "User has been registered."
        });

    } catch(err) {
         console.log("debug", err);
        return res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};

export const login = async( req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({error:'Email or password is invalid'});
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: 'Email or password is invalid'});
        }
      
        const sessionId = uuid();
        const jti = uuid();

        const accessToken = signAccessToken({userId: user._id, role: user.role});
        const refreshToken = signRefreshToken({userId: user._id, role: user.role, jti, sessionId});

        const hashedToken = hashToken(refreshToken);

        await Token.create({
            userId: user._id, 
            role: user.role, 
            jti, 
            sessionId,
            token: hashedToken,
            isUsed: false
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: ENV.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000 
        }); 

        res.cookie('refreshToken', refreshToken, {
           httpOnly: true,
           secure: ENV.NODE_ENV === 'production',  
           sameSite: 'Strict',
           maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            status: 'Success',
            message: 'User login successfully'
        });
    
    } catch(err) {
        return res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
        data: user
      });
    }

    return res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message
    });
  }
};



export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
        return res.status(404).json({error: 'User not found'})
    }   
    const resetToken = generateToken();
    const hashedResetToken = hashToken(resetToken);
    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordTokenExpires = Date.now() + 3600000; 
    await user.save();

    const resetUrl = `${ENV.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `
        <h1>Password Reset</h1>     
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>     
        <p>If you did not request this, please ignore this email.</p>
    `;  

    try {
        await transporter.sendMail({
            from: `"KOL Management Sytem" <${ENV.MAIL_FROM}>`,
            to: email,
            subject: 'Password Reset',
            html: message
        });
        res.status(200).json({
        status: 'Success',
        message: 'Password reset email sent. Please check your email.'
    });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpires = undefined;      
        await user.save();
        return res.status(500).json({error: err.message, stalk: err.stalk});
    }
};

export const resetPassword = async (req, res) => {
    try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const hashedToken = hashToken(token);    
    const user = await Admin.findOne({
        resetPasswordToken: hashedToken, resetPasswordTokenExpires: { $gt: Date.now() }     
    }); 
    if (!user) {
        return res.status(401).json({error: 'Invalid or expired token'})
    }
    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires= undefined;
    await user.save();

    res.status(200).json({
        status: 'Success',
        message: 'Password is reset successfully.'
    });
    } catch (err) {
        return res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};

export const logout = async (req, res) => {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken && !refreshToken) {
        return res.status(401).json({error: 'Token not found'});
    }   
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: ENV.NODE_ENV === 'production',  
        sameSite: 'Strict'
    });
    res.clearCookie('refreshToken', {   
        httpOnly: true,
        secure: ENV.NODE_ENV === 'production',  
        sameSite: 'Strict'
    });
 
    res.status(200).json({  
        status: 'Success',
        message: 'Logout successful'
    });
};

export const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    if (!verificationToken) {
      return res.status(400).json({
        status: "Failed",
        message: "Verification token is required."
      });
    }

    const hashedToken = hashToken(verificationToken);

    const user = await User.findOne({ verificationToken: hashedToken });
    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid or expired verification token."
      });
    };

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return res.status(200).json({
      status: "Success",
      message: "Email verified successfully."
    });

  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: "Email verification failed."
    });
  }
};
