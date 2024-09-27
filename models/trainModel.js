import { db } from '../config/db.js';

export const Train = {
  create: (trainData, callback) => {
    // Initialize availableSeats to totalSeats when creating a new train
    const query = 'INSERT INTO trains (source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?)';
    db.query(query, [trainData.source, trainData.destination, trainData.totalSeats, trainData.totalSeats], callback);
  },

  findAll: (conditions, callback) => {
    const query = 'SELECT * FROM trains WHERE source = ? AND destination = ?';
    db.query(query, [conditions.source, conditions.destination], callback);
  },

  findOne: (conditions, callback) => {
    const query = 'SELECT * FROM trains WHERE id = ?';
    db.query(query, [conditions.id], callback);
  },

  bookSeat: (trainId, callback) => {
    const query = 'UPDATE trains SET availableSeats = availableSeats - 1 WHERE id = ? AND availableSeats > 0';
    db.query(query, [trainId], callback);
  }
};
