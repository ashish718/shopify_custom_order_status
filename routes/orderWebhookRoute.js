let router = require('express').Router()
let WebhookController = require('../controller/WebhookController')

router.post('/store/:shop/:topic/:subtopic', WebhookController.CreateOrder)
router.get('/record/:shop', WebhookController.showOrders)
router.put('/record/:shop', WebhookController.updateOrderStatus)

module.exports = router
