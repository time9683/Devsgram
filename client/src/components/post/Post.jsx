import React, { useContext } from 'react'
import { useQuery } from "@apollo/client"

import Perfil from '/src/assets/perfil.jpg'
// import Perfil from './assets/perfil.jpg'
// import Meme from 'src/assets/meme.jpg'
import Points from '/src/assets/svgs/points'
import Hear from '/src/assets/svgs/hearfill'
import Burble from '/src/assets/svgs/burble'
import Send from '/src/assets/svgs/send'
import Save from '/src/assets/svgs/save'

import perfil from '/src/assets/perfil.jpg'
 import style from './post.module.css'
import clsx from 'clsx'

//context
import ThemeConsumer from '/src/context/themeContext'
import { Link, Redirect, useParams } from 'react-router-dom'
import { getOneAndContent } from '/src/querys'


const host = import.meta.env.VITE_APP_HOST;



export const POST = (props) => {
    const { theme, toggleTheme } = useContext(ThemeConsumer)






    const PostDisplay = "http://" + host + ":5000" + props.src


    let display = ''
    //regex to check if the url is a image
    if (/\.(jpe?g|png|gif)$/i.test(props.src)) {
        display = <img src={PostDisplay} className={style.imagen}></img>
    } else {

        display = <video src={PostDisplay} autoPlay='true' className={style.ViewReals} />

    }



    const container = clsx({ [style.container]: true, [style.light]: theme === 'light' })
    const PostInfo = clsx({ [style.postInfo]: true, [style.light]: theme === 'light' })
    const bottomBar = clsx({ [style.bottomBar]: true, [style.light]: theme === 'light' })
    const PostSave = clsx({ [style.postSave]: true, [style.light]: theme === 'light' })
    const PostMore = clsx({ [style.postMore]: true, [style.light]: theme === 'light' })
    const postName = clsx({ [style.postName]: true, [style.light]: theme === 'light' })
    const points = clsx({ [style.points]: true, [style.light]: theme === 'light' })
    const Options = clsx({ [style.Options]: true, [style.light]: theme === 'light' })
    const PostLikes = clsx({ [style['post-likes']]: true, [style.light]: theme === 'light' })
    const PostComments = clsx({ [style.postsComments]: true, [style.light]: theme === 'light' })
    const time = clsx({ [style.time]: true, [style.light]: theme === 'light' })



    return (

        <div className={container}>

            <div className={PostInfo}>

                <img onClick={toggleTheme} src={Perfil} className={style.PerfilImg} />
                <p className={postName}>fittnes</p>
                <Points className={points} />
            </div>

            {display}

            <div className={bottomBar}>

                <div className={Options}>
                    <Hear />
                    <Burble />
                    <Send />

                </div>

                <Save className={PostSave} />

            </div>

            <div className={PostMore}>

                <p className={PostLikes}>6,10 Me gusta</p>
                <p className={PostComments}>ver los comentarios 3,000</p>
                <p className={time}>hace 4 horas</p>
            </div>

        </div>

    )
}





export const ViewPost = ({ src, id }) => {

    const { theme } = useContext(ThemeConsumer);

    const viewP = clsx({ [style.viewP]: true, [style.dark]: theme !== 'light' })



    return (

        <Link to={`/posts/${id}`} className={viewP}>

            <img src={`http://${host}:5000${src}`} className={style.viewImg} ></img>

        </Link>


    )
}



export const ViewReals = ({ src, id }) => {




    return (

        <Link to={`/reals/${id}`} className={style.viewR}>

            <video src={`http://${host}:5000${src}`}  className={style.viewImg}></video>

        </Link>


    )





}


export function DisplayerPOSTS() {
    //obtein the id from params 
    const { id } = useParams()

    if (!id) return <Redirect to={"/home"}   ></Redirect>


    return (
        <>

            <View id={id} />
        </>
    )



}


const View = ({ id }) => {
    const params = { variables: { id, page: 0, limit: 10 } }

    const { data, loading, error } = useQuery(getOneAndContent, params)





    if (loading) {

        return <p>loading</p>
    }


    if (error) {
        return <p>bueno la cagaste hijo mio</p>
    }

    let info = [];


    if (data) {
        console.log(data)
        info = [data.getOneContent, ...data.GetAll]

    }



    console.log(info)
    return (
        <>
            {info.map((post, index) => {

                return <POST key={index} {...post} />
            })}

        </>

    )



}