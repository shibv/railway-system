import express from 'express';
import { addTrain, getAvailableTrains } from '../controllers/trainController.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.post('/add', adminMiddleware, addTrain);
router.get('/available', getAvailableTrains);

export default router;
