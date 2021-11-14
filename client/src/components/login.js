import React,{useState} from "react";
import {
    Link,Redirect
  } from "react-router-dom"
import  "./login.css";
import  { useForm } from "react-hook-form";
import { gql, useMutation,useQuery } from '@apollo/client'






const CreateA = gql`

mutation createA($email:String,$password:String,$name:String) {

  CreateAccount(email:$email,password:$password,name:$name) {

 status
 mensaje

  }




}







`;





const Logiar = gql`
mutation auth($email:String,$password:String){

  Auth(email: $email, password: $password) {
     status
     Token
     Id
  }
}
`;


export   const LoginIn = (props) =>{
// let [Isactive,active] = useState(false)

const { register, handleSubmit } = useForm();
const [SendForm,{data,loading,error}] =  useMutation(Logiar);
var info;



if(loading){ 

info = <p>loading</p>;

}



if(data){


info = <p  className={data.Auth.status == 'success' ? 'ok-color' : 'err-color'}>{data.Auth.status}</p>


console.log(data.Auth.Token);

localStorage.setItem("token",data.Auth.Token);
localStorage.setItem("ID_A",data.Auth.Id);

if(data.Auth.status == 'success'){

props.auth(true);


return (<Redirect to="/home" />); 


}



}










const onSubmit = (data) => {


console.log(data);


SendForm({variables:{email:data.email,password:data.password}});













}





return (


<div className="logins">

<select className={"idioma"}>
<option>español</option>
<option>ingles</option>
<option>portugues</option>
</select>

<h1 className="title">Devsgram</h1>


<form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex',flexDirection:'column'}}>
<input type="text" className="form" placeholder="email"   {...register('email')}></input>
<input type="text" className="form" placeholder="password"  {...register('password')}></input>

<p className="text_help">olvidaste tu contraseña?</p>
<input className={'button_S'}  type="submit"/>
</form>
<p>no tienes cuenta? <Link className='setUp' to='/register'>registrate</Link></p>
{info}




<p className='footer'>From Devsgram</p>
</div>








)











}


export   const Resgistre = ()=>{

    const { register, handleSubmit } = useForm();
    // let [Isactive,active] = useState(false);
    const [Result,setResult] = useState('');
    const [envA, { data, loading, error }] = useMutation(CreateA);
let result;


console.log(data)

if(data){

const info = data.CreateAccount;


if(info.status === 'success') {



result = <p style={{color:'green'}}>{info.mensaje}</p>


}


if(info.status === 'error') {



  result = <p style={{color:'red'}}>{info.mensaje}</p>
  
  
  }

if(info.status === 'warning')

{
result = <p style={{color:'red'}}>{info.mensaje}</p>;

}


}






// const resultato = () =>{
//    if(Result === '0'){

   
//     return   <p  style={{color:'green',fontSize:'17px'}}> se ha registrado el usuario</p>

//    }else if(Result === '1'){

//      return <p style={{color:'red',fontSize:'17px'}}>este correo ya existe en la base de datos</p>


//    }
//   }












    const onSubmit = (data) => {
        // alert(JSON.stringify(data));
        let info =  data;
        console.log(info);
        envA({variables:{email:data.email,password:data.password,name:data.username}})

    








    // let objt = {name:"jaimito"};
     
  //   fetch("http://localhost:5000/Users/add",{method: "POST",body:info,headers:{'Content-Type': 'application/json'}}).then(x=>{
  //   x.json().then(x=>{

    
  // //  console.log(x.mensaje);

  //   setResult(x.mensaje)



  //   })


  //   })







      };

const CreateAccuntion =  (data) =>{

// alert(JSON.stringify(data));
// console.log(watch("email"))



}






return (
<div className="logins">

<select className={"idioma"}>
<option>español</option>
<option>ingles</option>
<option>portugues</option>
</select>

<h1 className="title">Devsgram</h1>

<form onSubmit={handleSubmit(onSubmit)} className="form-block">
<input type="text" className="form" placeholder="email o telefono" {...register("email")}></input>
<input type="text" className="form" placeholder="Username @example"  {...register("username")} ></input>
<input type="text" className="form" placeholder="password"  {...register("password")} ></input>
<p className="text_help">olvidaste tu contraseña?</p>


<input className='button_S' onClick={CreateAccuntion} type="submit" value='crear cuenta'></input>
</form>
<p>ya  tienes cuenta? <Link className='setUp' to='/'>tengo cuenta</Link></p>
{result}


<p className='footer'>From Devsgram</p>
</div>



)




};