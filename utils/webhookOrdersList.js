let request = require('request-promise')
let orderSchema = require('../model/orderSchema')

let saveOrders = async(Object, shop)=>{

  Object.line_items.forEach(async (item, i) => {
    let tempArray = [Object.name, Object.created_at, Object.customer.first_name, item.name];
    console.log(tempArray, "showing tempArray");
    const orderData = new orderSchema({
      order:tempArray,
      shop:shop
    });
    return await orderData.save(function(err, data){
      if (err) {
        console.log("save objecft error is", err);
      return err;
      }
      else {
        console.log(data, "data saved Successfully");
        return data;
      }

    });
  })
}

module.exports.saveOrders = saveOrders
