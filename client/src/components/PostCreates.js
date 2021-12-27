import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'

import flechita from './flecha.svg'
import check from './check.svg'
import './PostCreate.css'

const submitFile = gql`
mutation fileSubmit($file:Upload,$text:String,$tipe:String) {


  sendFile(file:$file,text:$text,tipe:$tipe) {

  status


  }

}`

export const PostCreate = () => {
  const [archive, SetArchive] = useState()
  const [description, setText] = useState('')
  const [tipe, setTipe] = useState('')
  let renderizar
  // const { register, handleSubmit } = useForm();

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
      renderizar = <img src={UrlsImg} alt="Archive" style={{ width: '60px', height: '60px', marginLeft: '10px' }} />
    } else {
      renderizar = <video src={UrlsImg} alt="Archive" style={{ width: '60px', height: '60px', marginLeft: '10px' }} />
    }
  } else {
    renderizar = <label htmlFor="archive" className='btn-archive'>subir</label>
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(archive)
    alert('sonido')
    // alert(JSON.stringify(data));
    sendA({ variables: { file: archive, text: description, tipe: tipe } })
  }

  return (

    <div style={{ backgroundColor: 'black', width: '100%', height: '100vh' }}>

      <div className="create-topBar">
        <div className='left-topBar'>
          <Link to='/home'><img src={flechita} className='Cflechita'></img></Link>

          <h2>Nueva publicacion</h2>
        </div>

      </div>

      <div>
        <form name="caca" id='caca' onSubmit={onSubmit}>

          <div className='form_creates'>
          <button type='submit' style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none' }}><img src={check}></img></button>
          {renderizar}

          <input type='file' style={{ display: 'none' }} name='archive' id='archive' onChange={(e) => { SetArchive(e.target.files[0]) }}></input>

          <input type='text' className='text-description' onChange={(e) => { setText(e.target.value) }} value={description} placeholder="escribe un pie de foto" />
            </div>
               <div className='form_tipes'>
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
