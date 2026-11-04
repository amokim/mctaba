// Protects write routes: the request must send the admin key in the x-admin-key header
const ADMIN_KEY = process.env.ADMIN_KEY || 'bookstore-admin';

const requireAdmin = (req, res, next) => {
    const key = req.get('x-admin-key');

    if (!key) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Admin key missing. Send it in the x-admin-key header'
        });
    }

    if (key !== ADMIN_KEY) {
        return res.status(403).json({
            error: 'Forbidden',
            message: 'Admin key is incorrect'
        });
    }

    next();
};

module.exports = requireAdmin;
