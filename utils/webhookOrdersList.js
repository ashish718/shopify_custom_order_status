let request = require('request-promise')
let orderSchema = require('../model/orderSchema')
let {newShopify} = require('./test/test1.js')
let {getSingleStore} = require('../service/storeService')

let shopifyTagData = async(Object, shop)=>{
  let storeCredentials = await getSingleStore(shop)
  let newArray = []


  let result = await Object.line_items.map(async(item, i) => {
    let data =await newShopify(shop, item.product_id, storeCredentials[0])

    if (data.tags!="") {

      item.tag = data.tags
      console.log(item);
      return item
    }
    else {
      item.tag = ""
      return item
    }
  });
  // console.log(newArray.length, "length check");
  return await Promise.all(result)
}

let saveOrders = async(Object, shop)=>{

let itemData = await shopifyTagData(Object, shop)

  if (itemData.length>0) {
    let data = await orderSchema.find({"shop":shop.toString(), "order.orderId":Object.name.toString()})
    if (data.length>0) {
      return "Duplicate Item";
    }
    else {
      console.log(itemData, "itemData");
      //Object.line_items.forEach(async (item, i) => {
        let obj = await {
                    orderId:Object.name,
                    created_at:Object.created_at,
                    first_name: Object.customer.first_name,
                    last_name: Object.customer.last_name,
                    item: itemData
                  };

        const orderData = new orderSchema({
          order:obj,
          shop:shop
        });

        // console.log(JSON.stringify(orderData), "stringify data");
        // console.log(orderData, "without stringify");
         await orderData.save(function(err, data){
          if (err) {
            console.log("save objecft error is", err);
          return err;
          }
          else {
            console.log(data, "data saved Successfully");
            return data;
          }

        });
        return "done";
    }

  }
  else {
    return "not saved something wrong";
  }

}

module.exports.saveOrders = saveOrders
