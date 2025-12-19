import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  BookOpen,
  BarChart3,
  Download,
  Filter,
  PieChart as PieChartIcon,
  Eye,
  Edit,
  CheckCircle,
} from "lucide-react";
import {
  Books,
  monthlyData,
  genreDistribution,
  statusData,
  activity,
  quickActions,
  statCard,
} from "../assets/Data/data";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDashboard = () => {
  const popularBooks = Books;
  const recentActivities = activity;
  const [loading, setLoading] = useState(true);

  const getActivityIcon = (type) => {
    switch (type) {
      case "borrow":
        return "📚";
      case "return":
        return "🔄";
      case "reservation":
        return "⏰";
      case "member":
        return "👤";
      case "overdue":
        return "⚠️";
      case "book":
        return "📖";
      default:
        return "📝";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  useEffect(() => {
    setLoading(false);
  });
  return (
    <div className="min-h-screen px-4 pt-5 pb-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your library system and monitor activities
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 space-x-2 transition-colors bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
              <button className="flex items-center px-4 py-2 space-x-2 text-white transition-shadow bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg">
                <Download className="w-5 h-5" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {statCard.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-5 transition-shadow bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.change.startsWith("+")
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>

                {loading ? (
                  <>
                    <Skeleton width={100} height={32} />
                    <Skeleton width={80} height={20} className="mt-2" />
                  </>
                ) : (
                  <>
                    <h3 className="mb-1 text-2xl font-bold">{stat.value}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                      {stat.description}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
          {/* Monthly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Monthly Activity</h2>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-lg dark:bg-blue-900/30 dark:text-blue-300">
                    This Month
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                    Custom Range
                  </button>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        borderRadius: "10px",
                        backdropFilter: "blur(10px)",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="books"
                      name="Books Borrowed"
                      stroke="#3b82f6"
                      fill="url(#colorBooks)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="members"
                      name="New Members"
                      stroke="#10b981"
                      fill="url(#colorMembers)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient
                        id="colorBooks"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorMembers"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="h-full p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Activities</h2>
                <Link
                  to="/admin/activities"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {loading
                  ? Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center p-3 space-x-4"
                        >
                          <Skeleton circle width={40} height={40} />
                          <div className="flex-1">
                            <Skeleton width={180} height={16} />
                            <Skeleton
                              width={120}
                              height={14}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      ))
                  : recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center p-3 space-x-4 transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center justify-center w-10 h-10 text-lg text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">
                              {activity.type === "member"
                                ? activity.action
                                : activity.type === "book"
                                ? activity.title
                                : `${activity.user} - ${activity.book}`}
                            </p>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                activity.status
                              )}`}
                            >
                              {activity.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate dark:text-gray-400">
                            {activity.type === "book"
                              ? "New book added"
                              : activity.type === "member"
                              ? "New member registration"
                              : `${activity.type} activity`}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {activity.time}
                        </span>
                      </motion.div>
                    ))}
              </div>
            </div>
          </motion.div>

          {/* Popular Books */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="h-full p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Most Popular Books</h2>
                <Link
                  to="/admin/books"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {loading
                  ? Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center p-3 space-x-4"
                        >
                          <Skeleton circle width={40} height={40} />
                          <div className="flex-1">
                            <Skeleton width={180} height={16} />
                            <Skeleton
                              width={120}
                              height={14}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      ))
                  : popularBooks.map((book, index) => (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {book.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {book.author}
                            </p>
                            <div className="flex items-center mt-1 space-x-2">
                              <span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                                {book.borrows} borrows
                              </span>
                              <div className="flex items-center">
                                <span className="text-xs text-yellow-600 dark:text-yellow-400">
                                  ★
                                </span>
                                <span className="ml-1 text-xs">
                                  {book.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts and Quick Actions */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Genre Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Genre Distribution Chart */}
              <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Genre Distribution</h2>
                  <PieChartIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genreDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {genreDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          borderRadius: "10px",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Book Status Chart */}
              <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Book Status</h2>
                  <BarChart3 className="w-5 h-5 text-gray-500" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          borderRadius: "10px",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                      <Bar dataKey="value" name="Percentage">
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <h2 className="mb-6 text-xl font-bold">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-4 transition-all duration-300 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 group"
                  >
                    <div
                      className={`${action.color} h-12 w-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-center">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* System Status */}
              <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="mb-4 font-bold">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Database
                    </span>
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      API Service
                    </span>
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Running
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Storage
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      78% used
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Last Backup
                    </span>
                    <span className="text-gray-500">Today, 2:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
