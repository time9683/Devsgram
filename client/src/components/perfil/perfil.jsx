import React,{useEffect, useState}  from "react";
import { Navbar } from "/src/components/home/home";
import Puntos from "/src/assets/svgs/points";
import Flecha  from "/src/assets/svgs/flecha";
import perfil from "/src/assets/perfil.jpg"
import  style from "./perfil.module.css"

import Real from '/src/assets/svgs/video'
import Po from '/src/assets/svgs/pos'
import Refe from '/src/assets/svgs/ref'




import {ViewPost, ViewReals} from '/src/components/post/Post'
import { useParams } from "react-router-dom";
import { GetUser, setFollow } from "/src/querys";
import { useQuery } from "@apollo/client";
import  {useMutation} from '@apollo/client'

//get host from env


export const Acccount = (props) =>{
const [Isactive,active] = useState('post');
const [isFollow,setFoll] = useState(false)
const [isYou,setYou] = useState(false)
const {id} = useParams()
const {data} = useQuery(GetUser,{variables:{name:id}})
const [setfollow,{data:info}]  = useMutation(setFollow)






useEffect(()=>{
    if(data){

        if(data.GetUser._id ===  localStorage.getItem('ID_A')){
         setYou(true)
        }


        let  foll =  data.GetUser.followers.find(follower => follower._id === localStorage.getItem('ID_A'))
        console.log(foll)
        if(foll){
        setFoll(true)
        }
        
        }
},[data])





const linkto = (name) =>{


active(name)




}

if(data){
    console.log(data.GetUser._id)
}
const follow = () =>{
    
    setfollow({variables:{id:data.GetUser._id}})
    
}


return (
<div >
<div className={style.TopBar}>

<div className={style.TopBarHeader}> 
<Flecha  width={40}  height={40} className={style.flecha} />

<p>{data?.GetUsers?.name}</p>
</div>
<Puntos  width={40}  height={40}  className={style.puntos}/>
</div>


<div className={style.acccountInfo}>

<img src={perfil}  className={style.imgPerfil}></img>


<div className={style.accountStats}>

<div className={style.stast}>
<p>
{data ? data?.GetUser?.posts?.length : 0}
</p>
<p>publicaciones</p>
</div>


<div className={style.stast}><p>
{ data ?  data?.GetUser?.followers?.length : 0}

</p>
<p>seguidores</p></div>


<div className={style.stast}><p>

{data ? data?.GetUser?.followed?.length : 0}
</p>
<p>seguidos</p></div>


</div>




</div>
<div className={style.description}>
<p>{id}</p>
<p className={style.pann}>me como los mocos</p>
<p>feliz de la vida</p>

<div className={style.actions}>

{
 isYou ?  <button   className={style.btn + ' ' + style.btn4} >Editar perfil</button>  :
<>

<button className={  isFollow ? style.btn4 + ' ' + style.btn : style.btn1 + ' ' + style.btn   } onClick={follow}>{ isFollow ? "Siguiendo" : "Seguir"}</button>
<button  className={style.btn + ' ' +  style.btn2}>Mensaje</button>

</>
}


<button className={style.btn3}>^</button>
</div>
</div>

<div className={style.subNavBar}>

<ul className={style.navList}>


<li onClick={() => linkto('post')}   className={Isactive == 'post' ? style.navRef  : ''}>
<Po  width={40}  height={40} className={style.icon}/>
</li>

<li onClick={() => linkto('reals')}   className={Isactive == 'reals' ? style.navRef : ''}>
    <Real fill={'white'}   width={40}  height={40} className={style.icon}/>
</li>

<li onClick={() => linkto('ref')} className={Isactive == 'ref' ? style.navRef : ''}>
<Refe  width={40}  height={40} className={style.icon}/>
</li>


</ul>






</div>


<div className={style.DisplayPosts}>

{

Isactive === 'post' ? <Post data={data?.GetUser?.posts.filter(post =>  post.type === 'Post')} /> : <Reals data={data?.GetUser?.posts.filter(post =>  post.type === 'Reals')} />







}



</div>








    <Navbar/>
</div>



)




}





const Reals = ({data}) =>{


return (


<>

{

data.map(post => <ViewReals  id={post._id} src={post.src}/>)

}

</>


)



}


const   Post= ({data}) =>{


    return (
    
    
    <>
    
    {

data?.map(post => <ViewPost src={post.src}/>)

}

    </>
    
    
    )

    }















