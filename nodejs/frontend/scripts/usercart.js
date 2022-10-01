import {getCartItems,removeItem,addToTheCart,editItem,purchasRequist} from './cart.js';

export const addItemToCart = (data)=>{
    addToTheCart(data)
    renderCartData()
}
export const purchaseOrder = (data)=>{
    purchasRequist(data)
}
const purchaseOrders = (event)=>{
    //get products from local storage
    const srtipe_orders = getCartItems().map((item)=>{ return {productId : item.productId , qu: item.qu}})
    //check id exsistence
    if(srtipe_orders){
        purchasRequist(srtipe_orders)
    }
}
const removeItemFromCart = (event)=>{
    //get cart item id
    const id =  event.srcElement.children[0].innerHTML
    console.log('cart item id : ' +  id)
    if(removeItem(id)){
     alert('product succsesfuly removed')
     renderCartData()
    } 
}
const editCartItem = (event)=>{
      //get product id from html DOM
      const id = event.srcElement.children[0].innerHTML
      //get new data
      const quantity = Number (document.getElementById(`quntity-input-field-${id}`).value)
      //print out the changes
      console.log('product with id has been edited ' + id)
      //check id exsistence
      if(id){
        if(editItem(id , quantity)){
            console.log('has been edited')
        }
      }
}
const increaseQunty = (event)=>{
  
  //get cart item id 
  const classname  = event.srcElement.className.split('-')
  const id = classname[classname.length - 1].split(' ')[0]
  //get quntity field by id
  const quty = document.getElementById(`quntity-input-field-${id}`)
  //check quntity input feild
  if(quty){
     //get and increase quntity value
     let value = Number(quty.value);
     value += 1
     quty.value = value  
   }  
}
const decreaseQunty = (event)=>{
    //get cart item id 
    const classname  = event.srcElement.className.split('-')
    const id = classname[classname.length - 1].split(' ')[0]
    //get quntity field by id
    const quty = document.getElementById(`quntity-input-field-${id}`)
    //check quntity input feild
    if(quty){
       //get and increase quntity value
       let value = Number(quty.value);
       value -= 1
       quty.value = value  
    }
}

//render elements to screen
export const renderCartData = ()=>{
    
    //retrive products in cart
    const products_in_cart =  getCartItems()
    const contener = document.getElementById('in-cart-items-section')
    let htmlItems = ''
    console.log(products_in_cart)
    
    if(products_in_cart && products_in_cart.length > 0){
        //map proudcts to html elment
        htmlItems =  products_in_cart.map((item)=>{
            //return each html element
            return (`
                <div class = "cart-itme-elment-div"> 
                
                <div class = 'cart-item-image-div'><img class = 'cart-item-image' src = "${item.productImg}"></img></div>
                
                <div class  = "contener-qunt-edite-title-div">
                <p   class = "cart-item-title" id = "cart-item-title-${item.productId}">${item.title}</p>
                <div class = "cont-qunt-edit-div">
                    <button class = "inc-cart-qunt-but inc-cart-qunt-but-${item.productId}">+</button>
                    <input type="number" class = "quntity-input-field" id = "quntity-input-field-${item.productId}" value = ${item.qu} />
                    <button class = "dec-cart-qunt-but dec-cart-qunt-but-${item.productId}">-</button>
                    <label class = "price-item-cart">${item.price}$</label>
                </div>
                </div>
                
                <div class="price-remove-button">
                 <button class = "remo-item-button"><p hidden id = "product-id">${item.productId}</p>remove</button>
                 <button class = "save-item-button"><p hidden id = "product-id">${item.productId}</p>save</button>
                </div>
             
            </div>
            `)
        })
    
    }else {
        htmlItems = '<h1 id = "no-res-mess-cart">no itmes in your cart</h1>';         
    }      
    //render maped data to screen
    contener.innerHTML = htmlItems
    document.getElementsByClassName('purchase-class-name')[0].addEventListener('click' , purchaseOrders)
    //get all 'remove' buttons
    const buttons = document.getElementsByClassName('remo-item-button')
    //save buttons
    const Savebuttons = document.getElementsByClassName('save-item-button')
    //increas buttons
    const increaBut = document.getElementsByClassName('inc-cart-qunt-but')
    //decreas buttons
    const decreaBut = document.getElementsByClassName('dec-cart-qunt-but')
    //loop all over the elments
    for(let i = 0 ; i < buttons.length ; i++){
        buttons[i].addEventListener('click' , removeItemFromCart)
        increaBut[i].addEventListener('click' , increaseQunty)
        decreaBut[i].addEventListener('click' , decreaseQunty)
        Savebuttons[i].addEventListener('click' ,editCartItem)
    }
}
renderCartData()