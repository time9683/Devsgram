import React from 'react'
import pefil from './perfil.jpg'
import puntos from './puntos.svg'
import hear from './corazon.svg'
import burble from './burble.svg'
import send from './send.svg'
import save from './save.svg'
import './post.css'

export const POST = (props) => {
    const contentType = 'imagen'
    let display = ''
    if (contentType == 'video') {
        display = <video src=""></video>
    } else if (contentType == 'image') {
        display = <img src={pefil} className='imagen'></img>
    }

    return (

        <div className="POST">

            <div className="post-info">
                <img src={pefil} className="POST-image"></img>
                <p className="post-perfil-name">fittnes</p>
                <img src={puntos} className="POST-punto"></img>
            </div>

            <img src={pefil} className='imagen'></img>

            <div className='bottomBar'>

                <div className="Options">
                    <img src={hear}></img>
                    <img src={burble}></img>
                    <img src={send}></img>

                </div>

                <img src={save} className='post-save'></img>

            </div>

            <div className='post-more'>

                <p className="post-likes">6,10 Me gusta</p>
                <p className="posts-comments">ver los comentarios 3,000</p>
                <p className="time">hace 4 horas</p>
            </div>

        </div>

    )
}
