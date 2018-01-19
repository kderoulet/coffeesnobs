const express = require('express');
const router = express.Router();
const User = require('../models/user');
const usersCtrl = require('../controllers/usersCtrl')

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

modeule.exports = router