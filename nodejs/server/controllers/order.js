const stripe = require('stripe')(process.env.STRIPE_SEC_KEY)
const {product,order} = require('../modules/products')

const pursh = async (req , res)=>{
try{
   //get orders from from requies body
   const order = req.body
   //fetch products data from data base
   const productIds = order.map((resulte)=>resulte.productId)
   //find prducts in data base with IDs
   let db_products = await product.find({_id:{$in:productIds}})
   //map line items
   for (let i = 0; i < db_products.length;i++){
      if(Number(order[i].qu) > Number(db_products[i].in_stock)){
       return res.status(400).json({message:'required quantity is greater than is stock products'})  
      }
   }
   //prepare stripe order details object
   let stripe_orders = db_products.map((item,index) =>{
         return{
                  price_data:{
                           currency:'usd',
                           product_data:{
                              productId:item._id,
                              name : item.title
                           },
                           unit_amount: Number(item.price)          
                           },
                  quantity:Number(order[index].qu),
               }
   })
   //check order
   if(db_products && db_products.length !== 0){
      const session = await stripe.checkout.sessions.create({
         payment_method_types :['card'],
         mode:'payment',
         line_items:stripe_orders,
         metadata:{orders :JSON.stringify(order)},
         success_url: 'http://127.0.0.1:5500/frontend/homepage.html#/',
         cancel_url: 'http://127.0.0.1:5500/frontend/homepage.html#/'
      }).then((resulte)=>{
         //return the response to the user   
         return res.json(resulte)
      }).catch(err=>console.log(err))
      
   }else{
      return res.status(500).json({message:'you did not provide correct order informations'})
   }
}catch(err){
   console.log({err})
   return res.status(400).json({message:err.message})
}
}

const updateProduct  = async (data) =>{
 try{
   const data_object = []
   data.forEach(item =>{
      data_object.push({updateOne:
         {
         filter:{_id:item.productId},
         update:{$inc:{in_stock: -Number(item.qu)}} 
         }
         })
   })
   console.log(data_object)
   await product.bulkWrite(data_object).then(res=>{
      if(res.ok === 1){
         const orderObject = {
            order_data:data_object,
            stipe_checkout_session_id:data.stipe_checkout_session_id,
         }
         const newOrder = new order(data).save().then(res=>{
            console.log(res)
         }).catch(err=>{
            console.log(err)
         })
      }
   }).catch(err=>{
   })  
}catch(err){
   console.log(err)
}
}
const webhook_callback =  (req , res)=>{
   //get body contents
   let payload = req.body
   const sig = req.headers['stripe-signature'];
   let event;
   try {
     //sign
     event = stripe.webhooks.constructEvent(payload,sig,'whsec_48841faba8675861d5c5e9b800b4d8b39ddb0f60e20fa43797fbacb0b535e668')
   }catch(err){
    console.log(err.message)
    return res.status(404).send()
   }
   if(event.type === 'checkout.session.completed'){
      const session = event.data.object
      data = JSON.parse(session.metadata.orders)
      data.stipe_checkout_session_id = session.id
      updateProduct(data)
   }
   res.status(200).send()
}

module.exports = {pursh , webhook_callback}