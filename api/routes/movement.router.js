const { Router } = require('express');
const movementController = require('../controllers/movement.controller');

const router = Router();

// /api/movement/getOne
router.route('/getOne').post(movementController.getOne);

// /api/movement/getMany
router.route('/getMany').post(movementController.getMany);

// /api/movement/createOne
router.route('/createOne').post(movementController.createOne);

// /api/movement/updateOne
router.route('/updateOne').post(movementController.updateOne);

// /api/movement/removeOne
router.route('/removeOne').post(movementController.removeOne);

// // /api/movement/:id
// router
//   .route('/:id')
//   .get(controllers.getOne)
//   .put(controllers.updateOne)
//   .delete(controllers.removeOne);

module.exports = router;
