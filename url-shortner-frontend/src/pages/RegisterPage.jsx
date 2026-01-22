import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import TextField from "../components/TextField";
import { useState } from "react";
import {Link} from "react-router-dom"
const RegisterPage = () => {

  const [loader,setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
    mode: "onTouched"
  });

  const registerHandler = async (data) => {
    // same logic
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
            Create Account
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Join the future of links 🚀
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handleSubmit(registerHandler)}
        >
          <TextField
            label="Username"
            id="username"
            type="text"
            placeholder="Choose a username"
            register={register}
            errors={errors}
            required
            message="Username is required"
          />

          <TextField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            register={register}
            errors={errors}
            required
            message="Email is required"
          />

          <TextField
            label="Password"
            id="password"
            type="password"
            placeholder="Create a strong password"
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
            type="submit"
          >
            {loader? "loading...":"Register"}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-8">
          Already have an account?{" "}
         <Link to={'/login'}>
          <span className="text-purple-400 hover:underline cursor-pointer">
            Login
          </span>
         </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
};

export default RegisterPage;
