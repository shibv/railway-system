import { Booking } from '../models/bookingModel.js';
import { bookingService } from '../services/bookingService.js';

export const bookSeat = async (req, res) => {
  const { trainId } = req.body;
  const userId = req.user.id; 

  try {
   
    const result = await bookingService.bookSeats(userId, trainId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error booking seat:', error);
    res.status(400).json({ error: error.message });
  }
};

export const getBookingDetails = async (req, res) => {
  const { id } = req.user; // User ID from authenticated user

  try {
    const bookings = await Booking.findAll({ id });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ error: 'Error fetching booking details' });
  }
};
