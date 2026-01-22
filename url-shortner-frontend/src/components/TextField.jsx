import React from "react";

const TextField = ({
  label,
  id,
  type = "text",
  errors,
  register,
  required = false,
  message,
  className = "",
  min,
  placeholder
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className={`font-semibold text-md text-white ${className}`}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`
          px-4 py-3 rounded-lg bg-black/40 text-white
          border outline-none
          ${errors[id] ? "border-red-500" : "border-white/10"}
          focus:ring-2 focus:ring-cyan-500
        `}
        {...register(id, {
          required: required ? message || "This field is required" : false,
          minLength: min
            ? { value: min, message: `Minimum ${min} characters required` }
            : undefined,
          pattern:
            type === "email"
              ? {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address"
                }
              : type === "url"
              ? {
                  value:
                    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                  message: "Please enter a valid URL"
                }
              : undefined
        })}
      />

      {errors[id] && (
        <p className="text-sm font-medium text-red-400">
          {errors[id].message}
        </p>
      )}
    </div>
  );
};

export default TextField;
