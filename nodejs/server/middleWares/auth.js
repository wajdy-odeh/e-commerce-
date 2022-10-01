const jwt = require('jsonwebtoken')

//////////////////////////////////////////////////////
const authorization = (req , res , next)=>{
  //get authorization header
  const AuthHeadr = req.headers['authorization']
  
  let token = null
  //check if authorization header is exestest
  if(AuthHeadr){
    //split header key from "bear"
    token = req.headers['authorization'].split(' ')[1]
    console.log(token)
    if(token){
        //verify the token
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,resulte)=>{
        //username authrization 
        req.email = resulte
        next()
        })    
    }
  }else {
    return res.sendStatus(401)
  }
}
module.exports = authorization