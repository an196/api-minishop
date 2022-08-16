const express = require('express');
const router = express.Router();
const bannerController = require('../../controllers/bannerController');
router.route('/default')
    .get(bannerController.getBanner)
    .post(bannerController.addBanner)

router.route('/default/:id')
    .patch(bannerController.updateBanner)
module.exports = router;