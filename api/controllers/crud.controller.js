const defaultErrorRes = { status: false, message: 'request failed!' };

const getOne = model => async (req, res) => {
  const { attributes, where, order, limit } = req.body;
  console.log(model);
  try {
    const doc = await model.findOne({
      attributes,
      where,
      order,
      limit
    });
    if (!doc) res.status(400).send(defaultErrorRes);

    res
      .status(200)
      .json({ status: true, data: doc, message: 'Finded successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(defaultErrorRes);
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

    if (!docs) res.status(400).send(defaultErrorRes);

    res
      .status(200)
      .json({ status: true, data: docs, message: 'Finded successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(defaultErrorRes);
  }
};

const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });

    if (!doc) res.status(400).send(defaultErrorRes);

    res
      .status(201)
      .json({ status: true, data: doc, message: 'Created successfully' });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

const updateOne = model => async (req, res) => {
  const { fieldsAndValues, where } = req.body;
  if (!fieldsAndValues || !where) res.status(400).send(defaultErrorRes);
  try {
    const doc = await model.update(fieldsAndValues, { where });

    if (!doc) res.status(400).send(defaultErrorRes);

    res
      .status(200)
      .json({ status: true, data: doc, message: 'Updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(defaultErrorRes);
  }
};

const removeOne = model => async (req, res) => {
  const { where } = req.body;
  try {
    const doc = await model.destroy({ where });

    if (!doc) res.status(400).send(defaultErrorRes);

    res
      .status(200)
      .json({ status: true, data: doc, message: 'Deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(defaultErrorRes);
  }
};

module.exports = model => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model)
});
