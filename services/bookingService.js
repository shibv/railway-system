import { db } from '../config/db.js'; 

export const bookingService = {
  bookSeats: async (userId, trainId) => {
    const connection = await db.getConnection(); 
    try {
      
      await connection.beginTransaction();

     
      const [train] = await connection.query('SELECT availableSeats FROM trains WHERE id = ? FOR UPDATE', [trainId]);

      if (!train || train.availableSeats <= 0) {
        throw new Error('No available seats');
      }

      // Update the train seat count
      await connection.query('UPDATE trains SET availableSeats = availableSeats - 1 WHERE id = ?', [trainId]);

      // Insert booking record in the database
      await connection.query('INSERT INTO bookings (userId, trainId) VALUES (?, ?)', [userId, trainId]);

      // Commit the transaction after all operations are successful
      await connection.commit();

      return { message: 'Seat booked successfully' };

    } catch (error) {
      // Rollback transaction in case of any error
      await connection.rollback();
      throw error;
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  },

  getBookingDetails: async (userId) => {
    try {
      const query = 'SELECT * FROM bookings WHERE userId = ?';
      const [bookings] = await db.query(query, [userId]);
      return bookings;
    } catch (error) {
      throw new Error('Error fetching booking details');
    }
  }
};
