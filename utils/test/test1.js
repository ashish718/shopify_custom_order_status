// const Shopify = require('shopify-api-node');
let request = require('request-promise')


let newShopify = async(shop, productId, credential)=>{
  console.log(shop, productId, credential, "revert now");
  let shopRequestHeaders = {
        'X-Shopify-Access-Token': credential.token,
        'Content-Type': 'application/json',
        'X-Shopify-Hmac-Sha256': credential.hmac,
        'X-Shopify-Shop-Domain': shop,
        'X-Shopify-API-Version': '2020-10',
      };
  return await request.get(`https://${shop}/admin/api/2020-10/products/${productId}.json`, {headers:shopRequestHeaders})
  .then(data=>{
    data = JSON.parse(data)
    // console.log(data.product);
    return data.product
  })
  .catch(error=>{
    console.log(error);
  })
}

module.exports.newShopify = newShopify;
