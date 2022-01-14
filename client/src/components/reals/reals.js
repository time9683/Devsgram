
import React, { useState, useEffect, useRef, useContext } from 'react'
import { Navbar } from 'src/components/home/home'
// import './reals.css'
import style from './Reals.module.css'
import Hear from 'src/assets/svgs/hear'
import Perfil from 'src/assets/perfil.jpg'
import Burble from 'src/assets/svgs/burble'
import Send from 'src/assets/svgs/send'
import Puntos from 'src/assets/svgs/points'
import Flechita from 'src/assets/svgs/flecha'
import HearFill from 'src/assets/svgs/hearfill'
import Perfil2 from 'src/assets/svgs/perfil'
import poster from 'src/assets/negro.jpg'


import useIntersectionObserver from 'src/hooks/useObserver'

import { useQuery, useMutation } from '@apollo/client'
import { GetReals,Tolike,GetComents,sendComent,dislike,getUsername } from 'src/querys'
import { CalcularTime,commas } from 'src/utils/lib'
import ThemeConsumer from 'src/context/themeContext'

// client/src/context/themeContext.js
import clsx from 'clsx'


// recove host from enviroment
const host = process.env.REACT_APP_HOST

const obersevador = new IntersectionObserver(

  (entradas, _) => {
    entradas.forEach((en) => {
      if (en.isIntersecting) {
        en.target.currentTime = 0
        en.target.play()
      } else {
        en.target.pause()
      }
    })
  },
  { threshold: 0.4 }
)




export const Reals = () => {
  const [ViewComents, Vactive] = useState(false)
  const [view, setView] = useState()

  useEffect(() => { }, [])

  const SwichtComents = (id) => {
    if (id) {
      setView(id)
    }

    if (ViewComents) {
      Vactive(false)
    } else {
      Vactive(true)
    }
  }

  const rootRef = useRef()

const {theme} =useContext(ThemeConsumer)






const container = clsx ({[style.container]:true,[style.dark]:theme !== 'light'})







  return (
    <div>
      <div
        ref={rootRef}
        className={ViewComents === false ? container: container +' ' + style.preview }
      >
        <div  className={ViewComents === false ? style.RealsContainer : style.RealsContainer +' ' + style.preview }>
        <Display handleC={SwichtComents} rooRef={rootRef} />
        </div>
      </div>
      {ViewComents === false
        ? (
          <Navbar />
          )
        : (
          <Comentarios _id={view} handleCommnets={SwichtComents} />
          )}

    </div>
  )
}

const Display = (props) => {
  const { loading, error, data, fetchMore, refetch } = useQuery(GetReals, { variables: { page: 0, limit: 10 } })
  const [page, setPage] = useState(0)
  const externalRef = useRef()
  const ref = useIntersectionObserver(props.rooRef.current, () => { setPage((page) => page + 1) }, loading ? null : externalRef)

  useEffect(() => {
    if (data && page === 0) {
      const numberOfvideo = data.GetReals.length
      const pageOfvideo = Math.ceil(numberOfvideo / 5)
      setPage(pageOfvideo)
      console.log('chache:', page)
    }
  }, [])

  useEffect(() => {
    console.log('fech:', page)
    if (page !== 0) {
      fetchMore({ variables: { page } })
    }
  }, [page])

  if (loading) {
    return (
      <div
       className={style.loadingBackground}
      >
        {' '}
        <div className={style.spinner}></div>
      </div>
    )
  }

  if (error) {
    return (
      <div
          className={style.ErrorBackground}
      >
        <p>hubo un error en el ingreso de datos</p>
      </div>
    )
  }

  return <>
    {
      data.GetReals.map((vide) => (
        <Video
          ComentsCan={vide.coments}
          status={false}
          key={vide._id}
          src={`http://${host}:5000${vide.src}`}
          likes={vide.likes}
          id={vide._id}
          handleCommnets={props.handleC}
        />
      ))
    }

    <div id="visor" ref={externalRef}></div>

  </>
}





