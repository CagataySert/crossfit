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

    if (!wod) {
      return res.status(403).send({
        status: false,
        message: 'wod could not have been found.'
      });
    }

    //check wod entry time whether is started or not.
    const currentDate = new Date();
    const dateOfWod = new Date(wod.date * 1000);
    const startOfWodEntryTime = dateOfWod.setDate(dateOfWod.getDate() - 2);

    if (currentDate < startOfWodEntryTime) {
      return res.status(403).send({
        status: false,
        message:
          'you can register for your training 48 hours before the earliest.'
      });
    }

    //check capacity if full.
    if (wod.Participants.length >= wod.capacity) {
      return res.status(403).send({
        status: false,
        message: 'capacity of this class is full!'
      });
    }

    const result = await wod.addParticipants(userId);
    await wod.reload();

    res.status(201).json({ status: !!result, wod });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ status: result, message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const { userId, wodId } = req.body;

    if (!userId || !wodId) {
      return res
        .status(400)
        .send({ status: false, message: 'need userId and wodId' });
    }

    const wod = await Wod.findByPk(wodId);

    if (!wod) {
      return res.status(403).send({
        status: false,
        message: 'wod could not have been found.'
      });
    }

    const result = await wod.removeParticipants(userId);

    await wod.reload();

    res.status(201).json({ status: !!result, wod });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getWodWithUsers = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send({ status: false, message: 'need wodId' });
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
    console.log(error.message);
    return res.status(500).send({ status: false, message: error.message });
  }
};

const wodController = {
  ...crudControllers(Wod),
  addUser,
  removeUser,
  getWodWithUsers
};

module.exports = wodController;
