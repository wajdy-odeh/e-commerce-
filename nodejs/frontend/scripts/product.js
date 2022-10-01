import {getProductById} from './fetchproduct.js';
import { addItemToCart , purchaseOrder} from './usercart.js';
import {fetchProductsFormServer} from './fetch/fetchprodutcs.js'

const product_section = document.getElementById('body-rev-page');

function addtocart(event){
  //GET PRODUCT QUNTITY 
  const quty = Number(document.getElementById('qu-in-data-proud').value.trim())
  //get product id
  let product_id = event.srcElement.id.split('-')
  product_id = product_id[product_id.length - 1]
  //get title
  const productTitle = document.getElementsByClassName('det-product-title')[0].innerHTML.trim()
  //get product price
  const productPrice = document.getElementsByClassName('product-price-div')[0].children[0].innerHTML.trim()
  //get product photo
  const produc_image = document.getElementById(`prod-curr-image-${product_id}`).src  
  //check product id and quntity
  if(quty >= 1 && product_id !== ''){
    //Order data
    const Order = {
      productId : product_id, 
      qu        : quty,
      title     : productTitle,
      price     : productPrice,
      productImg: produc_image 
    }
    //add product to the cart
    addItemToCart(Order)
  }
}
let productIDID = '' 
let productPhotos = [];
let photoIndex = 0

const purchase = (event)=>{
     //get quanitiy value     
     const quty = Number(document.getElementById('qu-in-data-proud').value.trim()) || 1
     //create order
     const order=[{
      //set product id
      productId:productIDID,
      //set quanitiy
      qu:quty
     }]
     //call purchase function
     purchaseOrder(order)
}

const imageNav = (event) =>{
    console.log('clicked')
    if(event.srcElement.className === "next-prive-photo-butt"){
      photoIndex += 1
      document.getElementsByClassName('prod-curr-image')[0].src = productPhotos[photoIndex]
      console.log(productPhotos[photoIndex])
    }
}



