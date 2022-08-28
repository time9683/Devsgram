import { gql } from 'apollo-server'

const typeDefs = gql`

scalar Upload
scalar Date

type  AuthResponse {
status: String
info : User



}

type History {  
    historys: [post]
Users: [User]
code : Int


}










type Query  {



GetUsers(name:String) : [User]

GetReelsOfUser(id:String) : [post]

"verifica si el token es valido y retorna cualquier informacion del usuario"
Vauth(Token : String) :AuthResponse
GetUsersWithHistory : [User]
GetHistoryUsers : History


"retorna todos los usuarios resgistrados"
Users : [User]

GetUser(id: String,name: String) : User



GetReals(page:Int,limit:Int) : [post]
GetAll(page:Int,limit:Int) : [post]
getOneReal(_id: String) : post
getOneContent(_id: String) : post

}

type auth {

status : String
Token : String
email : String
_id : String,
}





type Mutation {


addComent(_id:String,person: String,text: String) : status
removeLike(id: String,person: String) : status


likes(_id:String,person:String) :  status

sendFile(file: Upload,text: String,tipe : String) : status

Auth(email: String, password: String) :  auth

modifiEmail(token: String,email:String) : User

CreateAccount(email:String,name: String, password: String) : status

follow(id: String) : status


}






type status {

status: String!
mensaje:String



}




"tipo User"
type User{

"identificador unico"
_id: ID
"nombre del suario"
name : String
email : String
age : Int
posts: [post]
followed: [User]
followers: [User]

}

type post {
_id : String
UserInfo : User
src : String
# tipo : String
type: String
description : String
likes : [like]
coments : [coment]
ref: String
date: Date
}


type like{

idU: String


}



type coment {

    UserInfo: User
text : String
time : String



}






`
// export in format module ES6
export default typeDefs
