
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
    const[history , sethistory] = useState([])
    const [message , setmessage] = useState("")
    const[loading , setloading] = useState(false)
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
        finally{
            setinitialloading(false)
        }
    }

    fetchchathistory();
} , [documentid] )


useEffect(()=>{
    scrolltobottom();

} , [history])

const handlesendmessage = async(e)=>{
    e.preventDefault()
    if(!message.trim()) return;
    const usermessage = {role:"user" , content:message , timestamp:new Date()}
    sethistory(prev=>[...prev , usermessage])
    setmessage("")
    setloading(true)
    try {
        const response = await aiservice.chat(documentid , usermessage.content)
        const assistantmessage = {
            role:'assistant',
            content:response.data.answer,
            timestamp:new Date(),
            relevantchunks:response.data.relevantchunks
}

sethistory(prev=>[...prev, assistantmessage])

    }
    
    
    catch (error) {
       console.log(" chat error:", error) 
       const errormessage ={
        role:"assistant",
        content:"Sorry , I encountered  an error .Please try again "
       }
       sethistory(prev=>[...prev , errormessage])
    }
    finally{
        setloading(false)
    }
}

const rendermessage =(msg , index)=>{
    const isuser = msg.role==="user" 
    return(
        <div key={index} className={`flex items-start gap-3 my-4 ${isuser ? "justify-end" :"justify-start"}`}>
            {!isuser && (
                <div className="w-9 h-9 rounded-xl bg-linear-to-br  from-primary-dark to-primary shadow-lg shadow-soft flex items-center justify-center shrink-0"><Sparkles className="w-4 h-4 text-white" strokeWidth={2}/></div>
            )}

            <div className={`max-w-lg p-4 rounded-xl shadow-sm ${isuser ? "bg-linear-to-br from-primary-dark to-primary text-white rounded-br-md" :"bg-white border border-slate-200/60 text-slate-800 rounded-bl-md"}`}>
            {isuser ? <p className="text-sm leading-relaxed">{msg.content}</p> :(<div className="prose prose-sm max-w-none prose-slate"><MarkdownRenderer content={msg.content}/></div>)}
            </div>

{isuser && (
    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-700 font-semibold text-sm shrink-0 shadow-sm">{user?.username?.charAt(0).toUpperCase() || "U"}</div>
)}


        </div>
    )
}

if(initialloading){
    return(
        <div className="flex flex-col h-[70vh] bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl items-center justify-center shadow-xl shadow-slate-200/50">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-primary-dark to-primary flex items-center justify-center mb-4"><MessageSquare className="text-white" strokeWidth={2}/></div>
            <Spinner className="h-7 text-primary-dark w-7"/>
            <p className="text-sm text-slate-500 mt-3 font-medium">Loading chat history...</p>
        </div>
    )
}


    return(
        <div className="flex flex-col h-[70vh] bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl items-center justify-center shadow-xl shadow-slate-200/50 overflow-hidden ">

   {/* Message area */}

   <div className="flex-1 w-full p-6 overflow-y-auto bg-linear-to-br from-slate-50/50 via-white/50 to-slate-50/50">{history.length===0 ? (
    <div className="flex  flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary-dark to-primary flex items-center justify-center mb-4 shadow-lg shadow-soft"><MessageSquare className="w-8 h-8 text-white"/></div>
        <h3 className="text-base font-semibold text-slate-900 mb-2">Start a conversation</h3>
        <p className="text-sm text-slate-500">Ask me anything about the document!</p>
    </div>
   ): (


history.map(rendermessage)

 )}
  <div ref={messageendref}></div>   {/* for scrolling from top to bottom  */} 


{/* for 3 dots while loading ... */}  
  {loading && (
    <div className="flex items-center gap-3 my-4">
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary-dark to-primary flex items-center justify-center shrink-0">
            <Sparkles  className="w-4 h-4 text-white"strokeWidth={2}/>
        </div>
        <div className="flex items-center gap-2 px-4  py-3 rounded-2xl rounded-b-md bg-white border border-slate-200/60">
            <div className="flexx gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay:"0ms"}}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay:"150ms"}}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay:"300ms"}}></span>
            </div>
        </div>
    </div>
  )}
   </div>
   

  {/* Input area */}
  <div className="p-5 border-t border-slate-200/60 bg-white/80 mx-auto w-full max-w-3xl">
    <form onSubmit={handlesendmessage} className="flex items-center gap-3">
        <input type="text" value={message} onChange={(e)=>setmessage(e.target.value)} placeholder="Ask a follow-up question..." className="flex-1 h-12 w-full px-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-primary-dark/50 focus:bg-white focus:shadow-lg focus:shadow-soft" disabled={loading}></input>
    <button type="submit" disabled={loading || !message.trim()} className="shrink-0 w-12 h-12 bg-linear-to-br from-primary-dark to-primary hover:from-primary hover:to-primary-dark text-white rounded-xl transition-all duration-200 shadow-lg shadow-soft disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center">
<Send className="w-5 h-5" strokeWidth={2}/>

    </button>
    </form>
  </div>



        </div>
    )
}
export default Chatinterface