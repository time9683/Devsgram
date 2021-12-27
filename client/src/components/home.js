import React,{Fragment} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import logo from  "./home.svg"
import search_logo from "./search.svg"
import video_logo from "./video.svg";
import Uses_logo from "./Users.svg"
import "./home.css";
import burble from  "./burble.svg";
import plus from "./plus.svg";
import hear from  "./corazon.svg";

import {POST} from "./Post.js";
import {HistoriaBar} from './history/historyBar';




export const Home = () =>{


return(
<div>
<Topbar/>

<div className="Display">
<HistoriaBar/>
<POST/>
<POST/>

</div>



<Navbar/>
</div>








)



}

const Topbar = ()=>{


return (
<div className="Topbar">
<h2 className="Title">Devsgram</h2>

<div className="icons-top">
<p><Link to='/post/create'><img src={plus} className="Topbar-img" alt=""></img></Link></p>
<p><img src={hear} className="Topbar-img" ></img></p>
<p><img src={burble} className="Topbar-img" ></img></p>
</div>
</div>

)






};


export const Navbar = () =>{


    return(<div className='navBar'>
    
    <ul className='navList'> 
     <li><Link to="/home"><img src={logo} className="nav_element"></img></Link></li>
     <li><Link to="/search"><img src={search_logo}  className="nav_element"></img></Link></li>
     <li><Link to="/reals"><img src={video_logo}  className="nav_element"></img></Link></li>
     <li><Link to="/perfil"><img src={Uses_logo}  className="nav_element"></img></Link></li>
   
    </ul>



    </div>)








}