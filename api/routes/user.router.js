const { Router } = require('express');
const userController = require('../controllers/user.controller');
const User = require('../../db/models/user');
const Wod = require('../../db/models/wod');

const router = Router();

// /api/user/getOne
router.route('/getOne').post(userController.getOne);

// /api/user/getMany
router.route('/getMany').post(userController.getMany);

// /api/user/createOne
router.route('/createOne').post(userController.createOne);

// /api/user/updateOne
router.route('/updateOne').post(userController.updateOne);

// /api/user/removeOne
router.route('/removeOne').post(userController.removeOne);

// // /api/user/:id
// router
//   .route('/:id')
//   .get(controllers.getOne)
//   .put(controllers.updateOne)
//   .delete(controllers.removeOne);

module.exports = router;
