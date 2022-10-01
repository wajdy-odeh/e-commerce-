import { addItemToCart,purchaseOrder } from './usercart.js'
import {fetchProductsFormServer} from './fetch/fetchprodutcs.js'

const apiUri = 'http://192.168.1.187:5000/api/v1/products'
//filter products parameters
let statrForm = 0;
let productsLimit = 5;
let category = null 
let pricegreaterthan =null
let priceLessThan =null
let sort =null
let city =null
let productsApiUrI=''
//get page body by ID
const body_rev_page = document.getElementById('body-rev-page')
//INIT query elements
let productSection =       ''
let minPriceField =        ''
let maxPriceFeild =        ''
let cityDropDownList =     '' 
let categoryDropDownList = ''
let sortByDropDownList =   ''
//reset scrolling values
const resetValues = ()=>{
   statrForm = 0;
   productsLimit = 5;
   productSection.innerHTML = ''
}
const onFilterChange = () =>{
  resetValues()
  fetchProducts()  
}

//render html element to screen
export const render = ()=>{
  //set page body to empty
  body_rev_page.innerHTML = ''
  
  const filterHTML = 
      `<section class = "filters-div">
        <div class = "filter-item">
        <label>filter price:</label>  
        <input class="input-price-value" id ="min-price-feild" type="number" placeholder="starts from :"/>
        to
        <input class="input-price-value" id ='max-price-feild' type="number" placeholder="to :"/>  
        </div>        
    
        <div class = "filter-item">
        <label>search in location </label>
          <select class = "select-item" id = 'city-filter-drop-down-list'>
          <option value = '-'>-select-</option>
          <option value = 'amman'>amman</option>
          <option value = 'alzarzah'>alzarzah</option>        
          </select>
          </div>
          
          <div class = "filter-item">
      <label for = 'select-centry'>filter by catigory</label>
      <select class = "select-item" id = 'catefory-filter-drop-down-list'>
      <option value ='-'>-select-</option>           
          <option value ='watchs'>watchs</option>
          <option value ='cars'>cars</option>
          </select>
    </div>
    <div class = "filter-item">
      <label>sort by : </label>
      <select class = "select-item" id ='sortBy-filter-drop-down-list'>
          <option value = '-'>-select-</option> 
          <option value = 'price'>price</option>
          <option value = 'rate'>rate</option>
      </select>
    </div>
    
    </section>

    <section id ="products-section">
   
    <div class = "product-div">
    
    <div class = "product-image-div" style="background-image: url();">
     <img class= 'product-image-div' src = "./static/icons/csm_vegetables.jpg"></img>
    </div>
    
    <div class = "product-inform">
    <a href = "#api/v1/products" class = "product-title-a">
    <p class = "product-title">
        vegatable and cart shet i am just try to make it works                
        </p>
        </a>
        
        <a class = "product-discription-a">

        <p class = "product-discription">
        vegatable and cart shet i am just try to make it works 
          </p>
          </a> 
          </div>
      <div class = "product-price-rate-div">
      <div class = "product-rate-div">
      <span class = "fa fa-star checked" ></span>
          <span class = "fa fa-star"></span>
          <span class = "fa fa-star"></span>
          <span class = "fa fa-star"></span>
          <span class = "fa fa-star"></span>
        </div>
        
        <div class = "product-price-div">
        price:50$
        </div>
        
        </div>

        <div class = "product-buttons-div">
            <button class = "buy-button"></button>
            <button class = "chat-button"></button>
        </div>
    </div>
    </div>
    </section>
`
  body_rev_page.innerHTML = filterHTML;

  productSection =       document.getElementById("products-section");
  minPriceField =        document.getElementById('min-price-feild')
  maxPriceFeild =        document.getElementById('max-price-feild')
  cityDropDownList =     document.getElementById('city-filter-drop-down-list') 
  categoryDropDownList = document.getElementById('catefory-filter-drop-down-list')
  sortByDropDownList =   document.getElementById('sortBy-filter-drop-down-list')
  const select =  document.getElementsByClassName('select-item')

  for(let i = 0; i < select.length;i++){
    select[i].addEventListener('change' , onFilterChange)
  }
  resetValues()
  fetchProducts()
}

function getFilterValues(){
  
  if(minPriceField.value)
  pricegreaterthan = minPriceField.value
  else pricegreaterthan = null

  //check price
  if (maxPriceFeild.value)
  priceLessThan  = maxPriceFeild.value
  else
    priceLessThan = null
  //check city   
  if (cityDropDownList.value != '-' && cityDropDownList.value)
   city = cityDropDownList.value       
  else
   city= null
   //sort check
  if(sortByDropDownList.value != '-'  && sortByDropDownList.value)
    sort = sortByDropDownList.value
  else 
    sort = null
  //check category
  if (categoryDropDownList.value != '-' && categoryDropDownList.value)
    category =  categoryDropDownList.value
  else 
    category = null
}

