import React,{useState}  from "react";
import { Navbar } from "./home";
// import puntos from "./puntos.svg";
// import flecha  from "./flecha.svg";
// import perfil from "./perfil.jpg"
import "./perfiil.css"

// import real from './video.svg'
// import po from './pos.svg'
// import refe from './ref.svg'










export const Acccount = (props) =>{

const [Isactive,active] = useState('post');






const linkto = (name) =>{


active(name)




}



return (
<div >
<div className="TopBar">

<div className="TopBar-header"> 
<img src={flecha} className="flecha" ></img>

<p>pedrito</p>
</div>
<img src={puntos}  className="puntos"></img>
</div>


<div className="acccount-info">

<img src={perfil}  className="img-perfil"></img>


<div className="account-stats">

<div className="stast">
<p>
56
</p>
<p>publicaciones</p>
</div>


<div className="stast"><p>
7,300
</p>
<p>seguidores</p></div>


<div className="stast"><p>
3,343
</p>
<p>seguidos</p></div>


</div>




</div>
<div className="description">
<p>perito</p>
<p className='pann'>me como los mocos</p>
<p>feliz de la vida</p>

<div className="actions">


<button className="btn btn-1">Seguir</button>
<button  className="btn  btn-2">Mensaje</button>
<button className="btn-3">^</button>
</div>
</div>

<div className="subNavBar">

<ul class="nav_list">


<li onClick={() => linkto('post')}   className={Isactive == 'post' ? 'navRef' : ''}>
<img src={po} className='icon'></img>
</li>

<li onClick={() => linkto('reals')}   className={Isactive == 'reals' ? 'navRef' : ''}>
    <img src={real} className='icon'></img>
</li>

<li onClick={() => linkto('ref')} className={Isactive == 'ref' ? 'navRef' : ''}>
<img src={refe} className='icon'></img> 
</li>


</ul>






</div>


<div className="Display_posts">

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












const ViewPost = () =>{







    return(
    
    <div className="viewP">
    
    <img src={perfil} className="view-img" ></img>
    
    </div>
    
    
    )
    }