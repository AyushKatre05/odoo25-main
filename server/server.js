import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import connectDB from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import venueRoutes from './routes/venueRoutes.js';
import courtRoutes from './routes/courtRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
const app = express();

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin, credentials: true }));

// DB
connectDB();

// Routes

// User-facing routes
app.use('/api/venues', venueRoutes);
app.use('/api/courts', courtRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/posts', postRoutes);

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
