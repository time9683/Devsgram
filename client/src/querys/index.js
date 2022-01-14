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
        ref
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




export const  GetComents = gql`
query GetComents($id: String) {
  getOneReal(_id: $id) {
    coments {
      ref
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
    GetHistoryUsers {

        historys {

             _id
            src
            ref
        }
        Users {

           _id
            name
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