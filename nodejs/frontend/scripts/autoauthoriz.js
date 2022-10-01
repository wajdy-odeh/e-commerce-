import {findCookie} from './utils/Cookies.js'
export function autoAuthonticateUserWithJWT(){
    const authKey = findCookie('session_key')
    fetch ('http://127.0.0.1:5000/api/v1/users/profile' , {method:'GET' , headers:{authorization:'Bearer '+authKey}})
    .then(res =>{
          return res.json()
    }).then(res =>{
          console.log(res)
    })
    console.log(findCookie('session_key'))
}
