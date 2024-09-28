import { db } from '../config/db.js';

export const Train = {
  create: async (trainData) => {
    const query = 'INSERT INTO trains (source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [trainData.source, trainData.destination, trainData.totalSeats, trainData.totalSeats]);
    return result;
  },

  findAll: async (conditions) => {
    const query = 'SELECT * FROM trains WHERE source = ? AND destination = ?';
    const [trains] = await db.query(query, [conditions.source, conditions.destination]);
    return trains;
  },

  findOne: async (conditions) => {
    const query = 'SELECT * FROM trains WHERE id = ?';
    const [train] = await db.query(query, [conditions.id]);
    return train;
  },

  bookSeat: async (trainId) => {
    const query = 'UPDATE trains SET availableSeats = availableSeats - 1 WHERE id = ? AND availableSeats > 0';
    const [result] = await db.query(query, [trainId]);
    return result;
  }
};
