let db = require('../config/database.js')
let storeCredentialsSchema = require('../model/storeCredentialsSchema')


  module.exports.saveCredential = ( token,shop, hmac, code, locationId) =>{
  console.log("service log",{token, shop, hmac, code});
  let storeObj = {
    "token": token,
    "shop": shop,
    "hmac": hmac,
    "code": code,
    "locationId":locationId,
    "joining":Date()
  };

  storeCredentialsSchema.findOne(
        {shop}
        ,
        function (err, data) {
          if (data) {
            console.log('store found in DB', data);

            return storeCredentialsSchema.findOneAndUpdate({shop}, {"$set":storeObj}, { returnNewDocument: true })
              .then(updatedDocument => {
                if(updatedDocument) {
                  console.log(`Successfully updated document:`)
                } else {
                  console.log("No document matches the provided query.")
                }

              })
              .catch(err => console.error(`Failed to find and update document: ${err}`))

          } else {
            console.log('store !found in DB');
            const storeCredentials = new storeCredentialsSchema({
              token,
              shop,
              hmac,
              code,
              joining: Date()
            });
            console.log(storeCredentials);
            storeCredentials.save(function (err, data) {
              if (!err) {
                console.log(`${shop} data store to DB`, data);
              } else {
                console.log(err);
              }
            });
          }
        }
    );
}

module.exports.getSingleStore = async (shop)=>{
  return storeCredentialsSchema.find(
        {"shop":shop}
        ,
        function (err, data) {
          if (data) {
            console.log('store found in DB', data);
            return data
          } else {
            console.log("store not found");
            return "store not found"
          }
}
)
}
