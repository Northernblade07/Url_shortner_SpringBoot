import { Route, Routes , Navigate } from "react-router-dom";
import useAuthStore from "./store/AuthStore";
import ShortenUrlPage from "./pages/ShortenUrlPage";
import LandingPage from "./pages/LandingPage"
import Navbar from "./components/Navbar";
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'
import MyUrlsPage from './pages/MyUrlsPage'
const AppRouter =()=>{
      const isAuth = useAuthStore((state)=>state.isAuth);

    return(
    <>
      <Navbar/>
    <Routes>
      <Route element={<LandingPage/>} path='/'/>
      <Route element={!isAuth?<LoginPage/>:<Navigate to={'/'}/>} path='/login'/>
      <Route element={!isAuth?<RegisterPage/>:<Navigate to={'/'}/>} path='/register'/>
      <Route element={isAuth?<DashboardPage/>:<Navigate to={'/'}/>} path='/dashboard'/>
      <Route element={isAuth?<MyUrlsPage/>:<Navigate to={'/'}/>} path='/myUrls'/>
    </Routes>

    </>
    )
}

export default AppRouter

export const SubDomainRouter = ()=>{
    return (
        <Routes>
            <Route element={<ShortenUrlPage/>} path="/:url"/>
        </Routes>
    )
}