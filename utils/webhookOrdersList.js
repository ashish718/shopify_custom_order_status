let request = require('request-promise')
let orderSchema = require('../model/orderSchema')

let saveOrders = async(Object, shop)=>{

  Object.line_items.forEach(async (item, i) => {
    let obj = {orderId:Object.name,
                created_at:Object.created_at,
                custome_name: Object.customer.first_name +' '+Object.custome.last_name,
                item: item.name
              };
    
    const orderData = new orderSchema({
      order:obj,
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