//g et products section
//function for filter the uri 
const filter= (url)=>{
 //filter category
 url = apiUri
 if (category !== null)url += `/${category}`
 url += '?' 
 //filter start from and limit
url += 'limit='+productsLimit+'&skip='+statrForm
 
 //filter city
 if (city !== null)url += '&city='+city
 //sort by
 if (sort !== null)url += '&sort='+sort
 //filter price   
 if (pricegreaterthan !== null)url += '&pricegreaterthan='+pricegreaterthan 
 if (priceLessThan !== null) url += '&priceLessThan='+priceLessThan
 return url
}
const purchase_product = (event)=>{
  //get product id
  const classNameArra  =  event.srcElement.className.split('-')
  const productId = classNameArra[2].split(' ')[0]
  //check product id
  if(productId){
    const order = [{
      productId : productId,
      qu : 1
    }]
    purchaseOrder(order)
  }
}
export const addtocart = (event) =>{
  //get product id
  const classNameArra  =  event.srcElement.className.split('-')
  const productId = classNameArra[2].split(' ')[0]

  if(productId){
    //create product data
    const data = {
      productId : productId,
      qu : 1,
      title: document.getElementById(`product-title-${productId}`).innerHTML,
      price : document.getElementById(`product-price-div-${productId}`).innerHTML,
      productImg: document.getElementById(`product-image-${productId}`).src.trim()
    }
    //add product data to local storage    
    addItemToCart(data)
  }
}

//render the products
const renderProducts =  (products) =>{
 const  mapedProducts = products.map((product)=>{
   return (`
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
     
     <div class = "product-buttons-div">
        <button class = "buy-button-${product._id} buy-button"></button>
        <button class = "chat-button-${product._id} chat-button"></button> 
     </div>
  </div>
  </div>
 `)
})

console.log(mapedProducts)
productSection.innerHTML += mapedProducts
//get last add buttons
const addtoCart_buttons =  document.getElementsByClassName('chat-button')
const purchase_buttons  =  document.getElementsByClassName('buy-button')


for (let i = 0 ; i < addtoCart_buttons.length ; i++){
  //add event listener to each button   
  if(addtoCart_buttons[i].onclick === null){
     //add listeners ro the buttons
     addtoCart_buttons[i].onclick = addtocart
     purchase_buttons[i].onclick = purchase_product
  }
}
}
//fetch products from server
export function fetchProducts (){
  //fetch product from API
  getFilterValues()
  productsApiUrI = filter(productsApiUrI)
  statrForm += 5;
  productsLimit += 5;
  console.log('this is fetch url : ' + productsApiUrI)
  //featch products
  fetchProductsFormServer(productsApiUrI).then((res) =>{
      //render products
      renderProducts(res)
      console.log(res)

    }).catch((err)=>{ 
      console.log(err)
    })
}

/*const renderProducts = (products)=>
{
  products.forEach((item , index) =>
  {
    let product_div =          document.createElement('div')  
    let product_image =        document.createElement('div') 
    let product_informations = document.createElement('div') 
    let product_title_a =      document.createElement('a')   
    let product_title =        document.createElement('p')   
    let product_dis_a =        document.createElement('a')   
    let product_dis =          document.createElement('p')   
    let rate_price_div =       document.createElement('div') 
    let rate_div =             document.createElement('div') 
    let price_div =            document.createElement('div') 
    let product_buttons =      document.createElement('div')  
    let buy_button =           document.createElement('button')
    let chat_button =          document.createElement('button')
    
    //add attributes to each element
    product_div         .setAttribute('class','product-div');
    product_image       .setAttribute('class','product-image');
    product_informations.setAttribute('class','product-inform')
    product_title_a     .setAttribute('class','product-title-a')
    product_title       .setAttribute('class','product-title')
    product_dis_a       .setAttribute('class','product-discription-a')
    product_dis         .setAttribute('class','product-discription')
    rate_price_div      .setAttribute('class','product-price-rate-div')
    rate_div            .setAttribute('class','product-rate-div')
    price_div           .setAttribute('class','product-price-div')
    product_buttons     .setAttribute('class','product-buttons-div')
    buy_button          .setAttribute('class','buy-button')
    chat_button         .setAttribute('class','chat-button')
    
    
    //add product to products section
    productSection.appendChild(product_div)
    product_div.appendChild(product_image)
    product_div.appendChild(product_informations)
    product_div.appendChild(product_title_a)
    product_div.appendChild(product_dis_a)
    product_div.appendChild(rate_price_div)
    product_div.appendChild(product_buttons)
      
    //add element to title-a and dis-a
    product_title_a.appendChild(product_title)
    product_dis_a.appendChild(product_dis)
    
    //add buy and chat buttons to the div
    product_buttons.appendChild(buy_button)
    product_buttons.appendChild(chat_button)
    
    //add rate and price to the div
    rate_price_div.appendChild(rate_div)
    rate_price_div.appendChild(price_div)

    //set values
    product_title.innerHTML = item.title
    product_dis.innerHTML = item.discrption
    
    if (item.photos[0])
    {
      product_image.style.backgroundImage =  "url("+item.photos[0].replace(/\s/g , "") +")"

    }
    //append element to product information
    product_informations.appendChild(product_title_a)
    product_informations.appendChild(product_dis_a)
    
    for (let i = 0 ; i < 5 ; i++)
    {
      let star = document.createElement('span')
      if(i  < item.rate)
        star.setAttribute('class' , 'fa fa-star checked')
      else 
        star.setAttribute('class' , 'fa fa-star')
      //add to the contener
      rate_div.appendChild(star)
    }
  })
}
*/