const fetchPromotedProducts = (category)=>{
      fetchProductsFormServer(`http://192.168.1.187:5000/api/v1/products?limit=5&category=${category}`).then((products) =>{
       
       const promotedSection =  document.getElementById('prod-promeoted-section')
       promotedSection.innerHTML += products.map((product)=> `
       <div class = "product-div">
       <div class = "product-image-div"  id ="product-image-div-${product._id}">
            <img class = "product-image" id ="product-image-${product._id}"  src = "${product.photos[0]}"></img>
       </div>
   
       <div class = "product-inform">
       <a href = "#/products/product/${product._id}" class = "product-title-a">
          <p class = "product-title" id = "product-title-${product._id}">
             ${product.title}                
          </p>
         </a>
         
         <a class = "product-discription-a">
         
          <p class = "product-discription" id = "product-discription-${product._id}">
             ${product.discrption} 
          </p>
         </a> 
       </div>
      <div class = "product-price-rate-div">
        <div class = "product-rate-div">
          <span class = "${ product.rate > 0 ?  'fa fa-star checked' :'fa fa-star'}"></span>
          <span class = "${ product.rate > 1 ?  'fa fa-star checked' :'fa fa-star'}"></span>
          <span class = "${ product.rate > 2 ?  'fa fa-star checked' :'fa fa-star'}"></span>
          <span class = "${ product.rate > 3 ?  'fa fa-star checked' :'fa fa-star'}"></span>
          <span class = "${ product.rate > 4 ?  'fa fa-star checked' :'fa fa-star'}"></span>
        </div>
       
        <div class = "product-price-div" id = "product-price-div-${product._id}" style="color:rgb(25 , 150 ,2);">
         ${product.price}$
        </div>
        
        </div>
        
     </div>
     </div>
    `)       
      })
}
// aget product detiles
export const productDetilse =  () =>{
    
    //split url by '/' and then get product id
    const url = document.location.hash.split('/')
    const id = url[3]
    let in_stock = 0;
    let rate_stars = '';
    let prod_spac_items = '';
    
   //fetch products by id
   getProductById(id).then((resulte)=>{
      productPhotos = resulte.photos
      productIDID = resulte._id
      fetchPromotedProducts(resulte.categore)
      
      //loop all over specifications elements        
      for (let l = 0 ; l < resulte.specifications.length ; l++){
         //get the key values for all elements
         let key = Object.keys(resulte.specifications[l]);
         prod_spac_items  += `<div class = "prod-spec-item">
                                <div class = "proud-space-title-div">${key} :</div>  
                                <div class = "proud-space-det-div">${resulte.specifications[l][key]}</div>
                              </div>`
      }
      //loop all over the rating starts and add them to rate_starts var as <span> html elements 
      for (let  i = 0 ; i <5 ;i++){
          rate_stars += `<span class = "${(resulte.rate > i )? 'fa fa-star checked' : 'fa fa-star' }" ></span>\n`
      }
      //check if number of items in stock equales to 0
      //then if items == 0 set number of items to "out of stock"
      in_stock = resulte.in_stock
      if(in_stock === 0){ 
          in_stock = 'out of stock';
      }
     //return web page html elements
      return `
      <section id = "product-section">
      <div id ="product-main-image" class = "det-product-image-${resulte.photos[0]}" >
      <img class = "prod-curr-image" id = "prod-curr-image-${resulte._id}" src = "${resulte.photos[0]}">
        <div id = "cont-next-prive-photo-butts-div">
             <div id = "priv-photo-button" class = "next-prive-photo-butt"></div>
             <div id = "next-photo-button" class = "next-prive-photo-butt"></div>
        </div>      
      </img>
      </div>
          <div class = "det-div-product-informations">

            <div class = "det-product-titile-div">
              <label class = 'ti-lab-p-lib'>title</label>
              <p class = "det-product-title">
                   ${resulte.title}
              </p>
            </div>
            
            <div class = "det-product-desc-div">
            <label class = 'ti-lab-p-lib'>Details</label>
                  <p class = "det-product-desc">
                   ${resulte.discrption}
                  </p>
           </div>
           
           <div class = "det-product-desc-div">
           <label class = 'ti-lab-p-lib'>location</label>
              <p class = "det-product-desc">
                 ${resulte.location}
              </p>
          </div>

          <div class = "det-product-desc-div">
          <label class = 'ti-lab-p-lib'>in_stock</label>
              <p class = "det-product-desc" style = "color :${resulte.in_stock == 0?"rgb(255, 100, 100)" :"rgb(25, 100, 0)"}">
                ${in_stock === "out of stock" ? in_stock  : in_stock + ' items remain'}  
             </p>
         </div>
         
         <div class = "det-product-desc-div">
              <label class = 'ti-lab-p-lib'>quantity</label>
              <p class = "det-product-desc">
               qty : <input id = "qu-in-data-proud" class = "pr-qu-y-wa-buy" type = "number" value = 1 ${in_stock === 'out of stock'? 'readonly' : ''}/>
              </p>
            </div>

            <label class = 'ti-lab-p-lib'>rating</label>
           <div class = "product-price-rate-div">
           
            <div class = "product-rate-div">
               ${rate_stars}
            </div>
            
            <div class = "product-price-div">
               <b style = "color: rgb(27, 157, 16); font-size: large;">${resulte.price}$</b>
              </div>
          
          </div>
          
            <div class = "product-buttons-div-det">
                 <button ${in_stock === 'out of stock'? 'hidden' : ''} id= "buy-button-prod-det-${resulte._id}" class = "buy-button-prod-det">Buy now</button>
                 <button id= "add-cart-button-${resulte._id}" class = "chat-button-prod-det">add to cart</button>
            </div>
          </div>
        
        <h1 id = "spac-proud-titi-labl">specifications</h1>
        <div class = "ma-prod-spec-ta-div">
               ${prod_spac_items}
        </div>
        
        <div id = "prod-promeoted-section">
        </div>
        
        <div class = "comments-section-div">
        <div class = "comment-div">
                <div class = "comment-image" style="background-image: url(./static/icons/csm_HEADER_22de7ed3a8.jpg);"></div>
                <div class = "na-cont-comme-div">
                  <div class = "commenter-name">this is comment</div>
                  <div class = "comment-content">this is comment</div>
                </div>
               </div>
               <div class = "comment-div">
                <div class = "comment-image" style="background-image: url(./static/icons/csm_HEADER_22de7ed3a8.jpg);"></div>
                <div class = "na-cont-comme-div">
                  <div class = "commenter-name">this is comment</div>
                  <div class = "comment-content">this is comment</div>
                </div>
               </div>
               <div class = "comment-div">
                <div class = "comment-image" style="background-image: url(./static/icons/csm_HEADER_22de7ed3a8.jpg);"></div>
                <div class = "na-cont-comme-div">
                  <div class = "commenter-name">this is comment</div>
                  <div class = "comment-content">this is comment</div>
                </div>
               </div>
               <div class = "comment-div">
                <div class = "comment-image" style="background-image: url(./static/icons/csm_HEADER_22de7ed3a8.jpg);"></div>
                <div class = "na-cont-comme-div">
                <div class = "commenter-name">this is comment</div>
                  <div class = "comment-content">this is comment this is comment this is comment this is comment this is comment</div>
                </div>
               </div>
          </div>
          </section> 
          `
   }).then((res) =>
   { 
    /*product_section.style = `
      padding: 1px;
      width: 80%;
      height: fit-content;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20px;`*/
     product_section.innerHTML = res
     console.log('html here')      
     //ADD EVENTS LISRENERS TO HTML components
     document.getElementsByClassName('chat-button-prod-det')[0].onclick = addtocart 
     document.getElementsByClassName('buy-button-prod-det')[0].onclick = purchase
     
     document.getElementById('priv-photo-button').addEventListener('click' , imageNav)
     document.getElementById('next-photo-button').addEventListener('click' , imageNav)
     
     return res 
    }).catch((err) =>
    {
      console.log(err)
      product_section.innerHTML = `<h1>no product with this  id</h1>`
   })          
}
