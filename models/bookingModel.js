import { db } from '../config/db.js';

export const Booking = {
  create: (bookingData, callback) => {
    const query = 'INSERT INTO bookings (userId, trainId) VALUES (?, ?)';
    db.query(query, [bookingData.userId, bookingData.trainId], callback);
  },

  findAll: (conditions, callback) => {
    const query = 'SELECT * FROM bookings WHERE userId = ?';
    db.query(query, [conditions.id], callback);
  }
};
