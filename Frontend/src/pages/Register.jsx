import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  BookOpen,
  Shield,
  ArrowRight,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate terms
    if (!acceptedTerms) {
      toast.error("Please accept the terms and conditions");
      setLoading(false);
      return;
    }

    const value = { name, email, role, password };

    try {
      const API = import.meta.env.VITE_API_URL;
      const url_site = `https://library-management-system-production-27d8.up.railway.app/api/register`;
      const url_local = `http://localhost:3001/api/register`;
      const res = await fetch(url_site, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Registration failed");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setName("");
      setEmail("");
      setPassword("");
      setRole("member");
      setLoading(false);
      setConfirmPassword("");
      setAcceptedTerms(false);
      setConfirmPassword(false);
      setShowConfirmPassword(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-3 py-8 sm:px-4 sm:py-12 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-40 h-40 bg-blue-500 rounded-full top-10 left-5 sm:top-20 sm:left-10 sm:w-72 sm:h-72 mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute w-40 h-40 bg-purple-500 rounded-full bottom-10 right-5 sm:bottom-20 sm:right-10 sm:w-72 sm:h-72 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 top-1/2 left-1/2 sm:w-64 sm:h-64 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Side - Features (Hidden on mobile, shown on larger screens) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-col justify-center hidden w-1/3 max-w-md pr-8 space-y-8 lg:flex"
      >
        <div>
          <div className="flex items-center mb-4 space-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              LibraFlow
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Join thousands of readers managing their digital library with ease.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Digital Collection
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access thousands of books anytime, anywhere
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Secure Platform
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your data is protected with enterprise-grade security
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Community
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect with fellow readers and book clubs
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline hover:cursor-pointer"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Main Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg lg:max-w-md"
      >
        {/* Mobile Header */}
        <div className="mb-6 text-center lg:hidden">
          <div className="flex items-center justify-center mb-4 space-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              LibraFlow
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Join our community of readers
          </p>
        </div>

        <div className="overflow-hidden border shadow-lg sm:shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-white/20 dark:border-gray-700/20">
          {/* Header */}
          <div className="relative p-4 pb-5 text-center sm:p-5 sm:pb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white"
            >
              Create Account
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-300"
            >
              Start your reading journey today
            </motion.p>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-6 md:p-8">
            <form
              onSubmit={(e) => HandleSubmit(e)}
              className="space-y-4 sm:space-y-5"
            >
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="name"
                  className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-10 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-10 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Account Type
                </label>
                <div className="relative">
                  <select
                    id="type"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
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
                  className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                  <input
                    id="password"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-10 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a password (min. 6 characters)"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute transform -translate-y-1/2 right-3 sm:right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center mt-1.5 space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      password.length >= 6 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-xs text-gray-500">
                    At least 6 characters
                  </span>
                </div>
              </motion.div>

              {/* Confirm Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 }}
              >
                <label
                  htmlFor="confirmPassword"
                  className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                  <input
                    id="confirmPassword"
                    value={confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-10 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute transform -translate-y-1/2 right-3 sm:right-4 top-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    Passwords do not match
                  </p>
                )}
              </motion.div>

              {/* Terms and Conditions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-start space-x-3"
              >
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-700 sm:text-sm dark:text-gray-300"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="relative mt-6 sm:mt-8"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 text-gray-500 bg-white dark:bg-gray-800">
                  Already have an account?
                </span>
              </div>
            </motion.div>

            {/* Login Link - Only show on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-6 text-center lg:hidden"
            >
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full py-3 text-sm font-medium text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
              >
                <span>Sign in to your account</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Quick Info - Only show on mobile */}
            <div className="mt-6 space-y-4 lg:hidden">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Your information is securely encrypted
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Get instant access to 10,000+ books
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
          By creating an account, you agree to our Terms and Privacy Policy.
        </p>
      </motion.div>

      {/* Right Side - Stats (Hidden on mobile, shown on larger screens) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-col justify-center hidden w-1/3 max-w-md pl-8 space-y-8 xl:flex"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Why Join Us?
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Books Available
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                10,000+
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Active Readers
              </span>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                5,000+
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Satisfaction Rate
              </span>
              <span className="font-bold text-green-600 dark:text-green-400">
                98%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                24/7 Access
              </span>
              <span className="font-bold text-orange-600 dark:text-orange-400">
                Always
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <p className="text-sm italic text-gray-600 dark:text-gray-300">
              "The best library management system I've used. Seamless and
              intuitive!"
            </p>
            <p className="mt-2 text-xs text-gray-500">
              — Sarah Johnson, Member since 2023
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <p className="text-sm italic text-gray-600 dark:text-gray-300">
              "Finding books has never been easier. Highly recommended!"
            </p>
            <p className="mt-2 text-xs text-gray-500">
              — Michael Chen, Research Scholar
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
