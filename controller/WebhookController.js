// let {postOrder} = require('../utils/fyndCreateOrder')
// let {cancelOrder} = require('../utils/fyndCancelOrder')
// let {triggerToShopify} = require('../utils/fyndOrderWebhook')
// let {saveFailedOrders, getFailedOrders} = require('../service/OrderDataMapping')
// let {orderTrigger} = require('../utils/FailedOrdersTrigger')
// let {findMappedDataByVId} = require('../service/saveMappedData')

exports.CreateOrder = async (request, response) =>{

  let shop = request.params.shop;
   let topic = request.params.topic;
   let subtopic = request.params.subtopic;
   topic = topic + '/' + subtopic;
   console.log('topic -->', topic);


   try {
     if (topic==='orders/create') {
       console.log(request.body, "order create request body");
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
