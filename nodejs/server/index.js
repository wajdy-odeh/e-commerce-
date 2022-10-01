require('dotenv').config()
const path = require('path')
//import express and create application
const express = require('express')
app = express()
//import products and users routers
const Products = require('./route/products')
const Users = require('./route/users')
//import and connect to the database
const {conntect} = require('./modules/database')
const {product,user} = require('./modules/products')
const jwt = require('jsonwebtoken')
const {products, users} = require('./productsSample');
const userfunctions = require('./route/userFunctions')
const {OrdersRouter} = require('./route/order')
const cookieParser = require('cookie-parser') 
const uploadFile = require ('express-fileupload')
const cors = require('cors')
app.use(cors());
app.use(cookieParser());
app.use(uploadFile({createParentPath : true}));
//app.use(express.json())
//set routers
app.use('/api/v1/products' , express.json(),Products)
app.use('/api/v1/users' ,express.json(), Users)
app.use('/api/v1/userfunctions',express.json() , userfunctions)
app.use('/api/v1/order' , OrdersRouter)

//connect to the database and create the server
conntect().then(()=>{

    app.listen(5000 , ()=>{
        console.log('server is started')
    }) 
    console.log('succsess')
}).catch( (err)=>{
    console.log(err)
} )

