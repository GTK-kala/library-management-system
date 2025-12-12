import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  Clock,
  Edit,
  Save,
  X,
  Award,
  TrendingUp,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    address: "123 Library St, Book City",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  const borrowingHistory = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      borrowed: "2024-01-15",
      returned: "2024-01-29",
      status: "returned",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      borrowed: "2024-01-20",
      due: "2024-02-03",
      status: "borrowed",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      borrowed: "2023-12-10",
      returned: "2023-12-24",
      status: "returned",
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      borrowed: "2023-11-05",
      returned: "2023-11-19",
      status: "returned",
    },
  ];

  const stats = {
    totalBorrowed: 24,
    currentlyBorrowed: 2,
    onTimeReturns: 22,
    favoriteGenre: "Fiction",
  };

  return (
    <div className="min-h-screen px-4 pt-20 pb-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and view your borrowing history
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 lg:col-span-2"
          >
            {/* Profile Information */}
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Personal Information</h2>
                <button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-shadow bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="flex items-center justify-center w-24 h-24 text-3xl font-bold text-white rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute w-8 h-8 bg-green-500 border-4 border-white rounded-full -bottom-2 -right-2 dark:border-gray-800"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{user?.name}</h3>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="px-3 py-1 text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                        {user?.role}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Member ID: {user?.membership_id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center p-3 space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <User className="w-5 h-5 text-gray-400" />
                        <span>{formData.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center p-3 space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span>{formData.email}</span>
                      </div>
                    )}
                  </div>

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
                        className="w-full px-4 py-3 border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center p-3 space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <span>📱</span>
                        <span>{formData.phone}</span>
                      </div>
                    )}
                  </div>

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
                        className="w-full px-4 py-3 border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center p-3 space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <span>🏠</span>
                        <span>{formData.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Borrowing History */}
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <h2 className="mb-6 text-xl font-bold">Borrowing History</h2>
              <div className="space-y-4">
                {borrowingHistory.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 transition-colors rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.author}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm">
                          <p className="text-gray-500">
                            Borrowed: {item.borrowed}
                          </p>
                          <p className="text-gray-500">
                            {item.status === "returned"
                              ? `Returned: ${item.returned}`
                              : `Due: ${item.due}`}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            item.status === "returned"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300"
                              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300"
                          }`}
                        >
                          {item.status === "returned" ? "Returned" : "Borrowed"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Stats Card */}
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              <h2 className="mb-6 text-xl font-bold">Reading Stats</h2>
              <div className="space-y-6">
                {[
                  {
                    label: "Total Books Borrowed",
                    value: stats.totalBorrowed,
                    icon: BookOpen,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "Currently Borrowed",
                    value: stats.currentlyBorrowed,
                    icon: Clock,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    label: "On-time Returns",
                    value: stats.onTimeReturns,
                    icon: Award,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    label: "Favorite Genre",
                    value: stats.favoriteGenre,
                    icon: TrendingUp,
                    color: "from-orange-500 to-red-500",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-4 space-x-4 rounded-xl bg-gray-50 dark:bg-gray-700"
                  >
                    <div
                      className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Membership Status */}
            <div className="p-6 text-white shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
              <h2 className="mb-4 text-xl font-bold">Membership Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Account Type</span>
                  <span className="font-semibold capitalize">{user?.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Member Since</span>
                  <span className="font-semibold">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Borrowing Limit</span>
                  <span className="font-semibold">5 Books</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Renewal Date</span>
                  <span className="font-semibold">Jan 2025</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <span>Account Level</span>
                  <span className="font-bold">Gold Member</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/20">
                  <div className="w-3/4 h-2 bg-white rounded-full"></div>
                </div>
                <p className="mt-2 text-sm text-white/80">
                  75% progress to Platinum level
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
