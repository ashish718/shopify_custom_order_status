// const Shopify = require('shopify-api-node');
let request = require('request-promise')

let newShopify = async(shop, productId)=>{
  console.log(shop, productId, "revert now");
  let shopRequestHeaders = {
        'X-Shopify-Access-Token': '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',
        'Content-Type': 'application/json',
        'X-Shopify-Hmac-Sha256': '413cee38bf1482f46728b56443e42e6056d815e313bf2e3f182831509c8f709b',
        'X-Shopify-Shop-Domain': 'demo-mojito.myshopify.com',
        'X-Shopify-API-Version': '2020-10',
      };
  return await request.get(`https://demo-mojito.myshopify.com/admin/api/2020-10/products/${productId}.json`, {headers:shopRequestHeaders})
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
