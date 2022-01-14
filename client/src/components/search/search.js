import React,{useContext} from 'react';
import {Navbar} from 'src/components/home/home';
import style from './search.module.css'


import Sea from 'src/assets/svgs/search';
import perfil from "src/assets/perfil.jpg";

import ThemeConsumer from 'src/context/themeContext';
import clsx from 'clsx';


export const Search  = () =>{

const {theme} = useContext(ThemeConsumer);


const display = clsx({[style.display]: true,[style.dark]: theme !== 'light'})



return (

<div>
<SearchBar/>

<div className={display}>

<ViewPost/>
<ViewPost/>
<ViewPost/>
<ViewPost/>



</div>



<Navbar/>
</div>







)












}


const SearchBar = () =>{

const {theme} = useContext(ThemeConsumer);




const SeachBar = clsx({[style.searchBar]: true,[style.dark]: theme !== 'light'})

return(
<div className={SeachBar}>

<img src={Sea} className={style.searchImg} ></img>
<input type='text'  className={style.inputSearch} placeholder="buscar"  />

</div>

)



}

const ViewPost = () =>{

const {theme} = useContext(ThemeConsumer);

const viewP = clsx({[style.viewP]: true,[style.dark]: theme !== 'light'})



return(

<div className={viewP}>

<img src={perfil} className={style.viewImg} ></img>

</div>


)
}