import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const ErrorPage = ({
  code = "404",
  title = "Page Not Found",
  message = "The page you’re looking for doesn’t exist or was moved.",
  actionLabel = "Go Home",
  actionPath = "/",
}) => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          w-full max-w-md
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl
          p-10
          shadow-[0_0_40px_rgba(168,85,247,0.15)]
          text-center
        "
      >
        {/* Error Code */}
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          {code}
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mt-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="
              px-5 py-2.5 rounded-lg
              border border-white/20
              text-gray-300 text-sm
              hover:bg-white/10
              transition
            "
          >
            Go Back
          </motion.button>

          <Link to={actionPath}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-5 py-2.5 rounded-lg
                bg-gradient-to-r from-purple-500 to-cyan-500
                text-black font-semibold text-sm
                shadow-lg shadow-purple-500/30
              "
            >
              {actionLabel}
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default ErrorPage;
