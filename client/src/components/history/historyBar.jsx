import { useQuery, gql } from '@apollo/client'
import React,{useContext} from 'react'
import clsx from 'clsx'

import style from  './historyBar.module.css'

import { HistoryElement} from './history'
import  ThemeConsumer  from '/src/context/themeContext'
import UserConsumer from '/src/context/UserContext'
import { Redirect } from 'react-router-dom'





const QueryForHistory = gql`
query GetHistoryUsers {
    GetUsersWithHistory {
         
            _id
            name
        
    }
}
    `

export const HistoriaBar = () => {
  const { loading, error, data } = useQuery(QueryForHistory)
  const {theme} = useContext(ThemeConsumer)
  const {setUser} = useContext(UserConsumer)
if(data){
console.log(data)
if(data?.GetHistoryUsers?.code === 401){

//remove token from localStorage
localStorage.removeItem('token')
localStorage.removeItem('ID_A')
setUser(undefined)
 return <Redirect  to="/" />

}


}





    const container = clsx({[style.container]:true,[style.dark]:theme !== 'light'})



  return (
        <div className={container}>
            

            {loading ? <p>Loading...</p> : error ? <p>Error :(</p> : data?.GetUsersWithHistory?.map(user => <HistoryElement  id={user._id}  key={user._id} img={'https://ideasnuevas.net/wp-content/uploads/2016/08/Wallpapersxl-Perritos-Bonitos-Seguro-Que-Estabas-Esperando-Otro-Fondo-De-Perros-Pues-Ya-No-Tienes-276709-1440x1080.jpg'} username={user.name} />)}
        </div>
  )
}
