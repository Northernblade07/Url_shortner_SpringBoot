import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex-col p-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-10">
        Shortify
      </h1>

      <nav className="space-y-2">
        {[
          { label: "Dashboard", path: "/dashboard" },
          { label: "My URLs", path: "/myUrls" },
        ].map(({ label, path }) => (
          <NavLink key={path} to={path}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 6 }}
                className={`px-4 py-2 rounded-lg transition cursor-pointer
                  ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
              >
                {label}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
