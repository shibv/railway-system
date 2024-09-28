import { db } from '../config/db.js';

export const Booking = {
  // Create a new booking record in the database
  create: async (bookingData) => {
    const query = 'INSERT INTO bookings (userId, trainId) VALUES (?, ?)';
    const [result] = await db.query(query, [bookingData.userId, bookingData.trainId]);
    return result;
  },

  // Find all bookings for a particular user
  findAll: async (conditions) => {
    const query = 'SELECT * FROM bookings WHERE userId = ?';
    console.log(query)
    const [bookings] = await db.query(query, [conditions.id]);
    return bookings;
  }
};
