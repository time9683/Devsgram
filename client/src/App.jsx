

//dependencias router y apollo
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

//contextos
import { ThemeProvider } from './context/themeContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import UserConsumer from './context/UserContext.jsx'
import themeConsumer from './context/themeContext.jsx'

//stylos globales
import './App.css'

//componentes

import { Resgistre, LoginIn } from './components/login/login'
import { Home } from './components/home/home'
import { Reals } from './components/reals/reals'
import { Search } from './components/search/search'
import { Acccount } from './components/perfil/perfil'
// import { Config } from './components/PerfilConfig'
import { PostCreate } from './components/postcreate/PostCreates'

import * as React from 'react'
import { useEffect, useContext } from 'react'


import { VisorHistory } from './components/history/history'
import { DisplayerPOSTS } from './components/post/Post'

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
const host = import.meta.env.VITE_APP_HOST;
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
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            }
          },
          GetAll: {

            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
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
  const { user, setUser } = useContext(UserConsumer)
  const { theme, toggleTheme } = useContext(themeConsumer)



  useEffect(() => {
    console.log(localStorage.getItem("theme"))
    if (localStorage.getItem('token') !== null) {
      setUser(localStorage.getItem('token'))
    }
    if (localStorage.getItem('theme') != null) {

      if (localStorage.getItem("theme") != 'light') {

        toggleTheme()

      }




    }


  }, [])


  useEffect(() => {

    if (theme != '') {


      localStorage.setItem('theme', theme)

    }




  }, [theme])







  return (

    <Router>

      <Switch>

        <Route path='/his/:id' >

          <VisorHistory />

        </Route>

        <Route path="/home">
          {user
            ? <Home />
            : <Redirect to='login' />}
        </Route>

        <Route path="/post/create" >
          <PostCreate />

        </Route>

        <Route path="/cuenta/:id">
          <Acccount />

        </Route>

        {/* <Route path="/perfil">
<Config/>

</Route> */}

        <Route path="/search">

          {user
            ? <Search />
            : <Redirect to='/' />
          }
        </Route>

        <Route path={"/posts/:id"}>

          <DisplayerPOSTS />
        </Route>


        <Route path="/reals/:id">
          {/* {user */}
          <Reals />
          {/* : <Redirect to='/'/>} */}

        </Route>


        <Route path="/reals">
          {user
            ? <Reals />
            : <Redirect to='/' />}

        </Route>






        <Route path="/register">
          <Resgistre />
        </Route>

        <Route path="/">
          <LoginIn />
        </Route>
      </Switch>

    </Router>

  )
}

const SuperApp = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ThemeProvider >
          <App />
        </ThemeProvider>
      </UserProvider>
    </ApolloProvider>
  )
}

export default SuperApp