const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  shop:{
    type: String
  },
  token:{
    type: String
  },
  code:{
    type: String
  },
  hmac:{
    type: String
  },
  joining:{
    type:Date
  },
  application_id:{
    type:String
  },
  application_token:{
    type:String
  },
  application_secretKey:{
    type:String
  },
  priceSync:{
    type:Boolean,
    default:false
  },
  locationId:{
    type:String
  },
  inventorySyncStatus:{
    type:String

  },
  isPincode:{
    type:Boolean,
    default: false
  },

});

module.exports = mongoose.model('storeCredentialsSchema', storeSchema)
