const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserController');

router.post('/signin', userController.createUser);
router.post('/', userController.getAllUsers);

module.exports = router;