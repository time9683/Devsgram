import React,{Fragment, useContext} from 'react';
import {
    Link
  } from "react-router-dom";
import clsx from 'clsx';



  
import Burble from  "/src/assets/svgs/burble";
import Hear from  "/src/assets/svgs/hearfill";
import Logo from  '/src/assets/svgs/home';
import Plus from "/src/assets/svgs/plus";
import Search_logo from "/src/assets/svgs/search";
import Uses_logo from "/src/assets/svgs/user"
import Video_logo from "/src/assets/svgs/video";



import style from './home.module.css'

import {POST} from "/src/components/post/Post";




import {HistoriaBar} from '/src/components/history/historyBar';
import ThemeConsumer from '/src/context/themeContext';



export const Home = () =>{
const {theme}= useContext(ThemeConsumer)
const Display = clsx({[style.Display]:true,[style.darktheme]:theme!=='light'})

return(
<div>
<Topbar/>

<div className={Display}>
<HistoriaBar/>
<div className={style.postContainer}>
<POST src={"/c3xzkw8l6unjstfVID-20220805-WA0052.mp4"}/>


</div>


</div>



<Navbar/>
</div>








)



}

const Topbar = ()=>{
const {theme} = useContext(ThemeConsumer)

const title = clsx({[style.Title]:true,[style.dark]:theme!=='light'})
const topbar = clsx({[style.Topbar]:true,[style.dark]:theme!=='light'})
const iconsTop = clsx({[style.iconsTop]:true,[style.dark]:theme!=='light'})

return (
<div className={topbar}>
<h2 className={title}>Devsgram</h2>

<div className={iconsTop}>
<p><Link to='/post/create'><Plus   color={theme === 'light' ? 'black' : 'white'}    /></Link></p>
<p><Hear/></p>
<p><Burble/></p>
</div>
</div>

)






};


export const Navbar = () =>{
const {theme} = useContext(ThemeConsumer)
const navbar = clsx({[style.navBar]:true,[style.dark]:theme!=='light'})
const navList = clsx({[style.navList]:true,[style.dark]:theme!=='light'})


    return(<div className={navbar}>
    
    <ul className={navList}> 
     <li><Link to="/home"><Logo className="nav_element"/></Link></li>
     <li><Link to="/search"><Search_logo   className="nav_element"/></Link></li>
     <li><Link to="/reals"><Video_logo  className="nav_element"/></Link></li>
     <li><Link to="/perfil"><Uses_logo  className="nav_element"/></Link></li>
   
    </ul>



    </div>)








}