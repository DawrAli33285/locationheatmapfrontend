import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router'
import Login from './login'
import ResetPassword from './resetpassword'
import Register from './register'
import PatientHeatMap from './patientmap'
function App() {
 return (
  <BrowserRouter>
  <Routes>
<Route path='/' element={<Login/>}/>
<Route path='/resetpassword' element={<ResetPassword/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/dashboard' element={<PatientHeatMap/>}/>
  </Routes>
  </BrowserRouter>
 )
}

export default App
