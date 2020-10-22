let msg91 = require("msg91")("129310AeIewjfm5d19a1bb", "BEWELL", "ROUTE_NO" );



module.exports.sms = async(mobileNo, obj, shop)=>{
// console.log(docs, "docs");
// console.log(shop, "shop");
// console.log(data, "data");
console.log(mobileNo, "mobileNo");

  let message = `Hi greetings from ${shop} your ${obj.orderId} of item ${obj.item.name} status is ${obj.status}`

  return await msg91.send(mobileNo, message, function(err, response){
      if (err) return console.log(err);
      console.log(response, "response");
      return response
  });
}
