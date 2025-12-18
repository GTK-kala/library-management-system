import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const value = { name, email, role, password };

    if (password.length < 5) {
      toast.error("password length is small");
    } else {
      try {
        const API = import.meta.env.VITE_API_URL;
        const url = `${API}/api/register`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen mt-20 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bg-blue-500 rounded-full top-20 left-10 w-72 h-72 mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bg-purple-500 rounded-full bottom-20 right-10 w-72 h-72 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="overflow-hidden border shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border-white/20 dark:border-gray-700/20">
          {/* Header */}
          <div className="relative p-3 pb-5 text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-gray-600 dark:text-gray-300"
            >
              Create your library account
            </motion.p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={(e) => HandleSubmit(e)} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-12 py-3 transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-12 py-3 transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </motion.div>

              {/* Role */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Account Type
                </label>
                <select
                  id="type"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="member">Member</option>
                  <option value="admin">Administrator</option>
                </select>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {role === "admin"
                    ? "Admin accounts can manage books and users"
                    : "Member accounts can borrow books and view their history"}
                </p>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                  <input
                    id="password"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-12 py-3 transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a password (min. 6 characters)"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(true)}
                    className="absolute transform -translate-y-1/2 right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-3 text-white animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="relative mt-8"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white dark:bg-gray-800">
                  Already have an account?
                </span>
              </div>
            </motion.div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-6 text-center"
            >
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 font-medium text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
              >
                <span>Sign in to your account</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
