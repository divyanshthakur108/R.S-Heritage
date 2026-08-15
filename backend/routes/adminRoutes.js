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

// Protected Admin Booking DELETE Endpoint
router.delete('/bookings/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the date of the booking before deleting to clean up availability override
    const bookingRes = await query('SELECT event_date FROM bookings WHERE id = $1', [id]);
    if (bookingRes.rows.length > 0) {
      const eventDate = bookingRes.rows[0].event_date;
      if (eventDate) {
        const dateStr = new Date(eventDate).toISOString().split('T')[0];
        await query('DELETE FROM availability WHERE date_str = $1 AND status = $2', [dateStr, 'booked']);
      }
    }

    await query('DELETE FROM bookings WHERE id = $1', [id]);
    return res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Delete booking API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete booking from database'
    });
  }
});

// Protected Admin Booking PUT (Edit) Endpoint
router.put('/bookings/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, location, event_date, guest_count, event_type, message, status } = req.body;

    if (!name || !email || !phone || !event_date || !event_type) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields: Name, Email, Phone, Event Date, and Event Type.'
      });
    }

    // Get previous details to see if event date was changed or status unconfirmed
    const oldRes = await query('SELECT event_date, status FROM bookings WHERE id = $1', [id]);

    await query(
      'UPDATE bookings SET name = $1, email = $2, phone = $3, location = $4, event_date = $5, guest_count = $6, event_type = $7, message = $8, status = $9 WHERE id = $10',
      [name, email, phone, location, event_date, guest_count, event_type, message, status || 'pending', id]
    );

    // Sync changes with availability table
    if (oldRes.rows.length > 0) {
      const oldDate = oldRes.rows[0].event_date;
      const oldStatus = oldRes.rows[0].status;

      // Clean up previous event date booking if it changed or is no longer confirmed
      if (oldDate && (oldDate !== event_date || status !== 'confirmed') && oldStatus === 'confirmed') {
        const oldDateStr = new Date(oldDate).toISOString().split('T')[0];
        await query('DELETE FROM availability WHERE date_str = $1 AND status = $2', [oldDateStr, 'booked']);
      }
    }

    // Set new event date as booked if status is confirmed
    if (status === 'confirmed' && event_date) {
      const dateStr = new Date(event_date).toISOString().split('T')[0];
      await query(
        'INSERT INTO availability (date_str, status) VALUES ($1, $2) ON CONFLICT (date_str) DO UPDATE SET status = EXCLUDED.status',
        [dateStr, 'booked']
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Booking updated successfully'
    });
  } catch (error) {
    console.error('Update booking API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update booking in database'
    });
  }
});

// Protected Admin Booking PATCH (Confirm) Endpoint
router.patch('/bookings/:id/confirm', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Get the booking details to find the event_date
    const bookingRes = await query('SELECT event_date FROM bookings WHERE id = $1', [id]);
    if (bookingRes.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    const eventDate = bookingRes.rows[0].event_date;

    // Update booking status to confirmed
    await query("UPDATE bookings SET status = 'confirmed' WHERE id = $1", [id]);

    // Upsert into availability table as booked
    if (eventDate) {
      const dateStr = new Date(eventDate).toISOString().split('T')[0];
      await query(
        'INSERT INTO availability (date_str, status) VALUES ($1, $2) ON CONFLICT (date_str) DO UPDATE SET status = EXCLUDED.status',
        [dateStr, 'booked']
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Booking status updated to confirmed'
    });
  } catch (error) {
    console.error('Confirm booking API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update booking status to confirmed'
    });
  }
});

module.exports = router;
