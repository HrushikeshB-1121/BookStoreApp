import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import logger from '../config/logger';
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const mail = process.env.MAIL;

// OAuth2 credentials
const OAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret
);

OAuth2Client.setCredentials({
    refresh_token: refreshToken,
});


// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: mail,
        clientId,
        clientSecret,
        refreshToken,
    },
});

// Email sending function
async function sendEmail(email, token) {
    const mailOptions = {
        from: mail,
        to: email,
        subject: "Verify email",
        html: `<h1>verify email</h1>
      <p>Go to the link to verify email</p>
      <p>the token is:${token} </p>
    //   <a href="http://localhost:3000/api/v1/users/verification">verify mail</a>
      `,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${email}`);
        return result;
    } catch (error) {
        logger.error(`Error sending email to ${email}: ${error.message}`);
        throw error;
    }
}

export default sendEmail;