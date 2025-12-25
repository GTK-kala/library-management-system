import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  Zap,
  Mail,
  Lock,
  Users,
  EyeOff,
  Shield,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const Login = () => {
  const {
    email,
    loading,
    password,
    setEmail,
    setPassword,
    HandleSubmit,
    showPassword,
    setShowPassword,
  } = useAuth();

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
            Welcome back to your digital library. Access thousands of books and
            connect with fellow readers.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Quick Access
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instant access to your personalized dashboard
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Secure Login
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your account is protected with advanced security
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Community
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join discussions and book clubs with fellow readers
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            New to LibraFlow?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline hover:cursor-pointer"
            >
              Create an account
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
            Sign in to your account
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
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-300"
            >
              Sign in to continue your reading journey
            </motion.p>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-6 md:p-8">
            <form
              onSubmit={(e) => HandleSubmit(e)}
              className="space-y-4 sm:space-y-6"
            >
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-10 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-blue-600 sm:text-sm dark:text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-10 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 border border-gray-300 outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute transform -translate-y-1/2 right-3 sm:right-4 top-1/2"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Remember Me Checkbox */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <label
                    htmlFor="remember-me"
                    className="text-xs text-gray-700 sm:text-sm dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Shield className="w-3 h-3 mr-1" />
                  <span>Secure connection</span>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
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
                      Signing In...
                    </span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            {/* Alternative Login Options */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 space-y-4"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 text-gray-500 bg-white dark:bg-gray-800">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative mt-6 sm:mt-8"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 text-gray-500 bg-white dark:bg-gray-800">
                  Don't have an account?
                </span>
              </div>
            </motion.div>

            {/* Register Link - Only show on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-6 text-center lg:hidden"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full py-3 text-sm font-medium text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
              >
                <span>Create a new account</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Quick Info - Only show on mobile */}
            <div className="mt-6 space-y-4 lg:hidden">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Your login is secure and encrypted
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-purple-500" />
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Fast access to your personal library
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
          By signing in, you agree to our Terms and Privacy Policy.
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
            Library Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Active Readers
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                5,000+
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Books Available
              </span>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                10,000+
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Daily Logins
              </span>
              <span className="font-bold text-green-600 dark:text-green-400">
                1,200+
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Uptime</span>
              <span className="font-bold text-orange-600 dark:text-orange-400">
                99.9%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <p className="text-sm italic text-gray-600 dark:text-gray-300">
              "LibraFlow has transformed how I manage my reading. Everything is
              so well organized!"
            </p>
            <p className="mt-2 text-xs text-gray-500">
              — Emma Williams, Book Club President
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <p className="text-sm italic text-gray-600 dark:text-gray-300">
              "As a researcher, the search functionality saves me hours every
              week."
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

export default Login;
