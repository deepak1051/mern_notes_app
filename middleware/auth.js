import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const _token = req.header('Authorization');

    if (!_token) return res.status(400).json({ msg: 'Invalid Authentication' });

    const token = _token.split(' ')[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select('-password');

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ msg: 'Please authenticate' });
  }
};
