const statusCodeMessages = require('../../utils/status.codes');
const accessControl = require('../../utils/access.control.roles');

const getOne = model => async (req, res) => {
  const { attributes, where, order, limit } = req.body;
  try {
    const doc = await model.findOne({
      attributes,
      where,
      order,
      limit
    });
    if (!doc)
      return res
        .status(600)
        .json({ status: false, message: statusCodeMessages[600] });

    return res
      .status(200)
      .json({ status: true, data: doc, message: statusCodeMessages[200] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const getMany = model => async (req, res) => {
  const { attributes, where, order, limit } = req.body;
  try {
    const docs = await model.findAll({
      attributes,
      where,
      order,
      limit
    });

    if (!docs)
      return res
        .status(600)
        .json({ status: false, message: statusCodeMessages[600] });

    return res
      .status(200)
      .json({ status: true, data: docs, message: statusCodeMessages[200] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });

    if (!doc)
      return res
        .status(400)
        .json({ status: false, message: statusCodeMessages[400] });

    return res
      .status(201)
      .json({ status: true, data: doc, message: statusCodeMessages[201] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const updateOne = model => async (req, res) => {
  const { fieldsAndValues, where } = req.body;
  if (!fieldsAndValues || !where)
    res.status(400).json({ status: false, message: statusCodeMessages[400] });
  try {
    const doc = await model.update(fieldsAndValues, { where });

    if (!doc)
      return res
        .status(400)
        .json({ status: false, message: statusCodeMessages[400] });

    return res
      .status(200)
      .json({ status: true, data: doc, message: statusCodeMessages[200] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const removeOne = model => async (req, res) => {
  const { where } = req.body;
  try {
    const doc = await model.destroy({ where });

    if (!doc)
      return res
        .status(400)
        .json({ status: false, message: statusCodeMessages[400] });

    return res
      .status(200)
      .json({ status: true, data: doc, message: statusCodeMessages[200] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = model => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model)
});
