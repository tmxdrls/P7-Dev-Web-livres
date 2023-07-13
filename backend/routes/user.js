const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

const userPassword = require('../middleware/passwordVal')

router.post('/signup', userPassword.validPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;