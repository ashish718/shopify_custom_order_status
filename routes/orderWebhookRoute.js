let router = require('express').Router()
let WebhookController = require('../controller/WebhookController')


router.post('/store/:shop/:topic/:subtopic', WebhookController.CreateOrder)

module.exports = router
