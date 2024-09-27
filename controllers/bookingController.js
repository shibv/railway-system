import { Booking } from '../models/bookingModel.js';
import { Train } from '../models/trainModel.js';

export const bookSeat = async (req, res) => {
  const { trainId } = req.body;
  const userId = req.user.id; // Get the userId from the authenticated user

  Train.findOne({ id: trainId }, (err, train) => {
    if (err || !train || train.availableSeats <= 0) {
      return res.status(400).json({ error: 'No seats available' });
    }

    Train.bookSeat(trainId, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Booking failed' });
      }

      // Create a new booking record
      Booking.create({ userId, trainId }, (err) => {
        if (err) {
          // Rollback seat update if booking creation fails (optional)
          return res.status(500).json({ error: 'Failed to create booking record' });
        }
        res.status(200).json({ message: 'Seat booked successfully' });
      });
    });
  });
};


export const getBookingDetails = (req, res) => {
  const { id } = req.user;
  console.log(req.user);

  Booking.findAll({ id }, (err, bookings) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching booking details' });
    }
    res.status(200).json(bookings);
  });
};
