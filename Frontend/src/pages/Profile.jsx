import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Edit,
  Save,
  Award,
  Clock,
  Phone,
  MapPin,
  Shield,
  Calendar,
  BookOpen,
  ChevronUp,
  TrendingUp,
} from "lucide-react";
import { borrowingHistory, stats } from "../assets/Data/data.js";

const Profile = () => {
  const { user } = useAuth();
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [formData, setFormData] = useState({
    phone: "+1 (555) 123-4567",
    address: "123 Library St, Book City",
    memberSince: "Jan 2024",
    renewalDate: "Jan 2025",
    borrowingLimit: "5 Books",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleChange = async () => {
    const value = { name, email };
    const id = localStorage.getItem("id");
    const API = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${API}/api/user/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to update profile");
      } else {
        toast.success(data.message || "Profile updated successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  const handleSave = () => {
    HandleChange();
    setIsEditing(false);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const FetchData = async () => {
      try {
        const id = localStorage.getItem("id");
        const API = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API}/api/user/${id}`);
        const data = await res.json();
        const Data = data.result;
        if (!res.ok) {
          console.log(data.message);
        } else {
          setId(Data.id);
          setName(Data.name);
          setEmail(Data.email);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load profile data");
      }
    };
    FetchData();

    // Scroll event listener for Back to Top button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive grid columns based on screen size
  const getGridColumns = () => {
    if (window.innerWidth < 640) return "grid-cols-1";
    if (window.innerWidth < 1024) return "grid-cols-2";
    return "grid-cols-4";
  };

  return (
    <div className="min-h-screen px-3 pt-5 pb-6 sm:px-4 sm:pt-5 sm:pb-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Header - Optimized for mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="mb-2 text-2xl font-bold text-transparent sm:text-3xl md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            My Profile
          </h1>
          <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Manage your account and view your borrowing history
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 lg:flex-row sm:gap-6 lg:gap-8">
          {/* Main Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8"
          >
            {/* Profile Information Card */}
            <div className="p-4 bg-white shadow-sm sm:p-6 dark:bg-gray-800 rounded-xl sm:rounded-2xl sm:shadow-lg">
              <div className="flex flex-col items-start justify-between gap-3 mb-4 sm:flex-row sm:items-center sm:mb-6">
                <h2 className="text-lg font-bold sm:text-xl">
                  Personal Information
                </h2>
                <button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className="flex items-center justify-center sm:justify-start px-4 py-2 sm:py-2.5 w-full sm:w-auto space-x-2 text-white transition-all bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl hover:shadow-lg active:scale-95"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4" />
                      <span className="text-sm sm:text-base">Save Changes</span>
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      <span className="text-sm sm:text-base">Edit Profile</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Profile Header */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <div className="relative">
                    <div className="flex items-center justify-center w-20 h-20 text-2xl font-bold text-white sm:w-24 sm:h-24 sm:text-3xl rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500">
                      {name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="absolute w-6 h-6 bg-green-500 border-2 border-white rounded-full sm:w-8 sm:h-8 sm:border-4 dark:border-gray-800 -bottom-1 -right-1 sm:-bottom-2 sm:-right-2"></div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold sm:text-2xl">
                      {name || "User Name"}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-2 sm:justify-start">
                      <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                        {user?.role || "Member"}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ID: {user?.membership_id || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none sm:text-base bg-gray-50 dark:bg-gray-700 sm:rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center p-3 space-x-3 rounded-lg bg-gray-50 dark:bg-gray-700 sm:rounded-xl">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-sm sm:text-base">
                          {name || "Not provided"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none sm:text-base bg-gray-50 dark:bg-gray-700 sm:rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="flex items-center p-3 space-x-3 rounded-lg bg-gray-50 dark:bg-gray-700 sm:rounded-xl">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-sm truncate sm:text-base">
                          {email || "Not provided"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none sm:text-base bg-gray-50 dark:bg-gray-700 sm:rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center p-3 space-x-3 rounded-lg bg-gray-50 dark:bg-gray-700 sm:rounded-xl">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-sm sm:text-base">
                          {formData.phone}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none sm:text-base bg-gray-50 dark:bg-gray-700 sm:rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <div className="flex items-center p-3 space-x-3 rounded-lg bg-gray-50 dark:bg-gray-700 sm:rounded-xl">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-sm sm:text-base">
                          {formData.address}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Info - Only show on larger screens */}
                <div className="hidden grid-cols-1 gap-4 pt-4 border-t border-gray-200 md:grid sm:grid-cols-2 lg:grid-cols-3 dark:border-gray-700">
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Member Since
                        </p>
                        <p className="font-semibold">{formData.memberSince}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Borrowing Limit
                        </p>
                        <p className="font-semibold">
                          {formData.borrowingLimit}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Account Level
                        </p>
                        <p className="font-semibold">Gold Member</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Borrowing History */}
            <div className="p-4 bg-white shadow-sm sm:p-6 dark:bg-gray-800 rounded-xl sm:rounded-2xl sm:shadow-lg">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg font-bold sm:text-xl">
                  Borrowing History
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {borrowingHistory.length} books
                </span>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {borrowingHistory.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 transition-colors rounded-lg sm:p-4 sm:rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg sm:w-12 sm:h-12 sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                          <BookOpen className="w-5 h-5 text-white sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold truncate sm:text-base">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-600 truncate sm:text-sm dark:text-gray-400">
                            {item.author}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              Borrowed: {item.borrowed}
                            </span>
                            {item.status === "returned" ? (
                              <span className="text-xs text-green-600">
                                ✓ Returned
                              </span>
                            ) : (
                              <span className="text-xs text-yellow-600">
                                Due: {item.due}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm self-start sm:self-auto ${
                          item.status === "returned"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300"
                        }`}
                      >
                        {item.status === "returned" ? "Returned" : "Borrowed"}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {borrowingHistory.length > 4 && (
                  <button className="w-full py-3 text-sm font-medium text-blue-600 transition-colors rounded-lg dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    View All {borrowingHistory.length} Books
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-4 lg:w-96 sm:space-y-6"
          >
            {/* Reading Stats Card */}
            <div className="p-4 bg-white shadow-sm sm:p-6 dark:bg-gray-800 rounded-xl sm:rounded-2xl sm:shadow-lg">
              <h2 className="mb-4 text-lg font-bold sm:mb-6 sm:text-xl">
                Reading Stats
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-1 sm:gap-4">
                {[
                  {
                    label: "Total Books Borrowed",
                    value: stats.totalBorrowed,
                    icon: BookOpen,
                    color: "from-blue-500 to-cyan-500",
                    description: "All time",
                  },
                  {
                    label: "Currently Borrowed",
                    value: stats.currentlyBorrowed,
                    icon: Clock,
                    color: "from-purple-500 to-pink-500",
                    description: "Active",
                  },
                  {
                    label: "On-time Returns",
                    value: stats.onTimeReturns,
                    icon: Award,
                    color: "from-green-500 to-emerald-500",
                    description: "Perfect record",
                  },
                  {
                    label: "Favorite Genre",
                    value: stats.favoriteGenre,
                    icon: TrendingUp,
                    color: "from-orange-500 to-red-500",
                    description: "Most read",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 transition-colors rounded-lg cursor-pointer sm:p-4 sm:rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <stat.icon className="w-5 h-5 text-white sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 truncate sm:text-sm dark:text-gray-400">
                          {stat.label}
                        </p>
                        <p className="text-lg font-bold truncate sm:text-xl">
                          {stat.value}
                        </p>
                        {stat.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {stat.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Membership Status Card */}
            <div className="p-4 text-white shadow-sm sm:p-6 sm:shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl">
              <h2 className="mb-4 text-lg font-bold sm:mb-6 sm:text-xl">
                Membership Status
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base">Account Type</span>
                  <span className="font-semibold capitalize">
                    {user?.role || "Member"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base">Member Since</span>
                  <span className="font-semibold">{formData.memberSince}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base">Borrowing Limit</span>
                  <span className="font-semibold">
                    {formData.borrowingLimit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base">Renewal Date</span>
                  <span className="font-semibold">{formData.renewalDate}</span>
                </div>
              </div>

              {/* Progress Bar Section */}
              <div className="pt-4 mt-4 border-t sm:pt-6 sm:mt-6 border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm sm:text-base">Account Level</span>
                  <span className="font-bold">Gold Member</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/20">
                  <div className="w-3/4 h-2 bg-white rounded-full"></div>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-white/80">
                  75% progress to Platinum level
                </p>
              </div>

              {/* Upgrade Button */}
              <button className="w-full py-3 mt-4 text-sm font-medium text-white transition-colors rounded-lg sm:mt-6 sm:text-base bg-white/20 hover:bg-white/30 sm:rounded-xl backdrop-blur-sm">
                Upgrade to Platinum
              </button>
            </div>

            {/* Quick Actions - Only show on mobile */}
            <div className="p-4 bg-white shadow-sm lg:hidden dark:bg-gray-800 rounded-xl">
              <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 text-sm text-center text-blue-600 transition-colors rounded-lg bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                  View All Books
                </button>
                <button className="p-3 text-sm text-center text-purple-600 transition-colors rounded-lg bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30">
                  Borrow History
                </button>
                <button className="p-3 text-sm text-center text-green-600 transition-colors rounded-lg bg-green-50 dark:text-green-400 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30">
                  Renew Membership
                </button>
                <button className="p-3 text-sm text-center text-orange-600 transition-colors rounded-lg bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30">
                  Help & Support
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Stats - Only show on larger screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden mt-8 lg:block"
        >
          <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
            <h2 className="mb-6 text-xl font-bold">Monthly Reading Activity</h2>
            <div className="grid grid-cols-4 gap-6">
              <div className="p-4 text-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This Month
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  12
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  books read
                </p>
              </div>
              <div className="p-4 text-center rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/40">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avg. Reading Time
                </p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  2.5h
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  per day
                </p>
              </div>
              <div className="p-4 text-center rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/40">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Favorite Author
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  J.K. Rowling
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Most read
                </p>
              </div>
              <div className="p-4 text-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/40">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reading Streak
                </p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  42
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">days</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed z-40 p-3 text-white transition-all duration-300 rounded-full shadow-lg bottom-6 right-4 sm:bottom-8 sm:right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      )}
    </div>
  );
};

export default Profile;
