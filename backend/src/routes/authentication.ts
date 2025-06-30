import express from 'express';
import { hashPassword, User, verifyPassword  } from '../models/User';
import { createToken } from '../utils/jwt';

const router = express.Router();

router.post('/register', async(req, res) => {
    const {username, password } = req.body;
    try {
        const passwordHash = await hashPassword(password);
        const user = new User({ username, passwordHash });

        await user.save();
        res.status(201).json({message: 'User registrated'})
    } catch (error) {
        res.status(400).json({error: 'User already exists or error occured'})
    }

});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = createToken(user._id.toString());
  res.json({ token });
});


export default router;
