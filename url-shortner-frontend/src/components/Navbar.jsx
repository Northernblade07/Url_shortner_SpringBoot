import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to={'/'}>
                    <div className="text-xl font-bold tracking-wide">
                        <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                            Shorty
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
                    <a to="#features" className="hover:text-white transition">Features</a>
                    <a href="#how" className="hover:text-white transition">How it works</a>
                    <a href="#stats" className="hover:text-white transition">Stats</a>
                    <Link to={'/login'}>
                        <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
                            Login
                        </button>
                    </Link>

                    <Link to={'/register'}>
                        <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
                            Register
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-black/90 backdrop-blur px-6 py-6 space-y-6 flex flex-col"
                    >
                        <a href="#features" onClick={() => setOpen(false)} className="block">
                            Features
                        </a>
                        <a href="#how" onClick={() => setOpen(false)} className="block">
                            How it works
                        </a>
                        <a href="#stats" onClick={() => setOpen(false)} className="block">
                            Stats
                        </a>

                        <div className="flex gap-2 items-center justify-start">

                        <Link to={'/login'}>
                            <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
                                Login
                            </button>
                        </Link>

                        <Link to={'/register'}>
                            <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
                                Register
                            </button>
                        </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
