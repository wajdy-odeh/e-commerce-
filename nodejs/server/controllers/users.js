const {user} = require ('../modules/products')

const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client("591903598674-26jd621j2c2joi3m4obtedtnsd3vj2p9.apps.googleusercontent.com");
const public_keys = require('../google-puclic-keys'); 

const getAllUsers = (req , res)=>
{
}
const editUserInformation = async (req , res)=>{
  try{
     //getuser ID
     const userId = req.userid;
     const newUserInfo  =  req.body
     await user.updateOne({_id:userId},{$set:newUserInfo}).then((resulte) =>{
      return res.sendStatus(200)
     })
     .catch((err) =>{
      return res.sendStatus(401)
     })
    }
    catch(err){console.log(err)}
}
const upload_profile_picture = (req , res)=>{
      console.log(req.files)
      if(req.files['profile_pic']){
        let profile_picture = req.files.profile_pic
        profile_picture.mv(`../users/${req.email}/${profile_picture.name}`)
      }
}
const addUser = async (req ,res)=>{
try{ 
  const userInformations = req.body
  //check required fieleds (username and password and email)
  const regularExpresionForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(userInformations.name && userInformations.password && userInformations.email){ 
    const u = await user.find({name:userInformations.name,password:userInformations.password})
    //check user informations
    if(u[0])
      return res.status(400).send({message:"user already exists"})
    //check email format validation
    if(!userInformations.email.match(regularExpresionForEmail))res.status(422).json({err:"invaled email format"})
    //create new user 
    const newUserObject = await new user(userInformations).
    //save user and catch errors
    save().then((resulte)=>{
      console.log('new user has been add!')
      res.json({status:'succsess'})
    })
  }
  else{
    return res.sendStatus(400)
  }
}
catch(err){
  res.json(err)
}
}
const getuserprofile = async (req , res)=>{
      const userEmail = req.email
      if(userEmail){
        const userData = user.find({email : userEmail}).then(ressponse =>{
          return res.json(ressponse[0])
        })
      }else {
          return res.status(401).send({message:"unauthorized user"})
      }
}
//authorization with google
async function g_auth0(req , res){
     const authToken = req.headers['g-auth-token-id']
     const header = jwt.decode(authToken,{complete:true}).header
     
     const cert = public_keys[header.kid]
     console.log(cert)
     
     jwt.verify(authToken, cert ,{algorithms:['RS256']} , (err , payload) =>{
     if (err) {
        console.log(err)
     }else{
        console.log({'payload':payload})
      }
     })

     if(authToken){
        //verify token
        const ticket = await client.verifyIdToken({
        idToken:authToken,
        audience:"591903598674-26jd621j2c2joi3m4obtedtnsd3vj2p9.apps.googleusercontent.com"
       })
       //get paylaod from token
       const payload = ticket.getPayload();
       //get user infromations from database to verify it 
       const userInformations = await user.find({email:payload.email})
       if(userInformations[0]){
           const sign = jwt.sign(payload.email , process.env.ACCESS_TOKEN_SECRET)
           res.json({'session_key':sign})   
       }else{
         const userInformations = {
          username: payload.name,
          profile_pic :payload.picture,
          password: payload.sub,
          email: payload.email,
         }
         user.create(userInformations).then(resonse =>{
          const sign = jwt.sign(payload.email , process.env.ACCESS_TOKEN_SECRET)
          res.json({'session_key':sign})  
         }).then(err =>{
          res.status(401).json({message:'invaled token'})
         })
       }
     }
}
//login with email and passoword
const login = async (req , res)=>{
  try{
   const email = req.body.email || undefined
   const password = req.body.password || undefined
   //check user informations
   if(email && password){
        //verify user account information from database
        const userData = await user.find({name:email,password:password})
        console.log(userData)
        if (userData[0]){
              const sign = jwt.sign(userData[0].email, process.env.ACCESS_TOKEN_SECRET)
              res.json({'session_key':sign})
              console.log('login done!')
        }else{
            return res.status(401).json({'message':'account information is wrong'})
        }
   }else {
    return res.sendStatus(400)
    console.log('no information provided')
   }
}
catch(err){
  return res.sendStatus(401)
}
}
const removeUser = async (req , res) =>{
  try{
    //get user id from verify the token
    const email = req.email
    //check userid is not undefined
    if(email){
      //await for deleting user
      await user.deleteOne({_id:email}).then((res)=>console.log('user has been deleted'))
      return res.sendStatus(200)
    }else {
      return res.sendStatus(401)
    }
  }catch(err){
      return res.sendStatus(400)
  }  
}

module.exports = {addUser 
                  ,login, 
                  removeUser,
                  getAllUsers,
                  editUserInformation,
                  g_auth0,
                  getuserprofile,
                  upload_profile_picture
                }