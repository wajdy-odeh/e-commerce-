const express = require('express')
const router =  express.Router()
const authorization  = require('../middleWares/auth')

const {login 
      ,getAllUsers
      ,addUser,
      removeUser,
      editUserInformation,
      g_auth0,
      getuserprofile,
      upload_profile_picture
      }
      = require('../controllers/users')
router.post('/login',login)
router.post('/register',addUser)
router.put('/editeuserinformation',authorization,editUserInformation)
router.delete('/deleteaccount',authorization,removeUser)
router.post('/g_auth0' , g_auth0)
router.get('/profile' ,authorization, getuserprofile)
router.post('/upload-profile-picture' ,authorization, upload_profile_picture)

module.exports = router