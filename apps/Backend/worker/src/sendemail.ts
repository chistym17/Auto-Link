// @ts-nocheck

const nodemailer = require('nodemailer');

export async function sendEmail({ toEmail }) {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: "mchisty31@gmail.com",
          pass: "txbw ewgo dwaw rqnd",
      },
  });

  const mailOptions = {
      from: `Mynuddin Chisty <mchisty31@gmail.com>`,
      to: toEmail,
      subject: 'Welcome to Integrate!',
      text: `Hello ${toEmail},\n\nWelcome to Integrate! We're excited to have you on board.\n\nBest regards,\nThe Integrate Team`,
  };

  try {
      await transporter.sendMail(mailOptions);
      return { success: true, message: 'Welcome email sent successfully!' };
  } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, message: 'Error sending welcome email.' };
  }
}


