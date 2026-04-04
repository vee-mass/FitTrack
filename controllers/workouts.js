const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('workouts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createWorkout = async (req, res) => {
  try {
    const workout = {
      exerciseName: req.body.exerciseName,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight,
      date: req.body.date
    };
    const response = await mongodb.getDb().db().collection('workouts').insertOne(workout);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Some error occurred while creating the workout.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateWorkout = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const workout = {
      exerciseName: req.body.exerciseName,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight,
      date: req.body.date
    };
    const response = await mongodb.getDb().db().collection('workouts').replaceOne({ _id: userId }, workout);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while updating the workout.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('workouts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while deleting the workout.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAll, createWorkout, updateWorkout, deleteWorkout };