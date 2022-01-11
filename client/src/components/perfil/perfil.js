import React,{useState}  from "react";
import { Navbar } from "src/components/home/home";
import Puntos from "src/assets/svgs/points";
import Flecha  from "src/assets/svgs/flecha";
import perfil from "src/assets/perfil.jpg"
import  style from "./perfil.module.css"

import Real from 'src/assets/svgs/video'
import Po from 'src/assets/svgs/pos'
import Refe from 'src/assets/svgs/ref'




import {ViewPost} from 'src/components/post/Post'





export const Acccount = (props) =>{

const [Isactive,active] = useState('post');






const linkto = (name) =>{


active(name)




}



return (
<div >
<div className={style.TopBar}>

<div className={style.TopBarHeader}> 
<Flecha  width={40}  height={40} className={style.flecha} />

<p>pedrito</p>
</div>
<Puntos  width={40}  height={40}  className={style.puntos}/>
</div>


<div className={style.acccountInfo}>

<img src={perfil}  className={style.imgPerfil}></img>


<div className={style.accountStats}>

<div className={style.stast}>
<p>
56
</p>
<p>publicaciones</p>
</div>


<div className={style.stast}><p>
7,300
</p>
<p>seguidores</p></div>


<div className={style.stast}><p>
3,343
</p>
<p>seguidos</p></div>


</div>




</div>
<div className={style.description}>
<p>perito</p>
<p className={style.pann}>me como los mocos</p>
<p>feliz de la vida</p>

<div className={style.actions}>


<button className={style.btn + ' ' + style.btn1}>Seguir</button>
<button  className={style.btn + ' ' +  style.btn2}>Mensaje</button>
<button className={style.btn3}>^</button>
</div>
</div>

<div className={style.subNavBar}>

<ul class={style.navList}>


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

Isactive === 'post' ? <Post/> : <Reals/>







}



</div>








    <Navbar/>
</div>



)




}





const Reals = () =>{


return (


<>

<ViewReals/>
<ViewReals/>
<ViewReals/>
</>


)



}


const   Post= () =>{


    return (
    
    
    <>
    
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>
      <ViewPost/>
    <ViewPost/>
    <ViewPost/>  
    <ViewPost/>
    <ViewPost/>
    <ViewPost/>

    </>
    
    
    )

    }


const ViewReals = () =>{




    return(
    
        <div className="viewP">
        
        <video  className="view-img" ></video>
        
        </div>
        
        
        )





}












