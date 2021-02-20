require('dotenv').config()
const router = require('express').Router();
const logger = require('../config/winston');



/* GET home page. */
router.get('/', async function (req, res, next) {
  
  res.render('index', {title: "Home"});

});

module.exports = router;