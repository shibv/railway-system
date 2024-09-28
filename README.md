
## Setup Instructions

1. Clone the repository.
   
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   JWT_SECRET=jwtsecret
   ADMIN_API_KEY=adminapikey
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_NAME=railway_management
   ```

4. Create the `railway_management` database in MySQL:
   ```sql
   CREATE DATABASE railway_management;
   ```

5. Run the project:
   ```bash
   npm start
   ```
# Railway Management System API

This project implements a railway management system like IRCTC, where users can register, log in, check seat availability, and book train tickets. Admins can add new trains and manage train operations. The API also handles concurrency for seat bookings and ensures that race conditions are managed effectively.

## Features

- **User Registration**: Users can register an account.
- **User Login**: Users can log in using their credentials to access the booking system.
- **Train Management (Admin)**: Admins can add trains, manage train operations.
- **Seat Availability**: Users can check for available trains between two stations and see the number of available seats.
- **Seat Booking**: Users can book a seat on a train if seats are available.
- **Concurrency Handling**: Manages race conditions by ensuring only one user can book the last available seat.
- **Role-Based Access Control**: Admin routes are protected by API keys, and user actions are protected by JWT authentication.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Concurrency Handling**: MySQL transactions with optimistic/pessimistic locking
- **Environment**: dotenv for environment variable management

---

## Project Structure

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/railway-system.git
cd railway-system
```

### 2. Install Dependencies

```bash
npm install

```
### 3. Run Application

```bash
npm start
```

## Test Screenshots 


## Screenshots

### Register
[![register.png](https://i.postimg.cc/bY6Yjrpn/register.png)](https://postimg.cc/DmX3r2Wf)

### Login
[![login.png](https://i.postimg.cc/hjDnkWYM/login.png)](https://postimg.cc/B8VRFy41)

### Add Seat
[![add-seat.png](https://i.postimg.cc/xC6QYpDQ/add-seat.png)](https://postimg.cc/8Jf9mHzX)

### Seat Availability
[![availbility.png](https://i.postimg.cc/G3SR5fxJ/availbility.png)](https://postimg.cc/vD9C13jc)

### Book Seat
[![booked.png](https://i.postimg.cc/1zP1F1yP/booked.png)](https://postimg.cc/pm0SN791)

### Details of Booking by User
[![booked-seats.png](https://i.postimg.cc/R0R5Qp0t/booked-seats.png)](https://postimg.cc/06bB9fD5)
