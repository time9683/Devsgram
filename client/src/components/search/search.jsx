import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '/src/components/home/home';
import style from './search.module.css'


import Sea from '/src/assets/svgs/search';

import { ViewPost, ViewReals } from '/src/components/post/Post'
import ThemeConsumer from '/src/context/themeContext';
import clsx from 'clsx';
import { getConten, GetUsers } from '/src/querys/index'
import { useQuery } from '@apollo/client';
import Flecha from '/src/assets/svgs/flecha';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '/src/hooks/useObserver';
import { RealsTopixel } from '/src/utils/lib';

export const Search = () => {


    const { theme } = useContext(ThemeConsumer);


    const display = clsx({ [style.display]: true, [style.dark]: theme !== 'light' })

    const RefRoot = React.useRef();

    return (

        <div >
            <SearchBar />

            <div ref={RefRoot} className={display}>


                <Display rootRef={RefRoot} />


            </div>
            <></>

            <Navbar />
        </div>
    )





}


const Display = ({ rootRef }) => {
    const [page, setPage] = useState(0)
    const Options = { variables: { page: 0, limit: 12 } }
    const { data, loading, fetchMore } = useQuery(getConten, Options);
    const extRef = React.useRef()
    //create a variable with screen height
    // const height = window.innerHeight;


    useIntersectionObserver(null, () => { setPage((page) => page + 1) }, loading ? null : extRef, 400)

    useEffect(() => {
        if (data && page === 0) {
            const numberOfvideo = data.GetAll.length
            const pageOfvideo = Math.ceil(numberOfvideo / 12)
            setPage(pageOfvideo)
        }
    }, [])


    useEffect(() => {
        if (page !== 0) {
            // console.log(extRef)
            // console.log("XD")
            fetchMore({ variables: { page } })
        }
    }, [page])







    if (loading) return <div>cargando</div>

    // fetchMore({ variables: { page: page + 2 } })




    const Content = data?.GetAll?.map(item => {

        //regex for .mp4   
        if (item.src.match(/\.mp4/g)) {
            return <ViewReals key={item._id} src={item.src} id={item._id} />
        }

        return <ViewPost key={item._id} id={item._id} src={item.src} />



    })



    return (

        <>
            {Content}

            <div ref={extRef}></div>
        </>


    )

}














const SearchBar = () => {
    const [name, setName] = useState('')
    //create a state if the bar is focus
    const [focus, setFocus] = useState(false)





    const { theme } = useContext(ThemeConsumer);




    const SeachBar = clsx({ [style.searchBar]: true, [style.dark]: theme !== 'light' })

    const inputSearch = clsx({ [style.inputSearch]: true, [style.moveBar]: focus === true })
    const recommended = clsx({ [style.Recommended]: true, [style.dark]: theme !== 'light', [style.null]: focus === false })
    const arrow = clsx({ [style.arrow]: true, [style.null]: focus === false })
    const searchImg = clsx({ [style.searchImg]: true, [style.move]: focus === true })

    return (
        <>
            <div className={SeachBar}>

                <Flecha onClick={() => { setFocus(false) }} width={30} className={arrow} height={30} />
                <Sea className={searchImg} />
                <input onClick={() => { setFocus(true) }} onInput={(e) => { setName(e.target.value) }} value={name} type='text' className={inputSearch} placeholder="buscar" />

            </div>



            <div className={recommended}>
                <Recommended name={name} />

            </div>

        </>

    )



}




const Recommended = ({ name }) => {

    const { data, loading } = useQuery(GetUsers, {
        variables: { name: name }

    });







    return (
        <>
            {name !== '' ? data?.GetUsers?.map(item => (
                <Link to={`/cuenta/${item.name}`} className={style.item} >
                    <p> {item.name} </p>
                </Link>


            )
            )
                : ''

            }

        </>
    )





}