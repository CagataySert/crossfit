const { Router } = require('express');
const sectionController = require('../controllers/section.controller');

const router = Router();

// /api/section/getOne
router.route('/getOne').post(sectionController.getOne);

// /api/section/getMany
router.route('/getMany').post(sectionController.getMany);

// /api/section/createOne
router.route('/createOne').post(sectionController.createOne);

// /api/section/updateOne
router.route('/updateOne').post(sectionController.updateOne);

// /api/section/removeOne
router.route('/removeOne').post(sectionController.removeOne);

// // /api/section/:id
// router
//   .route('/:id')
//   .get(controllers.getOne)
//   .put(controllers.updateOne)
//   .delete(controllers.removeOne);

module.exports = router;
