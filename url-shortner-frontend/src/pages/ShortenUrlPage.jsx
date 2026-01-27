import { useEffect } from "react";
import { useParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ShortenUrlPage = () => {
  const { shortCode } = useParams();

  useEffect(() => {
    // 🔥 Let the browser handle redirect logic
    window.location.href = `${BACKEND_URL}/${shortCode}`;
  }, [shortCode]);

  return null; // no UI needed
};

export default ShortenUrlPage;
