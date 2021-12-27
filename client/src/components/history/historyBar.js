import { useQuery, gql } from '@apollo/client'
import { HistoryElement } from './history'
import React from 'react'
import './historyBar.css'

const QueryForHistory = gql`
query GetHistoryUsers {
    GetHistoryUsers {
        historys {
            _id
            src
        }
        Users {
            Id
            name
        }
    }
}
    `

export const HistoriaBar = () => {
  const { loading, error, data } = useQuery(QueryForHistory)

  return (
        <div className='barHis'>

            {loading ? <p>Loading...</p> : error ? <p>Error :(</p> : data.GetHistoryUsers.Users.map(user => <HistoryElement key={user.Id} img={'https://ideasnuevas.net/wp-content/uploads/2016/08/Wallpapersxl-Perritos-Bonitos-Seguro-Que-Estabas-Esperando-Otro-Fondo-De-Perros-Pues-Ya-No-Tienes-276709-1440x1080.jpg'} username={user.name} />)}

        </div>
  )
}
