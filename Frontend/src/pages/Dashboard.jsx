import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { statCards } from "../assets/Data/data";
import {
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  DollarSign,
  BarChart3,
  Eye,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [recentBooks, setRecentBooks] = useState([]);
  const [stats, setStats] = useState(null);
  const [upcomingReturns, setUpcomingReturns] = useState([]);

  // Fetch all data on component mount
  useEffect(() => {
    setLoading(false);

    const FetchBooks = async () => {
      try {
        const url = "http://localhost:3001/api/books";
        const res = await fetch(url);
        const data = await res.json();
        const Data = data.result;
        if (!res.ok) {
          console.log(Data);
        } else {
          setRecentBooks(Data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchBooks();
  }, []);

  // Calculate due date text
  const getDueDateText = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `In ${diffDays} days`;
    return due.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen px-4 pt-20 pb-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10"></div>

      <div className="container relative mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your library today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6 transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <ArrowUpRight
                      className={`h-4 w-4 ${
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>

                {loading ? (
                  <Skeleton width={100} height={32} />
                ) : (
                  <h3 className="mb-1 text-3xl font-bold">{stat.value}</h3>
                )}

                <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Books */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Books</h2>
                <Link
                  to="/books"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center p-4 space-x-4">
                        <Skeleton circle width={48} height={48} />
                        <div className="flex-1">
                          <Skeleton width={200} height={20} />
                          <Skeleton width={150} height={16} className="mt-2" />
                        </div>
                      </div>
                    ))}
                </div>
              ) : recentBooks.length > 0 ? (
                <div className="space-y-4">
                  {recentBooks.map((book, index) => (
                    <motion.div
                      key={book.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center p-4 space-x-4 transition-all duration-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{book.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          by {book.author}
                        </p>
                        {book.genre && (
                          <span className="inline-block px-2 py-1 mt-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                            {book.genre}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <Link
                            to={`/books/${book.id}`}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            View
                          </Link>
                        </div>
                        {book.available_copies !== undefined && (
                          <div className="mt-2">
                            <div className="text-xl font-bold text-green-600 dark:text-green-400">
                              {book.available_copies}
                            </div>
                            <div className="text-xs text-gray-500">
                              Available
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    No books available
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Add some books to get started
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="p-6 mb-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <h2 className="mb-6 text-xl font-bold">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  {
                    label: "Add New Book",
                    icon: BookOpen,
                    color: "bg-blue-500",
                    link: "/books/add",
                  },
                  {
                    label: "Manage Members",
                    icon: Users,
                    color: "bg-green-500",
                    link: "/admin/members",
                  },
                  {
                    label: "View Calendar",
                    icon: Calendar,
                    color: "bg-purple-500",
                    link: "/admin/calendar",
                  },
                  {
                    label: "Generate Reports",
                    icon: BarChart3,
                    color: "bg-orange-500",
                    link: "/admin/reports",
                  },
                ].map((action, index) => (
                  <motion.div
                    key={action.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action.link ? (
                      <Link
                        to={action.link}
                        className="flex items-center w-full p-4 space-x-3 transition-colors rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <div
                          className={`${action.color} h-10 w-10 rounded-lg flex items-center justify-center`}
                        >
                          <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium">{action.label}</span>
                      </Link>
                    ) : (
                      <button className="flex items-center w-full p-4 space-x-3 transition-colors rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div
                          className={`${action.color} h-10 w-10 rounded-lg flex items-center justify-center`}
                        >
                          <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium">{action.label}</span>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Returns */}
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <h2 className="mb-6 text-xl font-bold">Upcoming Returns</h2>
              {upcomingReturns.length > 0 ? (
                <div className="space-y-4">
                  {upcomingReturns.map((item, index) => (
                    <motion.div
                      key={item.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">
                          {item.book_title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {item.member_name}
                        </p>
                      </div>
                      <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300 whitespace-nowrap ml-2">
                        {getDueDateText(item.due_date)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    No upcoming returns
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    All books are returned on time
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Additional Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Today's Returns */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-100">Today's Returns</p>
                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {loading ? (
                      <Skeleton width={60} />
                    ) : (
                      stats?.todayReturns || 15
                    )}
                  </h3>
                </div>
                <Calendar className="w-10 h-10 text-white opacity-80" />
              </div>
            </div>

            {/* Monthly Revenue */}
            <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-100">Monthly Revenue</p>
                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {loading ? (
                      <Skeleton width={100} />
                    ) : (
                      `$${stats?.revenue?.toLocaleString() || 0}`
                    )}
                  </h3>
                </div>
                <DollarSign className="w-10 h-10 text-white opacity-80" />
              </div>
            </div>

            {/* New Members */}
            <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-100">New Members (30d)</p>
                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {loading ? (
                      <Skeleton width={50} />
                    ) : (
                      stats?.newMembers || 28
                    )}
                  </h3>
                </div>
                <TrendingUp className="w-10 h-10 text-white opacity-80" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
