export const  fetchSearchResulte  = async (name)=>{
        //fetch producs dep on name
        const resulte = await fetch(`http://127.0.0.1:5000/api/v1/products?name=${name}`,{method:'GET'})
        //return http header reponse as promise
        .then((res) =>{
              //check resulte status if OK 
            if (res.status === 200){
            // return json promise
            return res.json()
            }
            //throw erorr 
            else throw Error('some thing went wrong')
        }).then((res=>{
            //return the reuslte as promise
            return res
        }))
        .catch((err)=>{
            //return err
            return err
        })
        return resulte
}