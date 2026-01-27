import { Route, Routes , Navigate } from "react-router-dom";
import useAuthStore from "./store/AuthStore";
import ShortenUrlPage from "./pages/ShortenUrlPage";
import LandingPage from "./pages/LandingPage"
import Navbar from "./components/Navbar";
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'
import MyUrlsPage from './pages/MyUrlsPage'
import ErrorPage from "./pages/ErrorPage";
const AppRouter =()=>{
      const isAuth = useAuthStore((state)=>state.isAuth);

    return(
    <>
      <Navbar/>
    <Routes>
  <Route path="/" element={<LandingPage />} />

  <Route path="/login" element={!isAuth ? <LoginPage /> : <Navigate to="/" />} />
  <Route path="/register" element={!isAuth ? <RegisterPage /> : <Navigate to="/" />} />

  <Route path="/dashboard" element={isAuth ? <DashboardPage /> : <Navigate to="/" />} />
  <Route path="/myUrls" element={isAuth ? <MyUrlsPage /> : <Navigate to="/" />} />

  {/* 🔥 redirect handler */}
  <Route path="/:shortCode" element={<ShortenUrlPage />} />

  <Route path="/error" element={<ErrorPage message="Error" />} />
  <Route path="*" element={<ErrorPage message="We can't seem to find the page you're looking for" />} />
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