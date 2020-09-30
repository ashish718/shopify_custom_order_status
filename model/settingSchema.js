const mongoose = require('mongoose');

const ordeSettingSchema = new mongoose.Schema({
  tag:{
    type:String
  },
  inputValue:{
    type:Array
  },
  shop:{
    type:String
  }
});

module.exports = mongoose.model('settingSchema', ordeSettingSchema)
