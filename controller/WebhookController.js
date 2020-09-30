// let {postOrder} = require('../utils/fyndCreateOrder')
// let {cancelOrder} = require('../utils/fyndCancelOrder')
// let {triggerToShopify} = require('../utils/fyndOrderWebhook')
// let {saveFailedOrders, getFailedOrders} = require('../service/OrderDataMapping')
// let {orderTrigger} = require('../utils/FailedOrdersTrigger')
// let {findMappedDataByVId} = require('../service/saveMappedData')
let {saveOrders} = require('../utils/webhookOrdersList')
let orderSchema = require('../model/orderSchema')
let settingSchema = require('../model/settingSchema')

exports.CreateOrder = async (request, response) =>{

  let shop = request.params.shop;
   let topic = request.params.topic;
   let subtopic = request.params.subtopic;
   topic = topic + '/' + subtopic;
   console.log('topic -->', topic);


   try {
     if (topic==='orders/create') {
       console.log(request.body, "order create request body");
       let savingToDb = await saveOrders(request.body, shop)
       // if (savingToDb) {
         response.send("saved Successfully")
       // }
       // else {
       //   response.send("something went wrong")
       // }

       // let postData = await postOrder(request.body, shop)
       // console.log(postData, "post data response");
       // if (postData.success===true) {
       //   console.log("fynd order created success", postData);
       //   response.send('success')
       //}
       // else if(postData.success===false){
       //   let savedata = saveFailedOrders(request.body, shop)
       //   response.send(savedata)
       // }
     }
     else if (topic==='orders/cancelled') {
       console.log(request.body, "order cancelled request body");
       // let cancelData = await cancelOrder(request.body, shop)
       // console.log("cancelData is", cancelData);
       // response.send("cancelled done successfully")
     }
     else if(topic==="refunds/create") {
       console.log(request.body, "refunds create rsespomnse");
     }

   } catch (e) {
     console.log(e);

   }


}




exports.showOrders = async(req, res)=>{
  await orderSchema.find({shop: req.params.shop}, function(err, docs){
    if (err) {
      res.send(err)

    }
    else {


      res.send(docs)

    }
  })

}


exports.updateOrderStatus = async(req, res)=>{
  // console.log(req.body);
  // console.log(req.params.shop);
  // await orderSchema.findOneAndUpdate({_id:req.body.order._id}, {$set:{status:req.body.status}}, { new: true }, function(err, docs){
  //   if (err) {
  //     console.log(err);
  //     res.send(err)
  //   }
  //   else {
  //     console.log(docs, "update successfully");
  //     res.send(docs);
  //   }
  // })

  await orderSchema.findOne({shop:req.params.shop, "order.orderId":req.body.orderId}, function(err, docs){
    if (err) {
      console.log(err);
      res.send(err)
    }
    else {
      orderSchema.updateOne({"order.item.id": req.body.item.id}, {$set:{"order.item.$.status": req.body.status}}, function(err, data) {
        if (err) {
          console.log(err, "update err");
          res.send(err)
        }
        else {
          console.log(data);
          res.send(data)
        }
      })

    }
  })
}

exports.saveSetting = async(req, res)=>{

  const settingData = new settingSchema({
    tag:req.body.tagValue,
    inputValue:req.body.makeInputArray,
    shop:req.params.shop
  });
  console.log(settingData, "json obj");
  await settingData.save(function(err, result){
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  })
}

exports.getSetting = async(req, res)=>{
  await settingSchema.find({shop:req.params.shop}, function(err, docs){
    if (err) {
      res.send(err)
    }
    else {
      res.send(docs)
    }
  })
}
