require('dotenv').config()
const router = require('express').Router();
const logger = require('../config/winston');
const axios = require('axios');

/* GET Ranked List of properties . */
router.get('/ranked', async function (req, res, next) {
  let properties = [];
  try{
    
    let response = await axios.get('https://www.hyatt.com/explore-hotels/service/hotels')
    let data = response.data

    for (var key of Object.keys(data)) {
      let row = data[key];
      
      if(row && row.rate && row.rate.marketingPointsValue && row.rate.usdRate){
        let obj = {
          usdRate: row.rate.usdRate,
          marketingPointsValue: row.rate.marketingPointsValue,
          value: (row.rate.usdRate /row.rate.marketingPointsValue).toFixed(5),
          name: row.name
        }
        properties.push(obj);
      }
    }
    
    properties.sort((a,b) =>{
      return a.value - b.value;
    })    

  }catch (error) {
    throw(error);
  }

  res.json(properties);

});

module.exports = router;