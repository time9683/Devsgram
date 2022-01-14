import { useQuery, gql } from '@apollo/client'
import React,{useContext} from 'react'
import clsx from 'clsx'

import style from  './historyBar.module.css'

import { HistoryElement} from './history'
import  ThemeConsumer  from 'src/context/themeContext'





const QueryForHistory = gql`
query GetHistoryUsers {
    GetHistoryUsers {
        Users {
            _id
            name
        }
    }
}
    `

export const HistoriaBar = () => {
  const { loading, error, data } = useQuery(QueryForHistory)
  
const {theme} = useContext(ThemeConsumer)

    const container = clsx({[style.container]:true,[style.dark]:theme !== 'light'})



  return (
        <div className={container}>
            

            {loading ? <p>Loading...</p> : error ? <p>Error :(</p> : data.GetHistoryUsers.Users.map(user => <HistoryElement  id={user._id}  key={user._id} img={'https://ideasnuevas.net/wp-content/uploads/2016/08/Wallpapersxl-Perritos-Bonitos-Seguro-Que-Estabas-Esperando-Otro-Fondo-De-Perros-Pues-Ya-No-Tienes-276709-1440x1080.jpg'} username={user.name} />)}
        </div>
  )
}
