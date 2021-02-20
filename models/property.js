const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This represents a single property
const propertySchema = new Schema({
  code: String,
  awardCategory: Number,
  brand: String,
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
    subRegion: String,
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
