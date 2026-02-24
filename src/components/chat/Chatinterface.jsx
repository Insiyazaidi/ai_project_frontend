
import {useState , useEffect , useRef} from "react"
import {Send , MessageSquare , Sparkles } from "lucide-react"
import { useParams } from "react-router"
import aiservice from "../../services/aiservice.js"
import { useAuth } from "../../context/Authcontext"
import Spinner from "../common/Spinner"
import MarkdownRenderer  from "../common/MarkdownRenderer"

const Chatinterface =()=>{
    const {id: documentid} = useParams()
    const {user} = useAuth()
    const[history , sethistory] = useState()
    const [message , setmessage] = useState()
    const[loading , setloading] = useState()
    const [initialloading , setinitialloading] = useState(true)
    const messageendref = useRef(null)

const scrolltobottom =()=>{
    messageendref.current?.scrollIntoView({behavior: "smooth"})
}

useEffect(()=>{
    const fetchchathistory = async()=>{
        try {
           setinitialloading(true) 
           const response = await aiservice.getchathistory(documentid)
           sethistory(response.data)
        } 
        catch (error) {
          console.log("failed to fetch out chat history:", error)
        }
    }

    fetchchathistory();
} )

    return(
        <div></div>
    )
}
export default Chatinterface