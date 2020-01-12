const crudControllers = require('./crud.controller');
const Wod = require('../../db/models/wod');
const User = require('../../db/models/user');

const addUser = async (req, res) => {
  try {
    const { userId, wodId } = req.body;

    if (!userId || !wodId) {
      res.status(400).send({ status: false, message: 'need userId and wodId' });
    }

    const wod = await Wod.findByPk(wodId, {
      include: [
        {
          model: User,
          as: 'Participants',
          through: { attributes: [] }
        }
      ]
    });
    //check capacity if full.
    if (wod.Participants.length >= wod.capacity) {
      res.status(403).send({
        status: false,
        message: 'Capacity of this class is full!'
      });
    }

    const result = await wod.addParticipants(userId);
    await wod.reload();

    res.status(201).json({ status: !!result, wod });
  } catch (error) {
    res.status(500).send({ status: result, message: error.message });
    console.log(error.message);
  }
};

const removeUser = async (req, res) => {
  try {
    const { userId, wodId } = req.body;

    if (!userId || !wodId) {
      res.status(400).send({ status: false, message: 'need userId and wodId' });
    }

    const wod = await Wod.findByPk(wodId);

    const result = await wod.removeParticipants(userId);

    await wod.reload();

    res.status(201).json({ status: !!result, wod });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
    console.log(error.message);
  }
};

const getWodWithUsers = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).send({ status: false, message: 'need wodId' });
    }

    const wodWitUsers = await Wod.findByPk(id, {
      include: [
        {
          model: User,
          as: 'Participants',
          through: { attributes: [] }
        }
      ]
    });

    res.status(201).json({ status: true, wodWitUsers });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
    console.log(error.message);
  }
};

const wodController = {
  ...crudControllers(Wod),
  addUser,
  removeUser,
  getWodWithUsers
};

module.exports = wodController;
