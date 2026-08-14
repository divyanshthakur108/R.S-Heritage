const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken, requireAdmin, JWT_SECRET } = require('../middleware/authMiddleware');
const { query } = require('../config/db');

// Admin Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      const dbUser = result.rows[0];
      const userPayload = {
        id: dbUser.id,
        username: dbUser.username,
        role: dbUser.role
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
  } catch (error) {
    console.error('Admin login API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Database connection error during login'
    });
  }
});

// Protected Admin Me Profile Endpoint
router.get('/me', verifyToken, requireAdmin, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
});

// Protected Admin Availability GET Endpoint
router.get('/availability', verifyToken, requireAdmin, async (req, res) => {
  try {
    const result = await query('SELECT date_str, status FROM availability');
    const availabilityMap = {};
    result.rows.forEach(row => {
      availabilityMap[row.date_str] = row.status;
    });

    return res.status(200).json({
      success: true,
      availability: availabilityMap
    });
  } catch (error) {
    console.error('Fetch availability API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch date availability from database'
    });
  }
});

// Protected Admin Availability POST/PUT Update Endpoint
router.post('/availability', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { dateStr, status } = req.body;

    if (!dateStr || !status) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: dateStr and status'
      });
    }

    // Upsert date status
    await query(
      'INSERT INTO availability (date_str, status) VALUES ($1, $2) ON CONFLICT (date_str) DO UPDATE SET status = EXCLUDED.status',
      [dateStr, status]
    );

    // Fetch updated availability mapping
    const result = await query('SELECT date_str, status FROM availability');
    const availabilityMap = {};
    result.rows.forEach(row => {
      availabilityMap[row.date_str] = row.status;
    });

    return res.status(200).json({
      success: true,
      message: `Updated availability status for ${dateStr} to '${status}'`,
      availability: availabilityMap
    });
  } catch (error) {
    console.error('Update availability API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update date availability in database'
    });
  }
});

// Protected Admin Bookings GET Endpoint
router.get('/bookings', verifyToken, requireAdmin, async (req, res) => {
  try {
    const result = await query('SELECT * FROM bookings ORDER BY created_at DESC');
    return res.status(200).json({
      success: true,
      bookings: result.rows
    });
  } catch (error) {
    console.error('Fetch bookings API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch customer bookings from database'
    });
  }
});

module.exports = router;
