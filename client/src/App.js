// import logo from './logo.svg';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from 'react-router-dom'

import { Resgistre, LoginIn } from './components/login'
import { Home } from './components/home'
import { Reals } from './components/reals'
import { Search } from './components/search'
import { Acccount } from './components/perfil'
import { Config } from './components/PerfilConfig'
import { PostCreate } from './components/PostCreates'

import * as React from 'react'
import { useState, useEffect } from 'react'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { VHistory } from './components/history/history'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
})

// recover host server from env
const host = process.env.REACT_APP_HOST
const client = new ApolloClient({
  // uri: 'http://192.168.1.105:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          GetReals: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            merge (existing = [], incoming) {
              return [...existing, ...incoming]
            }
          }
        }
      }
    }
  }),
  link: authLink.concat(createUploadLink({ uri: `http://${host}:5000/graphql` }))
})

const App = () => {
  const [Auth, setAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setAuth(true)
    }
  }, [])

  const Logia = () => {
    setAuth(true)
  }

  return (

<Router>

<Switch>

<Route path='/his/:id' >

<VHistory/>

</Route>

<Route path="/home">
  {Auth === true
    ? <Home/>
    : <Redirect to='login'/>}
</Route>

<Route path="/post/create" >
  <PostCreate/>

</Route>

<Route path="/cuenta">
<Acccount/>

</Route>

<Route path="/perfil">
<Config/>

</Route>

<Route path="/search">
  {
Auth === true
  ? <Search/>
  : <Redirect to='/'/>
}
</Route>

<Route path="/reals">
{Auth === true
  ? <Reals/>
  : <Redirect to='/'/>}

</Route>

<Route path="/register">
<Resgistre/>
</Route>

<Route path="/">
 <LoginIn BoolAuth={Auth} auth={Logia} />
</Route>
</Switch>

</Router>

  )
}

const SuperApp = () => {
  return (
<ApolloProvider client={client}>
<App />
</ApolloProvider>
  )
}

export default SuperApp
