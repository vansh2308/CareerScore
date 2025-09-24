
'use server'


// app/api/auth/requestMagicLink.js
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { headers } from 'next/headers'
import { saveToken, getUserByEmail } from '@/lib/database'



export async function POST(req: Request) {
  const { email } = await req.json()

  const user = await getUserByEmail(email)

  // Create a magic link token
  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  })

  const headersPromise = headers();
  const headersList = await headersPromise;
  const host = headersList.get('host')
  const magicLink = `http://${host}/api/auth/verify?token=${token}`



  // Save token in your database with an expiration time
  if (user) {
    await saveToken(user.id, token);
  }

  const testAccount = await nodemailer.createTestAccount();
  console.log('Test account created: ', testAccount)

  // Set up email transporter and send the magic link
  const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    // secure: false, // upgrade later with STARTTLS
    // auth: {
    //   user: testAccount.user,
    //   pass: testAccount.pass,
    // },

    service: "gmail",
    auth: {
      user: "vanshagarwal11@gmail.com",
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  })

  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
  } catch (err) {
    console.error("Verification failed", err);
  }

  const info = await transporter.sendMail({
    from: '"Career Score" <no-reply@careerscore.com>',
    to: email,
    subject: 'Your Magic Link',
    text: `Click here to log in: ${magicLink}`,
    html: `
        <h1>Welcome to Career Score</h1>
        <p>Click <a href="${magicLink}">here</a> to log in.</p>
      `
  })

  console.log('Message sent: ', info.messageId);
  console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));

  return Response.json({
    message: 'Magic link sent!',
    previewURL: nodemailer.getTestMessageUrl(info)
  })
}