import { Train } from '../models/trainModel.js';

export const addTrain = async (req, res) => {
  const { source, destination, totalSeats } = req.body;

  try {
    
    await Train.create({ source, destination, totalSeats });
    res.status(201).json({ message: 'Train added successfully' });
  } catch (error) {
    console.error('Error adding train:', error);
    res.status(500).json({ error: 'Error adding train' });
  }
};

export const getAvailableTrains = async (req, res) => {
  const { source, destination } = req.query;

  try {
    
    const trains = await Train.findAll({ source, destination });
    res.status(200).json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error);
    res.status(500).json({ error: 'Error fetching trains' });
  }
};
