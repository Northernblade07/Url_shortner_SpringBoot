import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import TextField from "../components/TextField";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      password: ""
    },
    mode: "onTouched"
  });

  const loginHandler = async (data) => {
    // same logic (API call, token storage, etc.)
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          w-full max-w-md
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl
          p-8 sm:p-10
          shadow-[0_0_40px_rgba(168,85,247,0.15)]
        "
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-wide">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Sign in to continue ⚡
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handleSubmit(loginHandler)}
        >
          <TextField
            label="Username"
            id="username"
            type="text"
            placeholder="Enter your username"
            register={register}
            errors={errors}
            required
            message="Username is required"
          />

          <TextField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            register={register}
            errors={errors}
            required
          />

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            className="
              w-full py-3 rounded-lg
              bg-gradient-to-r from-purple-500 to-cyan-500
              text-black font-semibold tracking-wide
              shadow-lg shadow-purple-500/30
              transition-all
            "
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-8">
          Don’t have an account?{" "}
         <Link to={'/register'}>
          <span className="text-purple-400 hover:underline cursor-pointer">
            Register
          </span>
         </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
};

export default LoginPage;
