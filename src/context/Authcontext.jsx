import React , {createContext , useContext , useState , useEffect} from "react"

const Authcontext = createContext(); // container that store all user and authentication related info ... 

export const useAuth = ()=>{ // custom hook that gives access to authentication related data stored in authcontext ... 
    const context = useContext(Authcontext)
    if(!context){
        throw  new Error( "useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = (props)=>{
    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)
    const [isAuthenticated ,setIsAuthenticated ] = useState(false)
    useEffect(()=>{
        checkAuthStatus();
    } , [])
    const checkAuthStatus = async()=>{
        try {
            const token = localStorage.getItem("token")
            const userstr = localStorage.getItem("user") // string 
            if(token && userstr){
                const userdata = JSON.parse(userstr);
                setUser(userdata)
                setIsAuthenticated(true)
            }
        } 
        catch (error) {
            console.error("Auth check failed", error)
            logout();           
        } 
         finally{  // this will run no matter try chlega ya catch .. 
                setLoading(false)
            }
    }
    const login =(userdata , token)=>{
        localStorage.setItem("token" , token)
        localStorage.setItem("user" , JSON.stringify(userdata))
        setUser(userdata)
        setIsAuthenticated(true)
    }

    const logout=()=>{
        localStorage.removeItem("token" )
        localStorage.removeItem("user")
        setUser(null)
        setIsAuthenticated(false)
        window.location.href  = "/" // go to home page 
    }
const updateuser = (updateduserdata)=>{
const newuserdata = {...user , ...updateduserdata}
localStorage.setItem("user" , JSON.stringify(newuserdata))
setUser(newuserdata)
}

    const value = {login , logout , updateuser, user , isAuthenticated , loading, checkAuthStatus}
return(
   <Authcontext.Provider value = {value}>
     {props.children}
   </Authcontext.Provider> 
)
}