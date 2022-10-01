const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    title:        {type:String,required:true},
    photos:       {type:Array, required:false},
    specifications:{type :Array , required: false},
    in_stock      :{type : Number , required :true},
    discrption:   {type:String, required:true},
    location:     {type:String, required:true},
    createdAt:    {type:Date,   defulte:Date.now()},
    categore:     {type :String , required:true},
    price :       {type:Number, required:false,delfulte : 1},
    rate :        {type:Number, required:false},
    OwnerId:      {type:String, required:true},
})
const usersSchema = new Schema({
    username: {type :String , required:true},
    profile_pic : {type:String , required:false},
    password: {type:String,required:false},
    phone_number:{type:String,required:false},
    email: {type:String,required:true},
})
const commentSchema = new Schema({
    productId :{type : String , required:true},
    commentText:{type:String ,  required:true},
    createdby:{type: String , required:true}
    
});
const orderSchema = new Schema({
    order_data               : {type : Array , required:true},
    stipe_checkout_session_id: {type: String , required:true},
    userId:                    {type: String , required:false}
});
//products model
const product = mongoose.model('product' ,ProductsSchema);
//user model
const user = mongoose.model('user' ,usersSchema);
//category model
const comment = mongoose.model('comment' ,commentSchema);
//create order in wait
const order = mongoose.model('order' ,orderSchema);
//exports the models
module.exports = {product,user,comment,order}
