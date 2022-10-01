export const getProductById = (id)=>
{
    return (
    fetch (`http://192.168.1.187:5000/api/v1/products/product/${id}`,{method:'GET'})
    .then((resulte) =>
    {
        if(resulte.status == 200)
        {           
            return(resulte.json())
        }
        throw Error('some thing went wrong!')
    })
    //retrn the resulte
    .then((resulte)=> resulte)
    .catch((err)=>new Promise ().reject(err))
    )
}