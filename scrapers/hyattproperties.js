

require('dotenv').config()
const mongoose = require('mongoose');
const axios = require('axios');
const Property = require('../models/property');
const logger = require('../config/winston');


let getProperties = async () =>{
  const startTime = Date.now();

  try{
    let response = await axios.get('https://www.hyatt.com/explore-hotels/service/hotels')
    logger.info('got response data');
    let data = response.data
    let count = 0;
    for (let key of Object.keys(data)) {
      let row = data[key];
      count++;
      logger.info('Creating Property: '+count)

      await Property.create(row); 
    }

    let endTime = Date.now()
    let timeDelta = (endTime - startTime)/1000
    logger.info('ElapsedTime: '+timeDelta+' Seconds');
    //Exit process.
    process.exit(0)
      
  } catch (error) {
    throw(error);
  }
}



let connectToDB = () => {
  mongoose.connect(process.env.MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.once('open', function(){
    logger.info('connected to mongodb!');
    //Then kick off job
    getProperties();
  })
  mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
  });
}

//Now start job.
connectToDB();