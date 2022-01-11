import React, { useContext } from 'react'



import Perfil from 'src/assets/perfil.jpg'
import Meme from 'src/assets/meme.jpg'
import Points from 'src/assets/svgs/points'
import Hear from 'src/assets/svgs/hearfill'
import Burble from 'src/assets/svgs/burble'
import Send from 'src/assets/svgs/send'
import Save from 'src/assets/svgs/save'

import perfil from 'src/assets/perfil.jpg'


import  style from './post.module.css'
import clsx from 'clsx'

//context
import ThemeConsumer from 'src/context/themeContext'






export const POST = (props) => {
const {theme,toggleTheme} = useContext(ThemeConsumer)



const  PostDisplay =  props.url || Meme



    const contentType = 'imagen'
    let display = ''
    if (contentType == 'video') {
        display = <video src=""></video>
    } else if (contentType == 'image') {
        display = <img src={Perfil} className='imagen'></img>
    }

    

  const container = clsx({[style.container]:true,[style.light]:theme==='light'})
const PostInfo = clsx({[style.postInfo]:true,[style.light]:theme==='light'})
const bottomBar = clsx({[style.bottomBar]:true,[style.light]:theme==='light'})
const PostSave = clsx({[style.postSave]:true,[style.light]:theme==='light'})
const PostMore = clsx({[style.postMore]:true,[style.light]:theme==='light'})
const postName = clsx({[style.postName]:true,[style.light]:theme==='light'})
const points = clsx({[style.points]:true,[style.light]:theme==='light'})
const  Options = clsx({[style.Options]:true,[style.light]:theme==='light'})
const PostLikes = clsx({[style['post-likes']]:true,[style.light]:theme==='light'})
const PostComments = clsx({[style.postsComments]:true,[style.light]:theme==='light'})
const  time = clsx({[style.time]:true,[style.light]:theme==='light'})



    return (

        <div className={container}>

            <div className={PostInfo}>
         
                <img  onClick={toggleTheme}  src={Perfil} className={style.PerfilImg}/>
                <p className={postName}>fittnes</p>
                <Points className={points}/>
            </div>

            <img src={PostDisplay} className={style.imagen}></img>

            <div className={bottomBar}>

                <div className={Options}>
                      <Hear/>
                    <Burble/>
                    <Send/>

                </div>

                   <Save className={PostSave}/>

            </div>

            <div className={PostMore}>

                <p className={PostLikes}>6,10 Me gusta</p>
                <p className={PostComments}>ver los comentarios 3,000</p>
                <p className={time}>hace 4 horas</p>
            </div>

        </div>

    )
}





export const ViewPost = () =>{

    const {theme} = useContext(ThemeConsumer);
    
    const viewP = clsx({[style.viewP]: true,[style.dark]: theme !== 'light'})
    
    
    
    return(
    
    <div className={viewP}>
    
    <img src={perfil} className={style.viewImg} ></img>
    
    </div>
    
    
    )
    }