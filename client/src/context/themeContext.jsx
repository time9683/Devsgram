import React,{ createContext,useState } from "react"


const context = createContext({})

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <context.Provider value={{theme, toggleTheme}}>
      {children}
    </context.Provider>
  )





}











export default context