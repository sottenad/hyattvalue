const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This represents a single property
const propertySchema = new Schema({
  spiritCode: String,
  awardCategory: { 
    key: String, 
    label: String
  },
  brand: { 
    key: String, 
    label: String
  },
  image: String,
  location: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    zipcode: String,
    stateProvince: { 
      key: String, 
      label: String 
    },
    subRegion: { 
      key: String, 
      label: String
    },
    country: { 
      key: String, 
      label: String
    },
    region:  { 
      key: String, 
      label: String
    },
    geolocation: { 
      latitude: Number, 
      longitude: Number 
    }
  },
  rate: {
    currencyCode: String,
    usdRate: Number,
    bookingPeriodDays: Number,
    localRate: Number,
    marketingPointsValue: Number
  },
  rating: {
    numReviews: Number,
    rating: Number,
    verifiedNumReviews: Number,
    verifiedRating: Number
  },
  logo: String,
  name: String,
  shortName: String,
  url: String
}, {timestamps: true});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
