import { BrowserRouter as Router , Routes , Route , Navigate } from "react-router-dom"
import Loginpage from "./pages/auth/Loginpage";
import Registerpage from "./pages/auth/Registerpage";
import Notfoundpage from "./pages/Notfoundpage";
const App=()=>{
  const isAuthenticated = false ; 
  const loading = false; 
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
    <Route path="*" element={<Notfoundpage/>}/>
  </Routes>
</Router>
  )
}
export default App