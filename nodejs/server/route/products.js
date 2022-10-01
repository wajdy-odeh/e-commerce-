const exp  = require('express')
const {
      getAllProducts 
     ,getProduct,
      addProduct,
      editeProduct,
      deleteProduct
    } = require('../controllers/products')

const router = exp.Router()

const authorization= require('../middleWares/auth')
//get products by category
router.get('/:category', getAllProducts)
//get all products
router.get('/', getAllProducts)
//get product by ID
router.get('/product/:productId', getProduct)
//add product
router.post('/addProduct', authorization, addProduct)
//edit product
router.put('/editproduct/:productId',authorization,editeProduct)
//delete product
router.delete('/deleteproduct/:productId',authorization, deleteProduct)

module.exports  = router