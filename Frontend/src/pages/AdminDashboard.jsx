import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for charts
  const monthlyData = [
    { month: "Jan", books: 120, members: 45, revenue: 1200 },
    { month: "Feb", books: 150, members: 52, revenue: 1500 },
    { month: "Mar", books: 180, members: 61, revenue: 1800 },
    { month: "Apr", books: 210, members: 75, revenue: 2100 },
    { month: "May", books: 240, members: 82, revenue: 2400 },
    { month: "Jun", books: 280, members: 95, revenue: 2800 },
  ];

  const genreDistribution = [
    { name: "Fiction", value: 35, color: "#3b82f6" },
    { name: "Non-Fiction", value: 25, color: "#10b981" },
    { name: "Science", value: 15, color: "#8b5cf6" },
    { name: "Technology", value: 12, color: "#f59e0b" },
    { name: "Biography", value: 8, color: "#ef4444" },
    { name: "Other", value: 5, color: "#6b7280" },
  ];

  const statusData = [
    { name: "Available", value: 65, color: "#10b981" },
    { name: "Borrowed", value: 25, color: "#3b82f6" },
    { name: "Reserved", value: 8, color: "#f59e0b" },
    { name: "Overdue", value: 2, color: "#ef4444" },
  ];

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalBooks: 1247,
        totalMembers: 423,
        activeBorrows: 187,
        overdueBooks: 23,
        todayReturns: 15,
        revenue: 12450,
        newMembers: 28,
        reservations: 42,
      });

      setRecentActivities([
        {
          id: 1,
          type: "borrow",
          user: "John Doe",
          book: "The Great Gatsby",
          time: "10:30 AM",
          status: "success",
        },
        {
          id: 2,
          type: "return",
          user: "Jane Smith",
          book: "1984",
          time: "11:15 AM",
          status: "success",
        },
        {
          id: 3,
          type: "reservation",
          user: "Bob Johnson",
          book: "Atomic Habits",
          time: "12:00 PM",
          status: "pending",
        },
        {
          id: 4,
          type: "member",
          user: "Alice Brown",
          action: "New registration",
          time: "1:45 PM",
          status: "success",
        },
        {
          id: 5,
          type: "overdue",
          user: "Charlie Wilson",
          book: "The Hobbit",
          time: "2:30 PM",
          status: "warning",
        },
        {
          id: 6,
          type: "book",
          action: "New book added",
          title: "Project Hail Mary",
          time: "3:15 PM",
          status: "success",
        },
      ]);

      setPopularBooks([
        {
          id: 1,
          title: "The Silent Patient",
          author: "Alex Michaelides",
          borrows: 124,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Project Hail Mary",
          author: "Andy Weir",
          borrows: 112,
          rating: 4.9,
        },
        {
          id: 3,
          title: "Atomic Habits",
          author: "James Clear",
          borrows: 98,
          rating: 4.8,
        },
        {
          id: 4,
          title: "The Midnight Library",
          author: "Matt Haig",
          borrows: 87,
          rating: 4.4,
        },
        {
          id: 5,
          title: "Klara and the Sun",
          author: "Kazuo Ishiguro",
          borrows: 76,
          rating: 4.3,
        },
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  const statCards = [
    {
      title: "Total Books",
      value: stats?.totalBooks,
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
      description: "From last month",
    },
    {
      title: "Active Members",
      value: stats?.totalMembers,
      icon: Users,
      color: "from-green-500 to-emerald-500",
      change: "+8%",
      description: "New registrations",
    },
    {
      title: "Books Borrowed",
      value: stats?.activeBorrows,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      change: "+15%",
      description: "Currently borrowed",
    },
    {
      title: "Overdue Books",
      value: stats?.overdueBooks,
      icon: AlertCircle,
      color: "from-orange-500 to-red-500",
      change: "-3%",
      description: "Require attention",
    },
    {
      title: "Today Returns",
      value: stats?.todayReturns,
      icon: Clock,
      color: "from-indigo-500 to-blue-500",
      change: "+20%",
      description: "Due today",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.revenue?.toLocaleString()}`,
      icon: DollarSign,
      color: "from-yellow-500 to-orange-500",
      change: "+18%",
      description: "This month",
    },
  ];

  const quickActions = [
    {
      label: "Add New Book",
      icon: Plus,
      color: "bg-blue-500",
      path: "/admin/books/add",
    },
    {
      label: "Manage Members",
      icon: Users,
      color: "bg-green-500",
      path: "/admin/members",
    },
    {
      label: "View Reports",
      icon: BarChart3,
      color: "bg-purple-500",
      path: "/admin/reports",
    },
    {
      label: "Generate Report",
      icon: Download,
      color: "bg-orange-500",
      path: "/admin/export",
    },
    {
      label: "Manage Fines",
      icon: DollarSign,
      color: "bg-yellow-500",
      path: "/admin/fines",
    },
    {
      label: "Calendar View",
      icon: Calendar,
      color: "bg-pink-500",
      path: "/admin/calendar",
    },
  ];

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

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your library system and monitor activities
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow">
                <Download className="h-5 w-5" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
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
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {stat.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Monthly Activity</h2>
                <div className="flex items-center space-x-2">
                  <button className="text-sm px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                    This Month
                  </button>
                  <button className="text-sm px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Activities</h2>
                <Link
                  to="/admin/activities"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
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
                          className="flex items-center space-x-4 p-3"
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
                        className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg">
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
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Most Popular Books</h2>
                <Link
                  to="/admin/books"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
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
                          className="flex items-center space-x-4 p-3"
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
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {book.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {book.author}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full">
                                {book.borrows} borrows
                              </span>
                              <div className="flex items-center">
                                <span className="text-xs text-yellow-600 dark:text-yellow-400">
                                  ★
                                </span>
                                <span className="text-xs ml-1">
                                  {book.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Genre Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Genre Distribution Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Genre Distribution</h2>
                  <PieChartIcon className="h-5 w-5 text-gray-500" />
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
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Book Status</h2>
                  <BarChart3 className="h-5 w-5 text-gray-500" />
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 group"
                  >
                    <div
                      className={`${action.color} h-12 w-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-medium text-sm text-center">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* System Status */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-bold mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Database
                    </span>
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      API Service
                    </span>
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4 mr-1" />
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
