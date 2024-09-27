import { Train } from '../models/trainModel.js';

export const addTrain = (req, res) => {
  const { source, destination, totalSeats } = req.body;
  console.log(source, destination, totalSeats)

  Train.create({ source, destination, totalSeats }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding train' });
    }
    res.status(201).json({ message: 'Train added successfully' });
  });
};

export const getAvailableTrains = (req, res) => {
  const { source, destination } = req.query;

  Train.findAll({ source, destination }, (err, trains) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching trains' });
    }
    res.status(200).json(trains);
  });
};
