import express from 'express';
import { bookSeat, getBookingDetails } from '../controllers/bookingController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/book', authMiddleware, bookSeat);
router.get('/details', authMiddleware, getBookingDetails);

export default router;
