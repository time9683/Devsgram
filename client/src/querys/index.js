import { gql } from "@apollo/client"


export const GetReals = gql`
  query  GetReals($page:Int,$limit:Int) {
    GetReals(page:$page,limit:$limit) {
      src
      _id
      likes {
        idU
      }
      coments {
        UserInfo{
        name}
      }
    }
  }
`


export const Tolike = gql`
  mutation Like($id: String, $person: String) {
    likes(_id: $id, person: $person) {
      status
    }
  }
`

export const dislike = gql`
  mutation Dislike($id: String, $person: String) {
    removeLike(id: $id, person: $person) {
      status
    }
  }
`



export const sendComent = gql`
mutation Comentar($id: String, $person: String, $text: String) {
  addComent(_id: $id, person: $person, text: $text) {
    status
  }
}
`




export const GetComents = gql`
query GetComents($id: String) {
  getOneReal(_id: $id) {
    coments {
      UserInfo{
       name
      }
      text
      time
    }
  }
}
`


export const getUsername = gql`
query getName($id: String){
  GetUser(id:$id){
   name
  }
}
`


export const QueryForHistory = gql`
query GetHistoryUsers {
  GetUsersWithHistory {

       _id
       name
       posts {
         _id
         src
         date
         }
      
    }
}
`


export const submitFile = gql`
mutation fileSubmit($file:Upload,$text:String,$tipe:String) {


  sendFile(file:$file,text:$text,tipe:$tipe) {

  status


  }

}`


export const GetUsers = gql`

 query GetUsers($name:String) {
  GetUsers(name:$name) {
    _id
    name
  }
 }
`



export const GetUser = gql`
query GetUser($name:String){
  GetUser(name:$name){
    name
    _id
    posts{
      src
      type
      _id
    }
    followed{
    
    _id

    }
    followers{
    _id
    }
  }
}
`


export const getOneReal = gql`
query getOneReal($id:String){
  getOneReal(_id:$id){
    src
    _id
    likes {
      idU
    }
    coments {
      UserInfo{
         name
        }
      text
    }
  }
}
`



export const GetOneAndmore = gql`

query GetOneAndmore($id:String,$page:Int,$limit:Int){

  GetReals(page:$page,limit:$limit) {
      src
      _id
      likes {
        idU
      }
      coments {
        UserInfo{
        name}
        text
      }
    }


    getOneReal(_id:$id){
    src
    _id
    likes {
      idU
    }
    coments {
      UserInfo{
      name}
      text
    }
  }



}


`

// schema for getcontent;  GetAll(page:Int,limit:Int) : [Post]

export const getConten = gql`
query getConten($page:Int,$limit:Int){
      
  GetAll(page:$page,limit:$limit) {
      src
      _id
      likes {
        
        idU 
      }
      coments {
        UserInfo{
        name}
        text
      }
    }
}
`


export const getOneAndContent = gql`
query getOneAndContent($id:String,$page:Int,$limit:Int){
  getOneContent (_id:$id){
    src
    _id
    likes {
      idU
    }
    coments {
      UserInfo{
      name}
      text
    }
  }

  GetAll(page:$page,limit:$limit) {
      src
      _id
      likes {
        
        idU 
      }
      coments {
        UserInfo{
        name}
        text
      }
    }
     


}
`

export const setFollow = gql`
mutation setFollow($id:String){
  follow(id:$id){
    status
    
    }
}
`