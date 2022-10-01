import parseRequistUrl from './utils/parsUrl.js';
import {productDetilse} from './product.js'
import {addtocart,render,fetchProducts} from './products.js'
import {homepage} from './homepage.js'
import {eventHandler} from './searchFunction.js'
import {renderCartData} from './usercart.js'
import {autoAuthonticateUserWithJWT} from './autoauthoriz.js'

let userInformations=autoAuthonticateUserWithJWT()
let isCartOpen = false
const items_contener = document.getElementById('cont-cart-elemnts-div')

const status = {
   true :'visible',
   false:'hidden'
}

const show_hidde_items = ()=>{
  isCartOpen  = !isCartOpen
  items_contener.style.visibility = status[isCartOpen]
  console.log(status[isCartOpen])
}
const cartIconeButton = document.getElementById('add-to-the-cart-icon-butto')
cartIconeButton.onclick = show_hidde_items


//init routers
const routers = {
  '/':homepage,
  '/products/product/':productDetilse,
  '/products/': render 
}
//routing method
const router = () =>{
  //parse url and call the router
  const request = parseRequistUrl()
  const url ='/' + (request.source ? `${request.source}/` : '') + (request.action ? `${request.action}/` : '' );
  const main = document.getElementsByTagName('body')

  if (url === '/products/'){
      document.addEventListener('scroll',scrollListener)
  }else{
      document.removeEventListener('scroll',scrollListener)
  }
  if (url in routers)
     routers[url]()
}
//schrill listener if the url is equales to #/products/.
const scrollListener = ()=>{
  console.log(document.body.offsetHeight)
  if((window.innerHeight + window.scrollY) >= document.body.offsetHeight || (window.innerHeight + window.scrollY) === document.body.offsetHeight ){ 
    //fetch producs data from the server when the user reach the bottom of the page
    fetchProducts()
  } 

}
//add events listeners
window.addEventListener('load' ,router)
window.addEventListener('hashchange' ,router)
