let request = require('request-promise')
let orderSchema = require('../model/orderSchema')
let {newShopify} = require('./test/test1.js')

let shopifyTagData = async(Object, shop)=>{
  let newArray = []
  Object.line_items.forEach(async(item, i) => {
    let data =await newShopify(shop, item.product_id)

    if (data.tags!="") {
      
      item.tag = data.tags
      newArray.push(item)
    }
  });
  return await Promise.all(newArray)
}

let saveOrders = async(Object, shop)=>{

let itemData = await shopifyTagData(Object, shop).then(data=>{
  console.log(data, "then functipn data");
})
console.log(itemData);

  //Object.line_items.forEach(async (item, i) => {
    let obj = await {
                orderId:Object.name,
                created_at:Object.created_at,
                first_name: Object.customer.first_name,
                last_name: Object.customer.last_name,

              };

    const orderData = new orderSchema({
      order:obj,
      shop:shop
    });

    console.log(JSON.stringify(orderData), "stringify data");
    console.log(orderData, "without stringify");
    // return await orderData.save(function(err, data){
    //   if (err) {
    //     console.log("save objecft error is", err);
    //   return err;
    //   }
    //   else {
    //     console.log(data, "data saved Successfully");
    //     return data;
    //   }
    //
    // });
  //})
}

module.exports.saveOrders = saveOrders
