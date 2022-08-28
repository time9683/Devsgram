import React, { useState } from 'react'
import {  useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'

import Flechita from '/src/assets/svgs/flecha'
import Check from '/src/assets/svgs/check'
import  style from './PostCreate.module.css'
import { submitFile } from '/src/querys'



export const PostCreate = () => {
  const [archive, SetArchive] = useState()
  const [description, setText] = useState('')
  const [tipe, setTipe] = useState('')
  let renderizar       
  const [sendA, { err, loading, data }] = useMutation(submitFile)

  let result

  if (loading) {
    result = <p style={{ color: 'white' }}>subiendo</p>
  }

  if (err) {
    result = <p style={{ color: 'white' }}>error</p>
  }

  if (data) {
    console.log(data.sendFile.status)

    result = <p style={{ color: 'white' }}>{data.sendFile.status}</p>
  }

  if (archive) {
    const UrlsImg = URL.createObjectURL(archive)

    if (archive.type === 'image/jpeg') {
      renderizar = <img src={UrlsImg} alt="Archive"  className={style.preview} />
    } else {
      renderizar = <video src={UrlsImg} alt="Archive" className={style.preview}/>
    }
  } else {
    renderizar = <label htmlFor="archive" className={style.btnArchive}>subir</label>
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(archive)
    alert('sonido')
    // alert(JSON.stringify(data));
    sendA({ variables: { file: archive, text: description, tipe: tipe } })
  }

  return (

    <div  className={style.container}>

      <div className={style.createTopBar}>
        <div className={style.leftTopBar}>
          <Link to='/home'><Flechita   className={style.Cflechita}/></Link>

          <h2>Nueva publicacion</h2>
        </div>

      </div>

      <div>
        <form name="caca" id='caca' onSubmit={onSubmit}>

          <div className={style.formCreates}>
          <button type='submit' className={style.btnTransparent}><Check  width={30} height={50} /></button>
          {renderizar}

          <input type='file' style={{ display: 'none' }} name='archive' id='archive' onChange={(e) => { SetArchive(e.target.files[0]) }}></input>

          <input type='text' className={style.textDescription} onChange={(e) => { setText(e.target.value) }} value={description} placeholder="escribe un pie de foto" />
            </div>
               <div className={style.formTipes}>
          <span>Reals</span><input type="radio" name="tipe" onClick={() => setTipe('Reals')} />
          <span>Post</span> <input type="radio" name="tipe" onClick={() => setTipe('Post')}/>
          <span>History</span><input type="radio" name="tipe" onClick={() => setTipe('History')}/>
              </div>
        </form>

      </div>

      {result}

    </div>

  )
}
