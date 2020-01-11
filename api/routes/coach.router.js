const { Router } = require('express');
const coachController = require('../controllers/coach.controller');
const Coach = require('../../db/models/coach');
const Wod = require('../../db/models/wod');

const router = Router();

// /api/coaches/getOne
router.route('/getOne').post(coachController.getOne);

// /api/coaches/getMany
router.route('/getMany').post(coachController.getMany);

// /api/coaches/createOne
router.route('/createOne').post(coachController.createOne);

// /api/coaches/updateOne
router.route('/updateOne').post(coachController.updateOne);

// /api/coaches/removeOne
router.route('/removeOne').post(coachController.removeOne);

router.route('/test').post(async (req, res) => {
  try {
    const { wods, ...data } = req.body;
    const coach = await Coach.create(data);

    console.log(wods);
    if (wods && wods.length > 0) {
      await coach.setWods(wods);
    }
    return res.status(200).json(coach);
  } catch (error) {
    res.status(500).json({ error });
    console.log(error.message);
  }
});

router.route('/test2').get(async (req, res) => {
  try {
    const coaches = await Coach.findAll({
      include: [
        {
          model: Wod,
          as: 'wods',
          through: { attributes: [] }
        }
      ]
    });
    return res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ error });
    console.log(error.message);
  }
});

// // /api/coaches/:id
// router
//   .route('/:id')
//   .get(controllers.getOne)
//   .put(controllers.updateOne)
//   .delete(controllers.removeOne);

module.exports = router;
