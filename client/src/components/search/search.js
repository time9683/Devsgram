import React,{useContext,useState} from 'react';
import {Navbar} from 'src/components/home/home';
import style from './search.module.css'


import Sea from 'src/assets/svgs/search';

import {ViewPost} from 'src/components/post/Post'
import ThemeConsumer from 'src/context/themeContext';
import clsx from 'clsx';
import {GetUsers} from 'src/querys/index'
import { useQuery } from '@apollo/client';
import Flecha from 'src/assets/svgs/flecha';


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
const [name,setName] = useState('')
//create a state if the bar is focus
const [focus,setFocus] = useState(false)





const {theme} = useContext(ThemeConsumer);




const SeachBar = clsx({[style.searchBar]: true,[style.dark]: theme !== 'light'})

const inputSearch = clsx({[style.inputSearch]: true,[style.moveBar]: focus === true})
const recommended = clsx({[style.Recommended]: true,[style.dark]: theme !== 'light',[style.null]: focus === false})
const arrow = clsx({[style.arrow]: true,[style.null]: focus === false})
const searchImg = clsx({[style.searchImg]: true,[style.move]: focus === true})

return(
 <>   
<div className={SeachBar}>
    
<Flecha onClick={()=>{setFocus(false)}} width={30} className={arrow}   height={30}  />
<Sea className={searchImg} />
<input onClick={()=>{setFocus(true)}}  onInput={(e)=>{setName(e.target.value)}} value={name}  type='text'  className={inputSearch} placeholder="buscar"  />

</div>



<div className={recommended}>
<Recommended name={name}/>

</div>

</>

)



}




const Recommended =  ({name}) =>{

    const {data,loading} =   useQuery(GetUsers,{
        variables:{name:name}
        
        });







return (
<>
    {name !== '' ?  data?.GetUsers?.map(item =>(
        <div  className={style.item} >
        <p> {item.name} </p>
        </div> 
        
        
        )
    )
    : ''

    }

</>
)





}