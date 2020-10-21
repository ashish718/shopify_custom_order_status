let {saveOrders} = require('../utils/webhookOrdersList')
let {matchOrderTags} = require('../utils/matchTag')
let orderSchema = require('../model/orderSchema')
let settingSchema = require('../model/settingSchema')
let {sms} = require('../utils/test/test2')

exports.CreateOrder = async (request, response) =>{

  let shop = request.params.shop;
   let topic = request.params.topic;
   let subtopic = request.params.subtopic;
   topic = topic + '/' + subtopic;
   console.log('topic -->', topic);


   try {
     if (topic==='orders/create') {
       console.log(request.body, "order create request body");

       let data = await orderSchema.find({"shop":request.params.shop.toString(), "order.orderId":request.body.name})

       if (data.length>0) {

         response.status(200).send("duplicate")

       }

       else{

           let savingToDb = await saveOrders(request.body, shop)
            console.log(savingToDb, "savingToDb");
           // if (savingToDb==="done") {
           //
           // response.send(savingToDb)
           // }
           // else {
           //   response.send("something went wrong")
           // }
           console.log(savingToDb);
           response.status(200).send(savingToDb)
        }
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
       settingSchema.find({shop:req.params.shop}, async function(err, data){
        if (err) {
          res.send(err)
        }
        else {
          let matchTagFunction = await matchOrderTags(docs, data)
          // console.log(matchTagFunction);
          if (matchTagFunction.length>0) {
            // console.log(JSON.stringify(matchTagFunction));
            res.send(matchTagFunction)
          }
          else {
            console.log("nothing found");
          }

        //   console.log(data, "setting data");
        // docs.forEach((item, i) => {
        //   item.order.item.forEach((orderItem, j) => {
        //     data.forEach((tagItem, k) => {
        //       if (orderItem.tag === tagItem.tag) {
        //         orderItem.tagValue = tagItem.inputValue
        //         return orderItem;
        //       }
        //       else {
        //         orderItem.tagValue = ["No Tag Found"]
        //         return orderItem;
        //       }
        //     });
        //
        //   });
        //
        // });
        // //console.log(JSON.stringify(docs));
        // res.send(docs)

        }
      })

      // res.send(docs)

    }
  })

}


exports.updateOrderStatus = async(req, res)=>{
  console.log(req.body, "eq body is");
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

  await orderSchema.findOne({shop:req.params.shop, "order.orderId":req.body.orderId}, async function(err, docs){
    if (err) {
      console.log(err);
      res.send(err)
    }
    else {
      orderSchema.updateOne({"order.item.id": req.body.item.id}, {$set:{"order.item.$.status": req.body.status}}, async function(err, data) {
        if (err) {
          console.log(err, "update err");
          res.send(err)
        }
        else {
          console.log(data);

          let sendSms = await sms(docs, req.params.shop, data)
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

exports.deleteSetting = async(req, res)=>{
  console.log(req.params);
  await settingSchema.deleteOne({_id:req.params.id}, function(err, docs){
    if (err) {
      console.log(err);
    }
    else {
      console.log(docs);
      res.send(docs)
    }
  })
}
