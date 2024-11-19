import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import { Toaster } from 'react-hot-toast'
import Dashboard from './Pages/Dashboard/Dashboard'



function App() {
  return (
    <div>
       <BrowserRouter>
       <Routes>
         <Route path='/' element ={<Login/>}/>
         <Route path='/dashboard' element ={<Dashboard/>}/>
       </Routes>
       <Toaster/>

       </BrowserRouter>

  
    </div>
  )
}

export default App