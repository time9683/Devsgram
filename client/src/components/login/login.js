import React, { useContext, useEffect, useState } from 'react'
import {
  Link, Redirect
} from 'react-router-dom'
// import './login.css'
import style from './login.module.css'
import { useForm } from 'react-hook-form'
import { gql, useMutation, useQuery } from '@apollo/client'
import clsx from 'clsx'


import ThemeConsumer from 'src/context/themeContext'


const CreateA = gql`

mutation createA($email:String,$password:String,$name:String) {

  CreateAccount(email:$email,password:$password,name:$name) {

 status
 mensaje

  }




}







`

const Logiar = gql`
mutation auth($email:String,$password:String){

  Auth(email: $email, password: $password) {
     status
     Token
    _id
  }
}
`

export const LoginIn = (props) => {
// let [Isactive,active] = useState(false)
const {theme,toggleTheme} = useContext(ThemeConsumer)

  const { register, handleSubmit } = useForm()
  const [SendForm, { data, loading, error }] = useMutation(Logiar)
  let info

  if (props.BoolAuth) {
    return <Redirect to='/home' />
  }

  if (loading) {
    info = <p>loading</p>
  }

  if (data) {


    info = <p className={data.Auth.status == 'success' ? 'ok-color' : 'err-color'}>{data.Auth.status}</p>

    console.log(data.Auth.Token)

    localStorage.setItem('token', data.Auth.Token)
    localStorage.setItem('ID_A', data.Auth._id)

    if (data.Auth.status == 'success') {
      props.auth(true)

      return (<Redirect to="/home" />)
    }
  }

  const onSubmit = (data) => {
    console.log(data)

    SendForm({ variables: { email: data.email, password: data.password } })
  }






const container = clsx({[style.Container]:true,[style.ContainerLight]:theme=='light',[style.ContainerDark]:theme=='dark'})
const ContainerForm = clsx({[style.ContainerForm]:true,[style.ContainerFormLight]:theme=='light',[style.ContainerFormDark]:theme=='dark'})
const containerLink = clsx({[style.containerLink]:true,[style.containerLinkLight]:theme=='light',[style.containerLinkDark]:theme=='dark'})
const title = clsx({[style.title]:true,[style.titleDark]:theme=='dark'})
const InputForm = clsx({[style.InputForm]:true,[style.InputFormDark]:theme=='dark'})
const footer = clsx({[style.footer]:true,[style.footerDark]:theme=='dark'})
const selectorIdioma = clsx({[style.selectorIdioma]:true,[style.selectorIdiomaDark]:theme=='dark'})







  return (

<div className={container}>

<select className={selectorIdioma}>
<option>español</option>
<option>ingles</option>
<option>portugues</option>
</select>


<div className={ContainerForm}>
<h1 className={title}>Devsgram</h1>

<form onSubmit={handleSubmit(onSubmit)} className={style.form}>
<input type="text" className={InputForm} placeholder="email" {...register('email')}></input>
<input type="text" className={InputForm} placeholder="password" {...register('password')}></input>

<p className={style.text}>olvidaste tu contraseña?</p>
<input className={style.btn} value="Login" type="submit"/>
</form>
</div>
<div className={containerLink}>
<p>no tienes cuenta? <Link className={style.setUp} to='/register'>registrate</Link></p>
</div>
{info}


  <p  onClick={toggleTheme}   className={footer}>From Devsgram</p>
  
</div>

  )
}

export const Resgistre = () => {
  const { register, handleSubmit } = useForm()
  // let [Isactive,active] = useState(false);
  const [Result, setResult] = useState('')
  const [envA, { data, loading, error }] = useMutation(CreateA)
  let result

  console.log(data)

  if (data) {
    const info = data.CreateAccount

    if (info.status === 'success') {
      result = <p style={{ color: 'green' }}>{info.mensaje}</p>
    }

    if (info.status === 'error') {
      result = <p style={{ color: 'red' }}>{info.mensaje}</p>
    }

    if (info.status === 'warning') {
      result = <p style={{ color: 'red' }}>{info.mensaje}</p>
    }
  }



  const onSubmit = (data) => {
    const info = data
    console.log(info)
    envA({ variables: { email: data.email, password: data.password, name: data.username } })


  }

  const CreateAccuntion = (data) => {

    // alert(JSON.stringify(data));
    // console.log(watch("email"))

  }

  return (
<div className={style.Container}>

<select className={style.selectorIdioma}>
<option>español</option>
<option>ingles</option>
<option>portugues</option>
</select>



<div className={style.containerForm}>
<h1 className={style.title}>Devsgram</h1>

<form onSubmit={handleSubmit(onSubmit)} className={style.form}>
<input type="text" className={style.InputForm} placeholder="email o telefono" {...register('email')}></input>
<input type="text" className={style.InputForm} placeholder="Username @example" {...register('username')} ></input>
<input type="text" className={style.InputForm} placeholder="password" {...register('password')} ></input>
<p className={style.text}>olvidaste tu contraseña?</p>

<input className={style.btn} onClick={CreateAccuntion} type="submit" value='crear cuenta'></input>
</form>

</div>



<div className={style.containerLink}>
<p>ya  tienes cuenta? <Link className={style.setUp} to='/'>tengo cuenta</Link></p>

</div>

{result}

<p className={style.footer}>From Devsgram</p>
</div>

  )
}
