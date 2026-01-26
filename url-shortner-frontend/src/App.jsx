import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import  Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import useAuthStore from './store/AuthStore'
import DashboardPage from './pages/DashboardPage'
import MyUrlsPage from './pages/MyUrlsPage'

const App = () => {
  const isAuth = useAuthStore((state)=>state.isAuth);
  return (
    <div className='bg-black text-white'>
      <Navbar/>
    <Routes>
      <Route element={<LandingPage/>} path='/'/>
      <Route element={!isAuth?<LoginPage/>:<Navigate to={'/'}/>} path='/login'/>
      <Route element={!isAuth?<RegisterPage/>:<Navigate to={'/'}/>} path='/register'/>
      <Route element={isAuth?<DashboardPage/>:<Navigate to={'/'}/>} path='/dashboard'/>
      <Route element={isAuth?<MyUrlsPage/>:<Navigate to={'/'}/>} path='/myUrls'/>
    </Routes>

    </div>
  )
}

export default App