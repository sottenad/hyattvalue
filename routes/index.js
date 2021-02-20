require('dotenv').config()
const router = require('express').Router();
const logger = require('../config/winston');


/* GET home page. */
router.get('/', requireLoggedIn, async function (req, res, next) {