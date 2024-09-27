import { Booking } from '../models/bookingModel.js';
import { Train } from '../models/trainModel.js';

export const bookSeat = async (req, res) => {
  const { trainId } = req.body;

  Train.findOne({ id: trainId }, (err, train) => {
    if (err || !train || train.availableSeats <= 0) {
      return res.status(400).json({ error: 'No seats available' });
    }

    Train.bookSeat(trainId, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Booking failed' });
      }
      res.status(200).json({ message: 'Seat booked successfully' });
    });
  });
};

export const getBookingDetails = (req, res) => {
  const { userId } = req.user;

  Booking.findAll({ userId }, (err, bookings) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching booking details' });
    }
    res.status(200).json(bookings);
  });
};
