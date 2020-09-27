require("dotenv").config();
let request = require('request-promise')
let {saveCredential} = require('../service/storeService')
let makeWebook = async (token, shop, hmac, code) => {
const forwardingAddress = process.env.SHOPIFY_FORWARD_ADDRESS;

  console.log('makeWebook', { shop, code, hmac, token });
  let locationUrl = `https://${shop}/admin/api/2020-07/locations.json`
  let locationHeader = {
    'X-Shopify-Access-Token': token,
    'X-Shopify-Hmac-Sha256': hmac,
    'X-Shopify-Shop-Domain': shop,
    'X-Shopify-API-Version': '2020-07',
    'Content-Type': 'application/json',
  };

   let getLocation = await request.get(locationUrl, {headers: locationHeader})
    .then((shopResponse) => {
      let shopifyData = JSON.parse(shopResponse)
      // let savedLocation = saveLocation(shop, shopifyData.locations[0].id)
      // console.log(savedLocation," savedLocation try");
      return shopifyData.locations;
    })
    .catch((error) => {
      console.log('webhook utils error-->', error);
      return error
    });

    let saveFyndCredentials = await saveCredential(token, shop, hmac, code, getLocation[0].id)
    console.log(saveFyndCredentials, "save fynd credentials is");

  const webhookUrl = 'https://' + shop + '/admin/api/2020-01/webhooks.json';


  let webhookTopic = ["orders/create", "orders/cancelled", "refunds/create"]

  webhookTopic.forEach(async(item, i) => {
    let webhookPayload = {
      webhook: {
        topic: item,
        address: `${forwardingAddress}/order/store/${shop}/${item}`,
        format: 'json',
      },
    };
    let webhookHeaders = {
      'X-Shopify-Access-Token': token,
      'X-Shopify-Topic': item,
      'X-Shopify-Hmac-Sha256': hmac,
      'X-Shopify-Shop-Domain': shop,
      'X-Shopify-API-Version': '2020-07',
      'Content-Type': 'application/json',
    };
    return await request
      .post(webhookUrl, {
        headers: webhookHeaders,
        json: webhookPayload,
      })

      .then((shopResponse) => {

        console.log('order response is', shopResponse);
        return shopResponse;
      })
      .catch((error) => {
        console.log('webhook utils error-->', error);
        return error
      });
  });




};


module.exports.makeWebook = makeWebook
