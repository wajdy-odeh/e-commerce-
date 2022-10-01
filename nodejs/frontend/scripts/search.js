import {fetchSearchResulte} from './fetch/fetchSearchResultesearch.js'

export const  Search = async (name)=>
{      
        return await fetchSearchResulte(name).then((res)=>{
         
        console.log(res)
        const data = res.map((item) =>{
            //return the resulte back
            return (`
            <div class = "sear-resu-div">
              
              <div class = "sear-res-image-div" style="background-image:url(${item.photos[0]})"></div>
               
              <a href = '#/products/product/${item._id}' class = "sear-name-p">${item.title}</a>
              
              
              <div class = "product-rate-div-search">
                   <span class = "${(item.rate > 0 )? 'fa fa-star checked' : 'fa fa-star' }" ></span>
                   <span class = "${(item.rate > 1 )? 'fa fa-star checked' : 'fa fa-star' }" ></span>
                   <span class = "${(item.rate > 2 )? 'fa fa-star checked' : 'fa fa-star' }" ></span>
                   <span class = "${(item.rate > 3 )? 'fa fa-star checked' : 'fa fa-star' }" ></span>
                   <span class = "${(item.rate > 4 )? 'fa fa-star checked' : 'fa fa-star' }" ></span>
              </div>

              <div class = "price-res-search">
                <p>${item.price}$</p>
              </div>

            </div>
           `)
          })
         return  data
        }).catch(err=> console.log(err)) 
        
}