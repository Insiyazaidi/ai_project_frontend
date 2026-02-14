import { BrowserRouter as Router , Routes , Route , Navigate } from "react-router-dom"
import Loginpage from "./pages/auth/Loginpage.jsx";
import Registerpage from "./pages/auth/Registerpage.jsx";
import Notfoundpage from "./pages/Notfoundpage.jsx";
import Dashboardpage from "./pages/dashboard/Dashboardpage.jsx";
import Quiztakepage from "./pages/Quizzes/Quiztakepage.jsx";
import Quizresultpage from "./pages/Quizzes/Quizresultpage.jsx";
import Documentdetailpage from "./pages/Documents/Documentdetailpage.jsx";
import Documentlistpage from "./pages/Documents/Documentlistpage.jsx";
import Flashcardlistpage from "./pages/Flashcards/Flashcardlistpage.jsx";
import Flashcardpage from "./pages/Flashcards/Flashcardpage.jsx";
import Profilepage from "./pages/Profile/Profilepage.jsx";
import Protectedroute from "./components/auth/Protectedroute.jsx";
import { useAuth } from "./context/Authcontext.jsx";
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