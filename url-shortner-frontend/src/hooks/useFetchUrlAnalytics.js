import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useFetchUrlAnalytics = ({
  shortUrl,
  startDate,
  endDate,
  enabled,
}) => {
  return useQuery({
    queryKey: ["url-analytics", shortUrl, startDate, endDate],
    queryFn: async () => {
      const res = await api.get(
        `/api/url/analytics/${shortUrl}?startDate=${startDate}&endDate=${endDate}`
      );
      console.log(res,"analytics")
      return res.data;
    },
    enabled, // 🔥 important (lazy fetch)
    staleTime: 60 * 1000,
  });
};
