let router = require('express').Router()
let shopifyStoreInstallController = require('../controller/shopifyStoreInstallController')

router.get('/shopify', shopifyStoreInstallController.install)

router.get('/shopify/callback', shopifyStoreInstallController.verify)


module.exports = router
