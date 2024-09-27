import {db} from '../config/db.js';

export const User = {
    create: (userData, callback) => {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [userData.username, userData.password], callback);
    },

    findOne: (conditions, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [conditions.username], (err, results) => {
            if (err) {
                return callback(err);
            }
            // console.log('Query results:', results); // Log results
            callback(null, results[0]); // Return the first user found
        });
    }
};
