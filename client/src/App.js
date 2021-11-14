// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,Redirect
} from "react-router-dom";

import { Resgistre } from './components/login';
import {LoginIn} from './components/login';
import {Home} from "./components/home";
import {Reals} from "./components/reals"
import {Search} from "./components/search";
import {Acccount} from "./components/perfil";
import {Config} from "./components/PerfilConfig"
import {PostCreate} from "./components/PostCreates";




import * as React from 'react'
import {useState,useEffect} from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";



import { createUploadLink } from 'apollo-upload-client';




const client = new ApolloClient({
  // uri: 'http://192.168.1.105:4000',
  cache: new InMemoryCache(),
  link: createUploadLink({uri:'http://192.168.1.105:5000/graphql'})
});






const App = ()  => {

const [Auth,setAuth] = useState(false);







useEffect(()=>{

if(localStorage.getItem('token') !== null){ 

let authToken = localStorage.getItem('token');

console.log('leno')
let query = JSON.stringify({query:`{ Vauth(Token:"${authToken}"){ status } }`});


fetch("http://192.168.1.105:5000/graphql",{method:"POST",headers:{"Content-Type": "application/json"},body:query}).then( res => { 

res.json().then( data =>  { 
  
  //  console.log("caca")
    console.log(data.data);
  data.data.Vauth.status == 'Ok' ? setAuth(true) : localStorage.removeItem("token")



})

})







}else{ 

console.log("vacio")

}











},[])









const Logia = () =>{




setAuth(true);









}









  return (


<Router>

<Switch>

<Route path="/home">
  {Auth === true ? 
  <Home/> : 
  <Redirect to='login'/>}
</Route>

<Route path="/post/create" >
  <PostCreate/>


</Route>



<Route path="/cuenta">
<Acccount/>

</Route>


<Route path="/perfil">
<Config/>


</Route>


<Route path="/search">
  {
Auth == true ? <Search/>:
<Redirect to='/'/>
}
</Route>


<Route path="/reals">
{Auth === true ? 
  <Reals/>
  : 
  <Redirect to='/'/>}

</Route>




<Route path="/register">
<Resgistre/>
</Route>


<Route path="/">
 <LoginIn  auth={Logia}  />
</Route>
</Switch>




</Router>




  );
}


const SuperApp =  () => {  

return ( 
<ApolloProvider client={client}>
<App/>
</ApolloProvider>
)
}




export default   SuperApp;

