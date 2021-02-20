const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This is a single "stay" record - represents a price at a point in time.
const recordSchema = new Schema({
  startdate: Date,
  enddate: Date,
  propertycode: String,
  highprice: Number,
  avgprice: Number,
  lowprice: Number,
  pointPrice: Number
}, {timestamps: true});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
