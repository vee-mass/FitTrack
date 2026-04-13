const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL PROGRAMS
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('programs').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE PROGRAM
const getSingle = async (req, res) => {
  try {
    const programId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('programs').find({ _id: programId });
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE PROGRAM
const createProgram = async (req, res) => {
  try {
    const program = {
      programName: req.body.programName,
      description: req.body.description,
      duration: req.body.duration,
      level: req.body.level, 
      focusArea: req.body.focusArea 
    };
    const response = await mongodb.getDb().db().collection('programs').insertOne(program);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Error occurred while creating the program.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE PROGRAM
const updateProgram = async (req, res) => {
  try {
    const programId = new ObjectId(req.params.id);
    const program = {
      programName: req.body.programName,
      description: req.body.description,
      duration: req.body.duration,
      level: req.body.level,
      focusArea: req.body.focusArea
    };
    const response = await mongodb.getDb().db().collection('programs').replaceOne({ _id: programId }, program);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Error occurred while updating the program.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE PROGRAM
const deleteProgram = async (req, res) => {
  try {
    const programId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('programs').deleteOne({ _id: programId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Error occurred while deleting the program.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAll, getSingle, createProgram, updateProgram, deleteProgram };