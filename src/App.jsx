import { BrowserRouter as Router , Routes , Route , Navigate } from "react-router-dom"

const App=()=>{
  const isAuthenticated = false ; 
  const loading = false 
  if(loading){
    return(
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  return(
<Router>
  <Routes>
    <Route path="/" element={isAuthenticated ? <Navigate to ="/dashboard" replace/> : <Navigate to="/login" replace/>}></Route>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes>
</Router>
  )
}
export default App