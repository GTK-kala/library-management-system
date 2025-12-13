import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { user, Logout } = useAuth();
  const [Data, setData] = useState([]);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setInterval(() => {
      const id = localStorage.getItem("id");
      const FetchData = async () => {
        try {
          const url = `http://localhost:3001/api/user/${id}`;
          const res = await fetch(url);
          const data = await res.json();
          const Data = data.result;
          if (res.ok) {
            setData(Data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      FetchData();
    }, 100);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/books", label: "Books", icon: BookOpen },
    { path: "/profile", label: "Profile", icon: User },
    ...(user?.role === "admin"
      ? [{ path: "/admin", label: "Admin", icon: Settings }]
      : []),
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-lg dark:shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="absolute rounded-lg -inset-1 bg-gradient-to-r from-primary-500 to-blue-500 blur opacity-30 animate-pulse-slow"></div>
                <div className="relative p-3 rounded-lg bg-gradient-to-r from-primary-600 to-blue-500">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold gradient-text">
                LibraFlow
              </span>
            </motion.div>

            {/* Desktop Navigation */}
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
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                          : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-surface"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 w-1/2 h-1 transform -translate-x-1/2 rounded-full left-1/2"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 transition-colors bg-gray-100 rounded-full dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-card"
              >
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 transition-colors bg-gray-100 rounded-full dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-card"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-1 -right-1 dark:border-dark-bg"></span>
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 transition-colors bg-gray-100 rounded-full dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-card"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>

              {/* User Menu */}
              {user && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <button className="flex items-center p-2 space-x-3 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface">
                    <div className="relative">
                      <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-r from-primary-500 to-blue-500">
                        {Data.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full -bottom-1 -right-1 dark:border-dark-bg"></div>
                    </div>
                    <div className="hidden text-left lg:block">
                      <p className="font-semibold">{Data.name}</p>
                      <p className="text-sm text-gray-500 capitalize dark:text-gray-400">
                        {Data.role}
                      </p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 invisible w-48 mt-2 transition-all duration-300 opacity-0 top-full group-hover:opacity-100 group-hover:visible">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2 card"
                    >
                      <Link
                        to="/profile"
                        className="flex items-center p-3 space-x-3 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface"
                      >
                        <User className="w-5 h-5" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={() => Logout()}
                        className="flex items-center w-full p-3 space-x-3 text-red-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface dark:text-red-400"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-gray-100 rounded-lg md:hidden dark:bg-dark-surface"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed z-40 overflow-hidden md:hidden top-20 left-4 right-4 card"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                      : "hover:bg-gray-100 dark:hover:bg-dark-surface"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
