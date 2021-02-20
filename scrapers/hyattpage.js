// //Scrapes an individual hyatt page for an individual date.
 require('dotenv').config()
 const mongoose = require('mongoose');
const logger = require('../config/winston');
const { format } =  require('date-fns');
const Property = require('../models/property');

const proxies = [
  '91.221.94.25',
  '91.221.94.30',
  '91.221.94.35',
  '91.221.94.36',
  '91.221.94.39',
  '91.221.94.70',
  '91.221.94.79',
  '91.221.94.84',
  '91.221.94.90',
  '91.221.94.107',
  '91.221.94.138',
  '91.221.94.150',
  '91.221.94.161',
  '91.221.94.166',
  '91.221.94.171',
  '91.221.94.181',
  '91.221.94.185',
  '91.221.94.196',
  '91.221.94.200',
  '91.221.94.202',
  '91.221.94.209',
  '91.221.94.217',
  '91.221.94.225',
  '91.221.94.237'
 ]
 


const puppeteer = require('puppeteer-extra')
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const pluginProxy = require('puppeteer-extra-plugin-proxy');
puppeteer.use(StealthPlugin())

let proxyRotation = 0;

let getPropertyPage = async (property, startDate, endDate, paymentType) =>{
  logger.info('getting property page')
  //Gets the page, then parses it looking for pricing data.
  puppeteer.use(pluginProxy({
      address: proxies[proxyRotation],
      port: 60099,
      credentials: {
        username: 'sottenad',
        password: 'fc9288ef',
      }
  }));

  if(proxyRotation+1 <= proxies.length){
    proxyRotation++;
  }else{
    proxyRotation = 0;
  }

  puppeteer.launch({ headless: true }).then(async browser => {
    const page = await browser.newPage()
    let url = `https://www.hyatt.com/shop/rates/${property}?checkinDate=${startDate}&checkoutDate=${endDate}&rooms=1&adults=1&kids=0&rate=${paymentType}&rateFilter=${paymentType.toLowerCase()}`
    logger.info(url)
    await page.goto(url);
    await page.waitForSelector("[data-utag-rate-list]")
    let content = await page.content();
    let regEx = /data-utag-rate-list="(.*)"/
    var match = regEx.exec(content.toString());
    if(match && match[1]){
      let prices = match[1]
      logger.info(prices);
    }
    await browser.close()
  })

}
  

let getProperties = async () =>{
  //gets the properties, and writes the appropriate jobs.
  
    let properties = await Property.find({}).limit(2);
    return properties;
  
}

 
let connectToDB = () => {
  mongoose.connect(process.env.MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.once('open', function(){
    logger.info('connected to mongodb!');
    //Then kick off job
    getProperties().then((properties) =>{
      for(let prop of properties){
        let code = prop.spiritCode;
        let startDate = format(new Date(2021, 3, 4), 'yyyy-MM-dd');
        let endDate = format(new Date(2021, 3, 11), 'yyyy-MM-dd'); 
        let paymentType = "Standard" //"standard" for cash
        getPropertyPage(code, startDate, endDate, paymentType);
      }
    })

  })
  mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
  });
}

//Now start job.
connectToDB();