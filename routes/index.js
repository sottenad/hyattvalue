require('dotenv').config()
const router = require('express').Router();
const logger = require('../config/winston');
const axios = require('axios');

/* GET Ranked List of properties . */
router.get('/', async function (req, res, next) {
  let properties = [];
  let totalCount = 0;
  let processedCount = 0;
  try{
    
  

  res.render('index/index', {properties, totalCount, processedCount});

});

module.exports = router;