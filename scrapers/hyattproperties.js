

require('dotenv').config()
const mongoose = require('mongoose');
const Property = require('../models/property');
const logger = require('../config/winston');

let getProperties = async () =>{
  try{
    let response = await axios.get('https://www.hyatt.com/explore-hotels/service/hotels')
    let data = response.data
    let count = 0;
    for (var key of Object.keys(data)) {
      let row = data[key];
      count++;

      if(count < 1)
        console.log(row)
    
        
      }
    
  
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
