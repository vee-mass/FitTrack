const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('exercises').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createExercise = async (req, res) => {
  try {
    const exercise = {
      name: req.body.name,
      muscleGroup: req.body.muscleGroup,
      equipment: req.body.equipment,
      difficulty: req.body.difficulty
    };
    const response = await mongodb.getDb().db().collection('exercises').insertOne(exercise);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Error occurred while creating the exercise.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateExercise = async (req, res) => {
  try {
    const exerciseId = new ObjectId(req.params.id);
    const exercise = {
      name: req.body.name,
      muscleGroup: req.body.muscleGroup,
      equipment: req.body.equipment,
      difficulty: req.body.difficulty
    };
    const response = await mongodb.getDb().db().collection('exercises').replaceOne({ _id: exerciseId }, exercise);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Error occurred while updating the exercise.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteExercise = async (req, res) => {
  try {
    const exerciseId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('exercises').deleteOne({ _id: exerciseId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Error occurred while deleting the exercise.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAll, createExercise, updateExercise, deleteExercise };