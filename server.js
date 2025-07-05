import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// Environment variables (✅ for security)
const senderEmail = 'whyonlyhead@gmail.com';
const appPassword = 'atob hjie fujb shdd'; // ⚠️ Use ENV in production

// POST /send-email
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // ✅ Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.',
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: appPassword,
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: 'thecloudbox0@gmail.com', // Your destination email
      subject: `${name} has sent you a message`,
      text: `${message}\n\nFrom: ${name}\nEmail: ${email}`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
    });
  } catch (error) {
    console.error('❌ Email error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Try again later.',
      error: error.message,
    });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('📨 Welcome to the Email Sending Service!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
