const { Router } = require('express');
const controller = require('../controllers/proyect.controller');
const router = Router();

router
    .route('/')
    .get(controller.list)
    .delete(controller.delete);

router
    .route('/download')
    .post(controller.download);

router
    .route('/upload')
    .post(controller.upload);

module.exports = router;