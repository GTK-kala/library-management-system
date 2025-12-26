import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  X,
  Sun,
  Bell,
  Home,
  Moon,
  User,
  Menu,
  LogOut,
  Search,
  Settings,
  BookOpen,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const { user, Logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/books", label: "Books", icon: BookOpen },
    { path: "/profile", label: "Profile", icon: User },
    ...(user?.role === "admin"
      ? [{ path: "/admin", label: "Admin", icon: Settings }]
      : []),
  ];

  const handleLogout = () => {
    Logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg dark:shadow-xl"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        <div className="container px-3 py-3 mx-auto sm:px-4">
          <div className="flex items-center justify-between">
            {/* Logo - Responsive */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 hover:cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <div className="relative">
                <div className="absolute rounded-md -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 blur opacity-30"></div>
                <div className="relative p-2 rounded-md sm:p-3 bg-gradient-to-r from-blue-600 to-purple-600">
                  <BookOpen className="w-4 h-4 text-white sm:w-6 sm:h-6" />
                </div>
              </div>
              <span className="text-lg font-bold text-transparent sm:text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                LibraFlow
              </span>
            </motion.div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="items-center hidden space-x-1 md:flex">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Button - Hidden on mobile if space is tight */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden p-2 transition-colors bg-gray-100 rounded-full sm:block dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-gray-600 sm:w-5 sm:h-5 dark:text-gray-300" />
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 transition-colors bg-gray-100 rounded-full dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 text-gray-600 sm:w-5 sm:h-5 dark:text-gray-300" />
                <span className="absolute w-2 h-2 bg-red-500 border border-white rounded-full top-1.5 right-1.5 dark:border-gray-900"></span>
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 transition-colors bg-gray-100 rounded-full dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-yellow-500 sm:w-5 sm:h-5" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-600 sm:w-5 sm:h-5" />
                )}
              </motion.button>

              {/* User Menu */}
              {user && (
                <div className="relative" ref={userMenuRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center p-1 space-x-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="User menu"
                  >
                    <div className="relative">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 sm:text-base">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute w-2 h-2 bg-green-500 border border-white rounded-full -bottom-0.5 -right-0.5 dark:border-gray-900"></div>
                    </div>
                    {/* Hide user details on small screens */}
                    <div className="hidden text-left sm:block">
                      <p className="text-sm font-semibold truncate max-w-[120px]">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize dark:text-gray-400">
                        {user.role}
                      </p>
                    </div>
                    <ChevronDown className="hidden w-4 h-4 text-gray-500 sm:block" />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 w-48 mt-2 overflow-hidden origin-top-right bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-xl dark:shadow-2xl dark:border-gray-700"
                      >
                        <div className="p-2">
                          <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                            <p className="font-semibold text-gray-900 truncate dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-500 capitalize dark:text-gray-400">
                              {user.role}
                            </p>
                          </div>
                          <Link
                            to="/profile"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center p-3 space-x-3 text-gray-700 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-sm">Profile</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full p-3 space-x-3 text-sm text-red-600 transition-colors rounded-lg hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-gray-100 rounded-lg md:hidden dark:bg-gray-800"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 z-50 w-full h-full max-w-sm overflow-y-auto bg-white shadow-2xl dark:bg-gray-900 md:hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                        LibraFlow
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Welcome, {user?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 bg-gray-100 rounded-lg dark:bg-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Info */}
                <div className="p-4 mb-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-600 capitalize dark:text-gray-400">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="mb-8 space-y-1">
                  <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                    Navigation
                  </p>
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <div className="w-2 h-2 ml-auto bg-blue-600 rounded-full dark:bg-blue-400"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="mb-8 space-y-1">
                  <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                    Quick Actions
                  </p>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      // Add search functionality
                    }}
                    className="flex items-center w-full p-3 space-x-3 text-left text-gray-700 transition-colors rounded-xl dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Search className="w-5 h-5" />
                    <span className="font-medium">Search Books</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      toggleDarkMode();
                    }}
                    className="flex items-center w-full p-3 space-x-3 text-left text-gray-700 transition-colors rounded-xl dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                    <span className="font-medium">
                      {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </span>
                  </button>
                </div>

                {/* Logout Button */}
                <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full p-3 space-x-3 text-red-600 transition-colors bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                  <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
                    v1.0.0 • {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add padding to prevent content from being hidden under fixed navbar */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
};

export default Navbar;
