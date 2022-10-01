export const addToTheCart = (data) =>{  
    //get previos cart data
    let pre_cart_data = localStorage.getItem('cart') 
    let pre_cart_json = []
    
    //check if local storage is not empty
    if(pre_cart_data && pre_cart_data != null){
        //parse previous string cart data to json 
        pre_cart_json = JSON.parse(pre_cart_data) || []
    }
    //check new items data
    if (data.productId && data.qu){
        //ckeck if product exsists in local storage
        if(pre_cart_json.filter(element => 
            element.productId === data.productId 
        ).length > 0){console.log('product already exsists'); return;} 
        //push new item to local storage
        pre_cart_json.push(data)
    }
    else {
        //throw error if cart data is not correct
        throw new Error('cart informathin is not correct')
    }
    //save data to local storage
    localStorage.setItem('cart' , JSON.stringify(pre_cart_json))
}
export const getCartItems = ()=>{
       //retreve data from localstorage
       let cart_data = localStorage.getItem('cart') 
       if(cart_data && cart_data !== null){
           //cast cart data to json
           return JSON.parse(cart_data);   
       }
}
export const getCartItem = (id)=>{
    //retreve data from localstorage
    let cart_data = localStorage.getItem('cart') 
    //check if cart is not empty
    if(cart_data && cart_data !== null){
        //cast cart data to json
        const items = JSON.parse(cart_data);
        //item index
        let index = 0  
        //filter array of data
         items.forEach((element , i) => {
             if (element.productId === id){
                return index = i
             }
        });
        return  items[index]  
    }
}
export const getCartItemElemntIndex = (id)=>{
    //retreve data from localstorage
    let cart_data = getCartItems() 
    //check if cart is not empty
    if(cart_data){
        let index = 0  
        //filter array of data
        cart_data.forEach((element , i) => {
             if (element.productId === id){
                index = i
             }
        });
        return  index  
    }
}//remove element from local storage
export const removeItem =  (id) =>{
      //remove item from localstorage
      const cartItems =  getCartItems()
      console.log(cartItems)
      if(cartItems){
        //remove element from local storage
        cartItems.splice(getCartItemElemntIndex(id) ,1)
        //save data back to local storage
        localStorage.setItem('cart' , JSON.stringify(cartItems))
        return true
      }
}
export const removeAllItems = ()=>{
    localStorage.setItem('cart' , JSON.stringify([]))
}
export const editItem  = (id, qut)=>{
    //get product
    const item =  getCartItem()
    console.log(item)
    //remove product
    if(removeItem(id)){
        item.qu = qut
        addToTheCart(item)
        return true
    }
}
export const purchasRequist = (data)=>{
      fetch('http://127.0.0.1:5000/api/v1/order/purhes',{
        method:'POST',
        headers:{'Accept' : 'application/json' , 'Content-Type':'application/json'}, 
        body:JSON.stringify(data)
        })
        .then((response)=>{
         if(response.status == 200){
             //return data in from json
             console.log(response)
             return response.json()
         }else {
            throw Error(response.message)
         }
      //return the resulte back  
      }).then((json_data) =>{
        if(json_data.url){
            window.location = json_data.url
            //removeAllItems()
            console.log(json_data.url)
        }else {
            console.log(json_data)
        }
        
      }).catch (err=>console.log(err))
}

