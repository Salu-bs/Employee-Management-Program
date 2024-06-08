const asyncHandler = require('express-async-handler');
const User = require('../models/regmodel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER, // your email
    pass: process.env.MAIL_PASS, // your email password
  },
});

let OTPS;
let usernameS;
let passwordsS;
let emailS;

// Temporary storage for OTPs with expiration
const otpStorage = new Map();

function storeOtp(email, otp) {
  otpStorage.set(email, { otp, expires: Date.now() + 300000 }); // OTP expires in 5 minutes
}

function getOtp(email) {
  const entry = otpStorage.get(email);
  if (entry && entry.expires > Date.now()) {
    return entry.otp;
  }
  otpStorage.delete(email); // Remove expired OTP
  return null;
}

// Register a user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  usernameS = username;
  passwordsS = password;
  emailS = email;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Generate OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  OTPS = otp;
  storeOtp(email, otp);

  // Send OTP email
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    } else {
      res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
    }
  });
});

// Verify OTP and complete registration
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp1, otp2, otp3, otp4 } = req.body;
  const typedOtp = `${otp1}${otp2}${otp3}${otp4}`;
  const storedOtp = OTPS;
console.log(storedOtp);
  if (typedOtp !== storedOtp) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  otpStorage.delete(email); // Remove OTP from storage

  // Hash password
  const hashedPassword = await bcrypt.hash(passwordsS, 10);

  // Create new user
  const user = new User({
    username: usernameS,
    email: emailS,
    password: hashedPassword,
    verified: true,
  });

  try {
    await user.save();
    res.redirect('/reg');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving user' });
  }
});

const regSuccess = (req, res) => {
  res.status(200).render('regsuccess');
};


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
  req.session.token = token;

  // Send the token to the frontend
  res.status(200).json({ token, message: 'Login successful' });
});

const renderHome = (req, res) => {
  if (req.session.token) {
    res.status(200).render('main', { message: 'Welcome to the home page' });

      // req.session.token = null; // Delete the token from the session
  }
};

// Render registration page
const renderLog = (req, res) => {
  res.status(200).render('signUP');
};

// Render OTP verification page
const renderotp = (req, res) => {
  res.status(200).render('otp');
};

// Render home page

module.exports = {
  registerUser,
  verifyOTP,
  renderHome,
  renderotp,
  renderLog,
  loginUser,
  regSuccess
};
