const mongoose = require('mongoose');

const orderWebhookSchema = new mongoose.Schema({
  order:{
    type:Object
  },
  shop:{
    type:String
  }
});

module.exports = mongoose.model('orderSchema', orderWebhookSchema)
