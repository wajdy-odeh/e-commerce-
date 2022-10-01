
export const fetchProductsFormServer = (productsApiUrI)=>{
    
    return (fetch(productsApiUrI).then((resulte)=>{
        if(resulte.status === 200){
          //increase the counters 5 value
          //filter the resulte
          return resulte.json()
          //throw error 
        }throw Error('some thinge went wrong')
    
        }).then((res) =>{
             return res    
        }).catch((err)=>{ 
          console.log(err)
        }))
        
}
