export const findCookie = (key)=>{
    let cookies =  document.cookie
    if(cookies){
        cookies =  cookies.split(';')
        for (let i = 0 ; i < cookies.length ; i++){
            console.log(cookies[i])
            if(cookies[i].substring(0,key.length) === key)
            return cookies[i].split("=")[1].split(',')[0]
        }
    }else {
        return null
    }
}