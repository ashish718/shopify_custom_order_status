let request = require('request-promise')
let orderSchema = require('../model/orderSchema')

let saveOrders = async(Object, shop)=>{

      const orderData = new orderSchema({
        order:Object,
        shop:shop
      });
      orderData.save((err, data)=>{
        if (err) {
          console.log("save objecft error is", err);
        return err;
        }
        else {
          console.log(data, "data saved Successfully");
          return data;
        }

      })

    
}

module.exports.saveOrders = saveOrders