const Video = (props) => {
  const [LikeTo, { data }] = useMutation(Tolike)
  const [dislikeTo] = useMutation(dislike)

  const [Melike, playLike] = useState(false)

  // isloaing state
  const [isload, setLoading] = useState(true)

  useEffect(() => {
    console.log(isload)
  }, [isload])

  let grayhear

  const splace = (e) => {
    e.target.style.display = 'none'
  }

  if (data) {
    grayhear = (
      <Hear
        className={style.likeHearFront}
        onAnimationEnd={splace}
      ></Hear>
    )
  }

  useEffect(() => {
    let exist = false

    for (const person of props.likes) {
      if (person.idU == localStorage.getItem('ID_A')) {
        exist = true
        playLike(true)
      }
    }

    if (!exist) {
      playLike(false)
    }
  }, [])

  const Ev = useRef(null)

  useEffect(() => {
    obersevador.observe(Ev.current)
  }, [])

  const like = () => {

    if (!Melike) {
      LikeTo({
        variables: { id: props.id, person: localStorage.getItem('ID_A') }
      })
      playLike(true)
    } else {
      dislikeTo({
        variables: { id: props.id, person: localStorage.getItem('ID_A') }
      })
      playLike(false)
    }
  }

  const plays = (e) => {
    if (e.target.paused) {
      e.target.play()
    } else {
      e.target.pause()
    }
  }

  return (
    <div className={style.containerVideo}>
      <div className={style.atributos}>
        <div className={style.atributo} onClick={like}>
            {Melike ? <Hear className={style.ElementsImage} fill='red' /> : <HearFill  className={style.ElementsImage}/>}
          <p style={{ color: 'white' }}>{commas(props?.likes?.length)}</p>
        </div>

        <div
          className={style.atributo}
          onClick={() => {
            props.handleCommnets(props.id)
          }}
        >
          <Burble className={style.ElementsImage} />
          <p style={{ color: 'white' }}>
            {props.ComentsCan ? commas(props.ComentsCan.length) : 0}
          </p>
        </div>

        <div className={style.atributo}>
          <Send className={style.ElementsImage} />
        </div>

        <div className={style.atributo}>
            <Puntos className={style.ElementsImage}/>
        </div>
      </div>

      {grayhear}
      {/* evento mientras descarga los recursos set loading true */}

      <div className={style.spinnerLoadder} style={{ display: isload ? 'flex' : 'none' }} >

        <div className={style.spinner}></div>

      </div>

      <video

        style={{ filter: isload ? 'blur(5px)' : 'none' }}
        id="video"
        loop={true}
        poster={poster}
        className={style.video}
        onTouchStart={plays}
        onTouchEnd={plays}
        onDoubleClick={like}
        src={props.src}
        ref={Ev}
        onContextMenu={e => e.preventDefault()}
        onCanPlay={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
      />
    </div>
  )
}
















//comentarios
const Comentarios = (props) => {

  const {theme} = useContext(ThemeConsumer)



  const { error, loading, data, refetch } = useQuery(GetComents, {
    variables: { id: props._id }
  })
  const [comentar] = useMutation(sendComent)
  const [text, setText] = useState('')

  useEffect(() => {
    refetch()
  }, [])

  if (error) {
    return 'data not fount'
  }

  if (loading) {
    return 'loading'
  }

  const write = (e) => {
    setText(e.target.value)
  }

  const clickComent = (e) => {
    comentar({
      variables: {
        id: props._id,
        person: localStorage.getItem('ID_A'),
        text: text
      }
    })

    setText('')
  }

  let coments
  if (data.getOneReal.coments != null) {
    coments = data.getOneReal.coments.map((x, index) => (
      <Comentario key={x.ref + index} name={x.ref} timestamp={x.time} text={x.text} />
    ))
  }



const ExitElement = clsx({[style.ExitElement]:true,[style.dark]:theme !== 'light' })
const itemTopbar = clsx({[style.itemTopbar]:true,[style.dark]:theme !== 'light' })
const DisplayComents = clsx({[style.DisplayComents]:true,[style.dark]:theme !== 'light' })

  return (
    <div>
      <div className="topbar">
        <ul className={itemTopbar}>
          <li>
            <Flechita
              className={ExitElement}
              onClick={() => props.handleCommnets()}
            />
            <span className={style.textBar}>
              Comentarios
            </span>
          </li>
          <li>
            <Send  />
          </li>
        </ul>
      </div>

      <div className={DisplayComents}>{coments}</div>
      <div className={style.BottomBarCommens}>
        <img 
        src={Perfil}
        
         className={style.UserImage}
         
        />
        <input
          type="text"
          value={text}
          onChange={write}
          className={style.UserText}
          placeholder="Agrega un comentario..."
        />
        <button
          className={style.btnPublic}
          onClick={clickComent}
        >
          Publicar
        </button>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
const Comentario = (props) => {

  const {theme} = useContext(ThemeConsumer)
  const { loading, data, err } = useQuery(getUsername, { variables: { id: props.name } })
  let username

  if (loading) {
    username = '...'
  }

  if (data) {
    console.log(data)
    username = data.GetUser.name
  }

const containerComent = clsx({[style.containerComent]:true,[style.dark]:theme !== 'light' })

  return (
    <div className={containerComent}>
      <div  className={style.ComentUserData}>
        <Perfil2  className={style.ComenImage}  />
        <p  className={style.ContainertextComent}><span className={style.textComent}>{username}</span>{props.text}</p>
      </div>
      <div
      className={style.ComentStast}
        style={{
         
        }}
      >
        <p>{CalcularTime((new Date() - props.timestamp) / 1000)}</p>
        <p>{props.likes} Me gustas</p>
        <p>Responder</p>
      </div>
    </div>
  )
}
