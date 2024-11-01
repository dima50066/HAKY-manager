import nodemailer from 'nodemailer';
import { SMTP } from '../constants/constants';
import { env } from './env';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: parseInt(env(SMTP.SMTP_PORT), 10),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<nodemailer.SentMessageInfo> => {
  return await transporter.sendMail(options);
};
