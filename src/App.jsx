import { BrowserRouter as Router , Routes , Route , Navigate } from "react-router-dom"
import Loginpage from "./pages/auth/Loginpage";
import Registerpage from "./pages/auth/Registerpage";
import Notfoundpage from "./pages/Notfoundpage";
import Dashboardpage from "./pages/dashboard/Dashboardpage";
import Quiztakepage from "./pages/Quizzes/Quiztakepage";
import Quizresultpage from "./pages/Quizzes/Quizresultpage";
import Documentdetailpage from "./pages/Documents/Documentdetailpage";
import Documentlistpage from "./pages/Documents/Documentlistpage";
import Flashcardlistpage from "./pages/Flashcards/Flashcardlistpage";
import Flashcardpage from "./pages/Flashcards/Flashcardpage";
import Profilepage from "./pages/Profile/Profilepage";
import Protectedroute from "./components/auth/Protectedroute";
import { useAuth } from "./context/Authcontext";
const App=()=>{
const {isAuthenticated , loading} = useAuth()
  if(loading){
    return(
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }
  return(
<Router>
  <Routes>
    <Route path="/" element={isAuthenticated ? <Navigate to ="/dashboard" replace/> : <Navigate to="/login" replace/>}></Route>
    <Route path="/login" element={<Loginpage/>}/>
    <Route path="/register" element={<Registerpage/>}/>
   <Route element={<Protectedroute/>}/>
    <Route path="/dashboard" element={<Dashboardpage/>}/>
     <Route path="/documents/:id" element={<Documentdetailpage/>}/>
    <Route path="/documents" element={<Documentlistpage/>}/>
    <Route path="/flashcards" element={<Flashcardlistpage/>}/>
     <Route path="/documents/:id/flashcards" element={<Flashcardpage/>}/>
    <Route path="/quizzes/:quizId" element={<Quiztakepage/>}/>
    <Route path="/quizzes/:quizId/results" element={<Quizresultpage/>}/>
    <Route path="/profile" element={<Profilepage/>}/>
     <Route path="*" element={<Notfoundpage/>}/>
  </Routes>
</Router>
  )
}
export default App