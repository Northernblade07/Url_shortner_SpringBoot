import { motion } from "framer-motion";
import Sidebar from "../components/dashboard/SideBar";
import Topbar from "../components/dashboard/Topbar";
import UrlCard from "../components/UrlCard";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";


const MyUrlsPage = () => {

    const fetchUrl=async()=>{
        const res = await api.get("/api/url/myUrl")
        return res.data
    }
    const {data:urls , isLoading } = useQuery({
    queryKey:["urls"],
    queryFn:fetchUrl
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0b1e] to-black text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 space-y-6"
        >
          <h1 className="text-2xl font-semibold">My URLs</h1>

          {isLoading && <p className="text-gray-400">Loading URLs...</p>}

          <div className="grid gap-4">
            {urls?.map((url) => (
              <UrlCard   key={url.shortUrl} url={url} />
            ))}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default MyUrlsPage;
