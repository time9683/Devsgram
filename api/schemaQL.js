// const {buildSchema} = require("graphql")
const {gql } = require('apollo-server');
// const {GraphQLUpload} = require("graphql-upload");

// const jwt = require("jsonwebtoken");
// const clave = 'pwdISCOOL';

 const  typeDefs = gql`

scalar Upload

type  AuthResponse {
status: String
info : User



}









type Query  {
"verifica si el token es valido y retorna cualquier informacion del usuario"
Vauth(Token : String) :AuthResponse




"retorna todos los usuarios resgistrados"
Users : [User]

GetUser(id: String) : User



GetReals(page:Int,limit:Int) : [Post]
getOneReal(_id: String) : Post

}

type auth {

status : String
Token : String
email : String
Id : String,
}





type Mutation {


addComent(_id:String,person: String,text: String) : status
removeLike(id: String,person: String) : status


likes(_id:String,person:String) :  status

sendFile(file: Upload,text: String) : status

Auth(email: String, password: String) :  auth

modifiEmail(token: String,email:String) : User

CreateAccount(email:String,name: String, password: String) : status


}






type status {

status: String!
mensaje:String



}




"tipo User"
type User{

"identificador unico"
Id: ID
"nombre del suario"
name : String
email : String
age : Int
Posts: [Post]


}

type Post {
_id : String
Username : String
src : String
tipo : String
description : String
likes : [like]
coments : [coment]
}


type like{

idU: String


}



type coment {

ref : String
text : String
time : String



}






`;





module.exports = typeDefs;