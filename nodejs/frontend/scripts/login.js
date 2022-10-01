function authonticate(){
    const regularExpresionForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let email =  document.getElementById('log-email-input').value.trim()
    if(!email.match(regularExpresionForEmail) ){
        document.getElementById('log-email-input').style.borderColor ="rgb(255,0,0)" 
        return  
    }
    let password =  document.getElementById('log-pass-input').value.trim()
    fetch('http://127.0.0.1:5000/api/v1/users/login',{headers:{'Content-Type':'application/json'},method:'POST',body:JSON.stringify({email:email,password:password})})
    .then(res=>{
        return  res.json()   
    }).then (res =>{
        const d = new Date()
        d.setDate(`${d.getDate() + 24 * 60 * 60 *1000}`)
        document.cookie = `session_key=${res.session_key},expire=${d.toUTCString()}`
        console.log(document.cookie)
    })
    .catch(err =>{
        console.log(err)
    })
}