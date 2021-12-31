import React,{useState,useEffect,useRef} from 'react'
import { Link, useParams } from 'react-router-dom'
import './historyBar.css'
import { useQuery, gql } from '@apollo/client'
export const HistoryElement = ({ img, username }) => {
  return (
        <Link to={`/his/${username}`}>
        <div className='barHis-elem'>
             <img className='barHis-img' src={img} className="barHis-img" alt=""/>
                <p className="barHis-username">{username}</p>
        </div>
        </Link>
  )
}


const QueryForHistory = gql`
query GetHistoryUsers {
    GetHistoryUsers {

        historys {

             _id
            src
            ref
        }
        Users {

            Id
            name
        }
    }
}
`


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




export const VHistory = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(QueryForHistory)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
//create a hasmap  that contains the videos of users
  const videos = data.GetHistoryUsers.historys.reduce((acc, cur) => {
    if (!acc[cur.ref]) {
      acc[cur.ref] = []
    }
    acc[cur.ref].push(cur)
    return acc
  }, {})
  console.log(videos)





  return (
        <div className='His-container'>
              
            <div className='his_Display'>
               
               {Object.values(videos).map(his => <VideoHis  his={his} />)}
              
              
              
          </div>


       <form  className='his-send'>

         <input   type="text" />
          <button></button>  
       </form>
       </div>

  )







}




const VideoHis = ({his}) => {

  const [videos, setVideos] = useState(his)
  const [video, setVideo] = useState(videos[0])
 const [porcentaje,setPorcentaje] = useState(0)







  const Ev = useRef(null)

  useEffect(() => {
    obersevador.observe(Ev.current)
  }, [])





//create the funcion  the slider videos
  const ChangeVideo = (boleano) => {

let indexActual = videos.findIndex(his => his._id === video._id)
let limit = videos.length
let min = 0

//if the boleano is true, the indexActual is +1
if (boleano) {
   //if the indexActual is the last, return
  if (indexActual === limit - 1) {
      scroll()
  }
  //if the indexActual is not the last, return the next video
  else {
    setVideo(videos[indexActual + 1])
  }
}
//if the boleano is false, the indexActual is -1
else {
  //if the indexActual is the first, return the funcion
  if (indexActual === min) {
    // return
  }
  //if the indexActual is not the first, return the previous video
  else {
    setVideo(videos[indexActual - 1])
 
}
  }
  }

  //if  are in the last video,scroll 100vw
  const scroll = () => {
    if (video.id === videos[videos.length - 1].id) {
     
      let sceenWidth = window.innerWidth
      document.querySelector('.his_Display').scrollTo(sceenWidth, 0)
    }
  }


//recove the host from then enviroment
const host = process.env.REACT_APP_HOST





  return (
  <>
        <div className='his-hh'>
          <Barras  totalIndex={videos.length} porcentaje={porcentaje}   index={videos.findIndex(his => his._id === video._id)}  />
      <div  onClick={()=>ChangeVideo(false)} style={{height:"90vh",width:"33%",position:"absolute",left:'0',zIndex:'1'}} ></div>
     <video   autoPlay ref={Ev}  onTimeUpdate={(e)=>  setPorcentaje(e.target.currentTime /   e.target.duration * 100)   } onEnded={()=>ChangeVideo(true)}  className='video-his' src={`http://${host}:5000/${video.src}`}/>
     <div onClick={()=>ChangeVideo(true)} style={{height:"90vh",width:"33%",position:"absolute",right:"0",zIndex:'1',top:'0' }} ></div>

     </div>
   </>

  )








}




const Barras = ({porcentaje,index,totalIndex}) => {



let barritas = []




  for(let i=0; i<totalIndex; i++){

    barritas.push(<Barra key={i} porcetaje={index === i ?  porcentaje : 0  } active={i <  index ? 'true' : 'false' }/>)



  }

  






return (

<div className='indicadores'>
          {barritas}
          </div>


)




}



const Barra = ({porcetaje,active}) => {
  return (
    <progress className='indicator' max='100'    value={  active === "true" ?  '100'   : porcetaje.toString()}></progress>
  )
}