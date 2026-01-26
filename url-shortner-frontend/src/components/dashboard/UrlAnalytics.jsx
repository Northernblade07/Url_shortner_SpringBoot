import { Line } from "react-chartjs-2";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useFetchTotalClicks } from "../../hooks/useQuery";
import toast from "react-hot-toast";

const options = {
  responsive: true,
  maintainAspectRatio:true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
};


const UrlAnalytics = () => {
  const [range, setRange] = useState("7");

  // derive dates based on range
  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - Number(range));

    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  }, [range]);

  const { data, isLoading} = useFetchTotalClicks({
    startDate,
    endDate,
    onError: () => toast.error("Failed to load analytics"),
  });

  const chartData = useMemo(() => {
    if (!data) return null;

    return {
      labels: data.map((d) => d.clickDate),
      datasets: [
        {
          label: "Clicks",
          data: data.map((d) => d.count),
          borderColor: "#8b5cf6",
          backgroundColor: "rgba(139,92,246,0.25)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [data]);

  const isEmpty = !data || data.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl pt-4 sm:p-6 flex flex-col justify-center"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base sm:text-lg font-semibold">
          Click Analytics
        </h3>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="w-full sm:w-auto bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Chart */}
   {isEmpty && (
  <div className="absolute flex flex-col justify-center items-center w-full text-center">
    <h1 className="text-slate-600 font-serif text-xl sm:text-2xl font-bold">
      No data for this time period
    </h1>
    <p className="text-slate-700 sm:text-lg text-sm mt-2 max-w-md">
      Share your short link to start seeing engagement analytics
    </p>
  </div>
)}  
      <div className="mt-4 h-[220px] sm:h-[260px] md:h-[300px] sm:w-full w-[400px]">
        {isLoading && <p className="text-gray-400">Loading chart...</p>}
        {/* {error && <p className="text-red-400">Failed to load chart</p>} */}
{!isEmpty && <Line data={chartData} options={options}/>}
      </div>
    </motion.div>
  );
};

export default UrlAnalytics;
