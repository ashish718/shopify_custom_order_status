let msg91 = require("msg91")("129310AeIewjfm5d19a1bb", "BEWELL", "ROUTE_NO" );

let mobileNo = "9953477149";

msg91.send(mobileNo, "Gi Msg 91 Test start", function(err, response){
    if (err) return console.log(err);
    console.log(response);
});
