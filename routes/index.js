require('dotenv').config()
const router = require('express').Router();
const logger = require('../config/winston');
const axios = require('axios');

/* GET Ranked List of properties . */
router.get('/', async function (req, res, next) { 
    
  

  res.render('index/index', {});

});

module.exports = router;