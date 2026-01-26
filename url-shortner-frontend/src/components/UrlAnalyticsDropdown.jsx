import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { useFetchUrlAnalytics } from "../hooks/useFetchUrlAnalytics";



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


const UrlAnalyticsDropdown = ({ shortUrl }) => {

  const [range, setRange] = useState(7);



const formatLocalDateTime = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};


  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - range);

    return {
      startDate: formatLocalDateTime(start),
  endDate: formatLocalDateTime(end),
    };
  }, [range]);

  const { data, isLoading } = useFetchUrlAnalytics({
    shortUrl,
    startDate,
    endDate,
    enabled: true,
  });

 const chartData = {
  labels: data?.map((d) => d.clickDate) ?? [],
  datasets: [
    {
      label: "Clicks",
      data: data?.map((d) => d.count) ?? [],
      borderColor: "#8b5cf6",
      backgroundColor: "rgba(139,92,246,0.25)",
      fill: true,
      tension: 0.4,
    },
  ],
};



  return (
    <div className="mt-4 bg-black/40 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="font-medium">Analytics</p>
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="bg-black/50 border border-white/30 rounded-md px-3 py-1 text-sm"
        >
          <option value={7}>7 days</option>
          <option value={30}>30 days</option>
          <option value={90}>90 days</option>
        </select>
      </div>

      {isLoading && <p className="text-gray-400">Loading analytics...</p>}

      {!isLoading && data?.length === 0 && (
        <p className="text-gray-500 text-sm">No clicks yet</p>
      )}

      {data?.length > 0 && data!=null && chartData.length!=0 && chartData!=null && (
        <div className="h-[200px]">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default UrlAnalyticsDropdown;
