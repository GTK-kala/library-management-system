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
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [recentBooks, setRecentBooks] = useState([]);

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
              className="hover:cursor-pointer hover:translate-x-5"
            >
              <div className="p-6 transition-shadow duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-xl">
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
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <Link
                  to="/books"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {loading
                  ? Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center p-4 space-x-4"
                        >
                          <Skeleton circle width={48} height={48} />
                          <div className="flex-1">
                            <Skeleton width={200} height={20} />
                            <Skeleton
                              width={150}
                              height={16}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      ))
                  : recentBooks.map((book, index) => (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center p-4 space-x-4 transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:cursor-pointer"
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{book.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {book.author}
                          </p>
                          <span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                            {book.genre}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{book.borrowed}</span>
                        </div>
                      </motion.div>
                    ))}
              </div>
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
                  },
                  {
                    label: "Manage Members",
                    icon: Users,
                    color: "bg-green-500",
                  },
                  {
                    label: "View Calendar",
                    icon: Calendar,
                    color: "bg-purple-500",
                  },
                  {
                    label: "Generate Reports",
                    icon: TrendingUp,
                    color: "bg-orange-500",
                  },
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center w-full p-4 space-x-3 transition-colors rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div
                      className={`${action.color} h-10 w-10 rounded-lg flex items-center justify-center`}
                    >
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Upcoming Returns */}
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <h2 className="mb-6 text-xl font-bold">Upcoming Returns</h2>
              <div className="space-y-4">
                {[
                  { title: "The Hobbit", due: "Tomorrow", user: "John Doe" },
                  { title: "Dune", due: "In 2 days", user: "Jane Smith" },
                  { title: "1984", due: "In 3 days", user: "Bob Johnson" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"
                  >
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.user}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                      {item.due}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
