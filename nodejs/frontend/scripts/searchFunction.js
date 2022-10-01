import {Search} from './search.js'

const search_bar = document.getElementById('Search-bar')
const resulte_div = document.getElementById('search-resu-div-nav')


export const eventHandler  = (event)=>{
    if(search_bar.value){
      Search(search_bar.value).then((res) =>{
        if(res){
          //show the resulte to the user
          resulte_div.innerHTML = res
        }else{resulte_div.innerHTML = 'no resulte'}
        //show the resulte div
        resulte_div.style.visibility = 'hidden'
      }).catch ((err) =>{
        //hidde the resulte div
        resulte_div.style.visibility = 'hidden'
      })
    }else{
      resulte_div.style.visibility = 'hidden'
    }
  }
  //add event listener key
  search_bar.addEventListener('keyup' ,eventHandler)
  