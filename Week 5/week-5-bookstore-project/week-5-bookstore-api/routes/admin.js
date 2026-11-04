const express = require('express');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// POST /api/admin/verify - lets the frontend check an admin key before showing the admin panel
router.post('/verify', requireAdmin, (req, res) => {
    res.json({ message: 'Admin key accepted' });
});

module.exports = router;
