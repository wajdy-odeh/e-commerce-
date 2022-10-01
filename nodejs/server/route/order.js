const bodyparser = require('body-parser')

const OrdersRouter = require('express').Router()
const {pursh,webhook_callback} = require('../controllers/order')

//get order
OrdersRouter.post('/purhes',bodyparser.json(), pursh)
OrdersRouter.post('/webhook',bodyparser.raw({type: 'application/json'}),webhook_callback)

module.exports = {OrdersRouter}
