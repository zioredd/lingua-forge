import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

app.use('/api/auth', authRoutes);
// Protected user endpoints (e.g., /api/user/profile)
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('LinguaForge backend running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
