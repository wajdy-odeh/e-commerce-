require('dotenv').config()
const mongoose =  require('mongoose')

const  conntect = async () =>  {
 await mongoose.connect(process.env.MANGO_URI)
 console.log('connected sucssesflly to the database')
}

module.exports = {conntect}