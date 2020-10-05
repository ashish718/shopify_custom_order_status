let request = require('request-promise')
let orderSchema = require('../model/orderSchema')
let {newShopify} = require('./test/test1.js')

let saveOrders = async(Object, shop)=>{

  //getting tags from product data
  Object.line_items.forEach(async(item, i) => {
    let data =await newShopify(shop, item.product_id)
    console.log(data, "product data found");
    if (data.tags!="") {
      console.log(data.tags, "tags found");
      item.tag = data.tags
    }
  });

  //Object.line_items.forEach(async (item, i) => {
    let obj = {orderId:Object.name,
                created_at:Object.created_at,
                first_name: Object.customer.first_name,
                last_name: Object.customer.last_name,
                item: Object.line_items
              };

    const orderData = new orderSchema({
      order:obj,
      shop:shop
    });
    console.log(JSON.stringify(orderData), "stringify data");
    
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
