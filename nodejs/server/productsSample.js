const products =[

    {
    title:      'watch',
    discrption: 'watch for selle',
    photos:      ['photo1' , 'photo2'],
    location:   'amman',
    categore:   'watchs',
    price :     1500,
    rate :      4.5,
    OwnerId:    '1',
  }

  ,{
    title:      'watch2',
    discrption: 'watch2 for selle',
    location:   'alzeqah',
    categore:   'watchs',
    price :     2000,
    rate :      2.25,
    OwnerId:    '2',
   }
   ,{
    title:      'watch3',
    discrption: 'watch3 for selle',
    location:   'amman',
    categore:   'watchs',
    price :     2500,
    rate :      4,
    OwnerId:    '3',
   }
]

const users = [
    {
        name: 'wajdi',
        id:'1',
        photoUrl : 'url',
        password: '1234567890',
        email: 'gmbrmg@gmail.com'
    },
    {
        name: 'jone',
        id:2,
        photoUrl : 'url',
        password: '1234567890',
        email: 'jone@gmail.com'
    },
    {
        name: 'ahmad',
        id:'3',
        photoUrl : 'url',
        password: '1234567890',
        email: 'ahmad@gmail.com'
    }
    ,
    {
        name: 'smair',
        id:'4',
        photoUrl : 'url',
        password: '1234567890',
        email: 'samir@gmail.com'
    }

]
const categorys =[
    
]

module.exports = {products,users}