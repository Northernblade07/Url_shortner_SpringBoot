import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import toast from "react-hot-toast";

export const useFetchTotalClicks = ({ startDate, endDate, onError }) => {
  return useQuery({
    queryKey: ["url-total-clicks", startDate, endDate],
    queryFn: async () => {
      try {
      const res = await api.get(
        `/api/url/analytics/totalClicks?startDate=${startDate}&endDate=${endDate}`
      );
      console.log(res)
      return res.data;  
      } catch (error) {
        console.log(error);
        toast.error("dashboard data fetching failed")
      }
      
    },
    select: (data) => {
      // data = { "2024-01-01": 120, "2024-01-02": 95 }
      return Object.entries(data).map(([clickDate, count]) => ({
        clickDate,
        count,
      }));
    },
    staleTime: 5 * 1000,
    onError,
  });
};
