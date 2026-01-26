import { motion } from "framer-motion";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const fetchUrl=async()=>{
  const res = await api.get("api/url/myUrl");
  return res.data;
}
const UrlTable = () => {

  const {data:urls , isLoading } = useQuery({
    queryKey:["urls"],
    queryFn:fetchUrl
  })

 if(isLoading) return <div>Loading...</div>
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6"
    >
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Your Shortened URLs
      </h3>

      {/* Scroll container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[340px] text-sm">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="text-left py-2">Short</th>
              <th className="text-left py-2">Original</th>
              <th className="  text-right py-2">Clicks</th>
              <th className=" text-right py-2">Created</th>
            </tr>
          </thead>

          <tbody>
            {urls.map((url, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/5 transition flex-wrap"
              >
                <td className="py-3 text-purple-400 whitespace-nowrap">
               <Link to={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${url.shortUrl}`}
>
    {`${import.meta.env.VITE_REACT_SUBDOMAIN}/${url.shortUrl}`}
  </Link>
                </td>

                <td className="py-3 max-w-[240px] truncate">
                 <Link to={url.originalUrl}>
                  {url.originalUrl}
                 </Link>
                </td>

                <td className="py-3 text-center text-white">
                  {url.clickCount}
                </td>

                <td className="py-3 text-right text-gray-400">
                  {url.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UrlTable;
