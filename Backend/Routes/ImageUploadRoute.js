const express = require('express');
const router = express.Router();

const ImageUploadController = require('../Controllers/ImageUploadController.js');

router.post('/upload', ImageUploadController.uploadImage);
router.get('/upload', ImageUploadController.getAllUsers);

module.exports = router;