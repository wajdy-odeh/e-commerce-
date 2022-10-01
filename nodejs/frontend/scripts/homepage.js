export const homepage = ()=>
{
    const pagebody = document.getElementById('body-rev-page')
    
    const homepage = `
    <div id = "f-sec-hom-page">
    <div id = "f-sec-hom-page-elemt-cont" >
      <h1 class = "f-sec-hom-page-pargra">looking for pc ? buy and more with this stuped web site</h1>  
      <button class = "exp-butt-cent">explore now</button>    
    </div>
    </div> 

  <div id = "page-body">
    <section class="title-section">

    <div class="page-title-div">
         <h1 class = "headr-text">
           categores
          </h1>
        </div>
        

        <div class="categors-section">
          
          <div class = "category-div">
            
            <a href="#/products/" class = "a-image">
              <div class = "category-image" style = "background-image:url(./static/icons/h.webp)">
                <h1 class = "category-title">cars</h1>
               </div> 
              </a>
              
              <a href="#/products/product/62cf3585f4aede50b90fb687/" class = "a-image">
                <div class = "category-image" style = "background-image:url(./static/icons/csm_vegetables.jpg)">
                  <h1 class = "category-title"> vegetables</h1>
                </div> 
              </a>
              
              <a href="#" class = "a-image" ">
              <div class = "category-image" style = "background-image:url(./static/icons/watch.jpeg);">
                <h1 class = "category-title">watchs</h1>
              </div> 
            </a>
            
            <a href="#" class = "a-image">
              <div class = "category-image" style = "background-image: url(./static/icons/watch.jpeg);">
               <h1 class = "category-title">image</h1>
              </div> 
            </a>

            <a href="#" class = "a-image">
              <div class = "category-image" style = "background-image: url(./static/icons/watch.jpeg);">
                <h1 class = "category-title">image</h1>
              </div> 
            </a>

            <a href="#" class = "a-image">
              <div class = "category-image" style = "background-image: url(./static/icons/watch.jpeg);">
                <h1 class = "category-title">image</h1>
              </div> 
            </a>
          </div>
        </div>
        
      </section>
    </div>`
    pagebody.innerHTML = homepage
}