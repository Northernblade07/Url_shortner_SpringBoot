import {motion} from "framer-motion";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/AuthStore";

const HeroSection = () => {

  const isAuth = useAuthStore((state)=>state.isAuth);
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
          Shorten Links.
          <span className="block bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            Expand Reach.
          </span>
        </h1>

        <p className="mt-6 text-gray-400 text-base sm:text-lg">
          A lightning-fast URL shortener with analytics, security, and modern design.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
         
         <Link to={isAuth?"/dashboard":"/login"}>
          <button className="px-8 py-4 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition">
            Get Started
          </button>
         </Link>
          <button className="px-8 py-4 border border-white/20 rounded-xl hover:bg-white/10 transition">
            Learn More
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
