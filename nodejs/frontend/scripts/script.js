
const apiUri = 'http://127.0.0.1:5000/api/v1/products'
//filter products parameters
let statrForm = 0;
let productsLimit = 5;
let category = null 
let pricegreaterthan =null
let priceLessThan =null
let sort =null
let city =null
let productsApiUrI=''
//
const minPriceField = document.getElementById('min-price-feild')
const maxPriceFeild = document.getElementById('max-price-feild')
const cityDropDownList = document.getElementById('city-filter-drop-down-list') 
const categoryDropDownList = document.getElementById('catefory-filter-drop-down-list')
const sortByDropDownList = document.getElementById('sortBy-filter-drop-down-list')

function getFilterValues()
{
  
  if(minPriceField.value)
    pricegreaterthan = minPriceField.value
  else 
    pricegreaterthan = null

  //check price
  if (maxPriceFeild.value)
    priceLessThan  = maxPriceFeild.value
  else 
    priceLessThan = null

  //check city   
  if (cityDropDownList.value != '-')
   city = cityDropDownList.value       
  else
   city= null
  
   //sort check
  if(sortByDropDownList.value != '-')
    sort = sortByDropDownList.value
  else 
    sort = null

  //check category
  if (categoryDropDownList.value != '-')
    category =  categoryDropDownList.value
  else 
    category = null
}

//g et products section
const productSection =  document.getElementById("products-section"); 
//function for filter the uri 
const filter= (url)=>
{
 if(statrForm && productsLimit) 
   url = apiUri + '?limit='+productsLimit+'&skip='+statrForm
 else
   url = apiUri

 if (category !== null)
 {
     url += '&category='+category
 }
 if (city !== null)
 {
     url += '&city='+city
 }
 if (sort !== null)
 {
     url += '&sort='+sort
 }
 if (pricegreaterthan !== null)
 {
   url += '&pricegreaterthan='+pricegreaterthan
  }
  if (priceLessThan !== null)
  {
    url += '&priceLessThan='+priceLessThan
  }
  return url
}
//filter url and fetch inforamtions
productsApiUrI = filter(productsApiUrI)
fetchProducts()
//render the products
const renderProducts = (products)=>
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

function fetchProducts ()
{
  //fetch product from API
  getFilterValues()
  productsApiUrI = filter(productsApiUrI)
  fetch(productsApiUrI).then((resulte)=>
  {
    if(resulte.status === 200)
    {
      //increase the counters 5 value
      //filter the resulte
      statrForm += 5;
      productsLimit += 5;
      return resulte.json()
      //throw error 
    }throw Error('some thinge went wrong')

    }).then((res) =>
    {
      //render products
      renderProducts(res)
      console.log(res)

    }).catch((err)=>
    { 
      console.log(err)
    })
}

document.addEventListener('scroll',function(e)
{
    console.log(document.body.offsetHeight)
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
    { 
      fetchProducts()
    }
})

