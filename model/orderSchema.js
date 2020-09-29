const mongoose = require('mongoose');

const orderWebhookSchema = new mongoose.Schema({
  order:{
    type:Object
  },
  shop:{
    type:String
  },
  status:{
    type:String,
    default:null
  }
});

module.exports = mongoose.model('orderSchema', orderWebhookSchema)
