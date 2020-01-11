const { Router } = require('express');
const wodController = require('../controllers/wod.controller');

const router = Router();

// /api/wod/getOne
router.route('/getOne').post(wodController.getOne);

// /api/wod/getMany
router.route('/getMany').post(wodController.getMany);

// /api/wod/createOne
router.route('/createOne').post(wodController.createOne);

// /api/wod/updateOne
router.route('/updateOne').post(wodController.updateOne);

// /api/wod/removeOne
router.route('/removeOne').post(wodController.removeOne);

// api/wod/addUser
router.route('/addUser').post(wodController.addUser);

// api/wod/removeUser
router.route('/removeUser').post(wodController.removeUser);

// api/wod/getWodWithUsers
router.route('/wodWithUsers').get(wodController.getWodWithUsers);

// // /api/wod/:id
// router
//   .route('/:id')
//   .get(controllers.getOne)
//   .put(controllers.updateOne)
//   .delete(controllers.removeOne);

module.exports = router;
