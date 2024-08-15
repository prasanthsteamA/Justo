const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      username,
      password,
    });

    await user.save();

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.accountLocked) {
      return res.status(403).json({ message: 'Account locked. Please reset your password.' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      user.failedLoginAttempts += 1;
      await user.save();

      if (user.failedLoginAttempts >= 5) {
        user.accountLocked = true;
        await user.save();
        return res.status(403).json({ message: 'Account locked. Please reset your password.' });
      }

      return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.failedLoginAttempts = 0;
    await user.save();

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.sendOneTimeLink = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetUrl = `http://localhost:3000/reset/${resetToken}`;
    const message = `You requested a password reset. Use the link below to reset your password:\n\n${resetUrl}`;

    await sendEmail({
      email: user.username,
      subject: 'Password Reset Request',
      message,
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const resetToken = req.params.token;

  try {
    const user = await User.findOne({
      resetToken,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTime = (req, res) => {
  res.status(200).json({ time: new Date().toISOString() });
};

exports.kickout = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'User kicked out' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
