import { motion } from "framer-motion";
import Sidebar from "../components/dashboard/SideBar";
import UrlAnalytics from "../components/dashboard/UrlAnalytics";
import UrlTable from "../components/dashboard/UrlTable";
import ShortenPopup from "../components/dashboard/ShortenPopup";
import TopBar from "../components/dashboard/TopBar";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0b1e] to-black text-white flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopBar />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 space-y-8"
        >
          <UrlAnalytics />

                      <ShortenPopup></ShortenPopup> 
                    
          <UrlTable />
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardPage;
