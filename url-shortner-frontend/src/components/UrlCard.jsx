import { useState } from "react";
import { motion } from "framer-motion";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import toast from "react-hot-toast";
import UrlAnalyticsDropdown from "./UrlAnalyticsDropdown";
import { ChevronsUpDown } from 'lucide-react';
import { Copy } from 'lucide-react';


const UrlCard = ({ url }) => {
  const [open, setOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url.shortUrl);
    toast.success("Copied to clipboard");
  };

  return (
    <motion.div
      layout
      className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3"
    >
      {/* URL info */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div>
          <p className="text-purple-400 font-semibold">{url.shortUrl}</p>
          <p className="text-gray-400 text-sm truncate max-w-md">
            {url.originalUrl}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Created: {url.createdAt}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-black/40 hover:bg-black/60"
          >
            <Copy />
          </button>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500"
          >
            <ChevronsUpDown />
          </button>
        </div>
      </div>

      {/* Analytics dropdown */}
      {open && <UrlAnalyticsDropdown shortUrl={url.shortUrl} />}
    </motion.div>
  );
};

export default UrlCard;
