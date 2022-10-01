const {user , product} =  require('../modules/products')

const getProduct = async (req ,res)=>{
    //get product id from http header
    const productID = req.params.productId;
    console.log(productID)
    //find product in mangoDB database and then send response
    //send err if product is not exsists
    const resulte = await product.find({_id:productID}).then((response)=>{   
         //send response back to the server
        if(response[0]){ 
          //send response back
          return res.json(response[0])
        }
        else {
          //send 403 back if response is not defiend
          console.log(response[0])
          return res.status(403).json({status:"no resulte"})
        }  
    })
    .catch((err)=>{
      //send err back
      return res.status(403).send(err.message)
    })
}

const getAllProducts = async (req , res)=>
{
  try {
    const queryParam = {}
    const {
           city,
           priceLessThan,
           pricegreaterthan,
           skip,
           limit,
           sort,
           name
          } = req.query;
    
    //category params
    const {category} = req.params
    let filteredResulte = product;
    
    //chech URI parameters 
      
    //check category
    if(category)queryParam.categore = category;
    //check city
    if(city)queryParam.location = city
    //filter the price
    if(priceLessThan)queryParam.price = {$lt:priceLessThan};
    if(pricegreaterthan)queryParam.price = {$gt:pricegreaterthan};
    //filter the name
    if (name) queryParam.title = {$regex :`^${name}`} 
    
    console.log(queryParam)
    
    let resulte =  product.find(queryParam)
    
    //SKIP AND SET LIMIT FOR THE NUMBER OF THE
    if(skip) resulte = resulte.skip(skip)
    //limit the number of returend elements
    if(limit)resulte = resulte.limit(limit)
    //sort resulte if sort not null
    if(sort)  resulte = resulte.sort(sort)
    //check name
    resulte = await resulte
    if(resulte){
     res.status(200).json(resulte)  
    }
    else {
      res.sendStatus(404);
    }
  }catch (err){
    res.sendStatus(400)
  }
}
//add product to the database
const addProduct = async (req , res)=>
{
 
   const userid  = req.userid
   console.log(userid)

   if(userid){
      try{
          //get user information from the DATA_BASE (get product creater Id)
          const productInformations = req.body
          //check for products informations
          if(productInformations.title && productInformations.discrption && productInformations.categore && productInformations.location){
            //assign user id to the product OwnerId prop
            productInformations.OwnerId = userid
            const newProduct = new product(productInformations)
            
            //add the product to the database 
            newProduct.save().then((resulte)=>{
                res.json(resulte)
            }).catch((err)=>{
                //return error 
                res.sendStatus(err)
            })
          }
       }
       catch(err){
           res.status(401).json({err:"user informations"})
       }
   }
   else {
     res.sendStatus(401)
   }
}

const editeProduct = async (req , res)=>{
  
  const newProductData = req.body
  const productId = req.params.productId
  let productData = undefined
    
  productData = await product.find({_id:productId})
  console.log(productData)         
  try{
    if(productData){   
        if(req.userid){
          console.log('user id is  : '  + req.userid)

          if(productData[0]['OwnerId'] === req.userid){
            await product.updateOne({id:productId} , {$set: newProductData})
            console.log('your product is has been edited succssfully!')
            return res.json({status : "sucssess!"})
          }
          else{ 
            //not authorized user
            return res.sendStatus(401)
          }
        }
        else {
          return es.sendStatus(405)
        }
    }
    else{
      return res.sendStatus(401)
    }
  }
  catch(err){
      res.sendStatus(404)
      console.log(err)
  }
}

const deleteProduct = async (req , res)=>{
  try{
    //get product ID
    const productId = req.params.productId
    //retrive product informations
    const productInformations = await product.find({id:productId})
    //check if product id is equales user product id
    if(productInformations[0].OwnerId === req.userid){   
        //save deleted product then send deleted product as json object
        const deletedProduct = await product.deleteOne({_id:productId}).
        //incase the product deleted successfully tell the adminstrator 
        then((reslute)=>console.log('product with ' + productId + ' has been deleted')).
        catch((err)=>{console.log(err); res.sendStatus(404)})
        //send the resulte back
        res.sendStatus(200)
    }
    else{
      //if the Unauthorized to delete the product send back 401 status code
      res.sendStatus(401)
    }   
  }
  catch (err){
      res.sendStatus(404)
  }
}
//exports the functions
module.exports={getProduct , getAllProducts,addProduct, editeProduct,deleteProduct}