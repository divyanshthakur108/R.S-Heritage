const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken, requireAdmin, JWT_SECRET } = require('../middleware/authMiddleware');

// In-memory availability store (retained during server session)
let venueAvailability = {
  '2026-08-05': 'booked',
  '2026-08-12': 'booked',
  '2026-08-18': 'booked',
  '2026-08-24': 'booked',
  '2026-08-28': 'booked',
  '2026-08-02': 'fast-filling',
  '2026-08-09': 'fast-filling',
  '2026-08-15': 'fast-filling',
  '2026-08-21': 'fast-filling',
  '2026-08-29': 'fast-filling'
};

// Admin Login Endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const validAdminUser = process.env.ADMIN_USERNAME || 'admin';
  const validAdminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === validAdminUser && password === validAdminPass) {
    const userPayload = {
      id: 'admin-001',
      username: validAdminUser,
      role: 'admin'
    };

    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful',
      token,
      user: userPayload
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid admin username or password'
  });
});

// Protected Admin Me Profile Endpoint
router.get('/me', verifyToken, requireAdmin, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
});

// Protected Admin Availability GET Endpoint
router.get('/availability', verifyToken, requireAdmin, (req, res) => {
  return res.status(200).json({
    success: true,
    availability: venueAvailability
  });
});

// Protected Admin Availability POST/PUT Update Endpoint
router.post('/availability', verifyToken, requireAdmin, (req, res) => {
  const { dateStr, status } = req.body;

  if (!dateStr || !status) {
    return res.status(400).json({
      success: false,
      error: 'Missing required parameters: dateStr and status'
    });
  }

  venueAvailability[dateStr] = status;

  return res.status(200).json({
    success: true,
    message: `Updated availability status for ${dateStr} to '${status}'`,
    availability: venueAvailability
  });
});

module.exports = router;
