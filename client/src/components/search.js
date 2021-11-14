import React from 'react';
import {Navbar} from './home.js';
import './search.css'
import Sea from './search.svg';
import perfil from "./perfil.jpg"




export const Search  = () =>{





return (

<div>
<SearchBar/>

<div className="display">

<ViewPost/>
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


return(
<div className="search-bar">

<img src={Sea} className="search-img" ></img>
<input type='text'  className="input-search" placeholder="buscar"  />

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