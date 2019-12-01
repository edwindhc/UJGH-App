const { Router } = require('express');
const controller = require('../controllers/user.controller');
const router = Router();

router.param('userId', controller.load);

router
    .route('/')
    .get(controller.list)
    .post(controller.create);

router
    .route('/:userId')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.delete);

module.exports = router;