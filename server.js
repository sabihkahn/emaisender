//
import express from 'express';

import nodemailer from 'nodemailer';
const app = express();
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded



// Replace these with your actual Gmail and App Password
const senderEmail = 'whyonlyhead@gmail.com';
const appPassword = 'atob hjie fujb shdd'; // 🔐 Use your 16-char app password here

app.post('/send-email', (req, res) => {
  const { name,email,message } = req.body;


  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderEmail,
    pass: appPassword,
  },
});

const mailOptions = { 
  from: senderEmail,
  to: 'sabihop56@gmail.com', // ✅ change this to who you want to email
  subject: name + ' has sent you a message',
  text: message+"\n\nFrom: " + name + "\nEmail: " + email,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error sending email:', error);
  } else {
    console.log('✅ Email sent:', info.response);
  }
});
res.status(200).json({sucess:true,
message: 'Email sent successfully!' });

})
app.get('/', (req, res) => {
  res.send('Welcome to the Email Sending Service!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
} );