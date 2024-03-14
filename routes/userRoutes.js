import express from 'express';
import { login, register } from '../controllers/users.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/verify', auth, (req, res) => {
  res.json(req.user);
});

export default router;
