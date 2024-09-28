import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0 
});


const connectDB = async () => {
    try {
        const connection = await db.getConnection(); // Test connection
        console.log('Database connected successfully');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

export { db, connectDB };
