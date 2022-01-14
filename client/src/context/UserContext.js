import React,{useState} from 'react'


//create a context for the user state
 const context = React.createContext()

 //create a funtion that manges the user state
export     function UserProvider(props){

        const [user,setUser] = useState(undefined)

        return (
            <context.Provider value={{user,setUser}}>
                {props.children}
            </context.Provider>
        )
    }


    export default context