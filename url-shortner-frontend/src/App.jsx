import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import  Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const App = () => {
  return (
    <div className='bg-black text-white'>
      <Navbar/>
    <Routes>
      <Route element={<LandingPage/>} path='/'/>
      <Route element={<LoginPage/>} path='/login'/>
      <Route element={<RegisterPage/>} path='/register'/>
    </Routes>

    </div>
  )
}

export default App