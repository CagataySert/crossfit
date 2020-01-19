const crudControllers = require('./crud.controller');
const Wod = require('../../db/models/wod');
const User = require('../../db/models/user');
const statusCodeMessages = require('../../utils/status.codes');

const addUser = async (req, res) => {
  try {
    const { userId, wodId } = req.body;

    if (!userId || !wodId) {
      res.status(400).json({ status: false, message: statusCodeMessages[400] });
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
      return res.status(600).json({
        status: false,
        message: statusCodeMessages[600]
      });
    }

    //check wod entry time whether is started or not.
    const currentDate = new Date();
    const dateOfWod = new Date(wod.date * 1000);
    const startOfWodEntryTime = dateOfWod.setDate(dateOfWod.getDate() - 2);

    if (currentDate < startOfWodEntryTime) {
      return res.status(601).json({
        status: false,
        message: statusCodeMessages[601]
      });
    }

    //check capacity if full.
    if (wod.Participants.length >= wod.capacity) {
      return res.status(602).json({
        status: false,
        message: statusCodeMessages[602]
      });
    }

    const result = await wod.addParticipants(userId);
    await wod.reload();

    return res
      .status(201)
      .json({ status: !!result, wod, message: statusCodeMessages[201] });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: result, message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const { userId, wodId } = req.body;

    if (!userId || !wodId) {
      return res
        .status(400)
        .json({ status: false, message: statusCodeMessages[400] });
    }

    const wod = await Wod.findByPk(wodId);

    if (!wod) {
      return res.status(600).json({
        status: false,
        message: statusCodeMessages[600]
      });
    }

    const result = await wod.removeParticipants(userId);

    await wod.reload();

    return res
      .status(201)
      .json({ status: !!result, wod, message: statusCodeMessages[201] });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const getWodWithUsers = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: statusCodeMessages[400] });
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

    if (!wodWitUsers) {
      return res.status(600).json({
        status: false,
        message: statusCodeMessages[600]
      });
    }

    return res.status(201).json({ status: true, wodWitUsers });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const wodController = {
  ...crudControllers(Wod),
  addUser,
  removeUser,
  getWodWithUsers
};

module.exports = wodController;
