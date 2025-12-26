import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { mockMembers, roles, statuses, stats1 } from "../assets/Data/data";
import {
  Edit,
  Lock,
  Hash,
  Users,
  Shield,
  Trash2,
  Search,
  Unlock,
  XCircle,
  ArrowUp,
  UserPlus,
  BookOpen,
  Download,
  RefreshCw,
  ArrowLeft,
  CheckCircle,
  MoreVertical,
} from "lucide-react";
import toast from "react-hot-toast";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState("all");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMembers(mockMembers);
      setLoading(false);
    }, 1000);
  }, []);

  // Back to Top functionality
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Filter members
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || member.status === selectedStatus;
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Pagination
  const membersPerPage = 6;
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const currentMembers = filteredMembers.slice(
    startIndex,
    startIndex + membersPerPage
  );

  // Handle member actions
  const handleEditMember = (member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
    setIsActionMenuOpen(null);
  };

  const handleDeleteMember = (member) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
    setIsActionMenuOpen(null);
  };

  const handleToggleStatus = (member) => {
    const newStatus = member.status === "active" ? "inactive" : "active";
    setMembers(
      members.map((m) => (m.id === member.id ? { ...m, status: newStatus } : m))
    );
    toast.success(
      `Member ${
        newStatus === "active" ? "activated" : "deactivated"
      } successfully`
    );
    setIsActionMenuOpen(null);
  };

  const handleResetPassword = (member) => {
    toast.success(`Password reset email sent to ${member.email}`);
    setIsActionMenuOpen(null);
  };

  const handleConfirmDelete = () => {
    setMembers(members.filter((m) => m.id !== selectedMember.id));
    toast.success(`Member ${selectedMember.name} deleted successfully`);
    setIsDeleteModalOpen(false);
    setSelectedMember(null);
  };

  const handleExportData = () => {
    toast.success("Members data exported successfully");
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "premium":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "member":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      case "suspended":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "inactive":
        return <XCircle className="w-4 h-4" />;
      case "suspended":
        return <Lock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen px-3 pt-5 pb-6 sm:px-4 sm:pt-5 sm:pb-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
            <div>
              {/* Back Button - Same as CalendarView and AddBook */}
              <div className="flex items-center gap-3 mb-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-xl dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Link>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-transparent sm:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Manage Members
              </h1>
              <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                Manage library members, view statistics, and handle memberships
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl hover:shadow-lg"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </button>
              <button
                onClick={handleExportData}
                className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6 lg:grid-cols-4 sm:gap-4 sm:mb-8">
          {stats1.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white shadow-sm dark:bg-gray-800 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {stat.value}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      stat.change.startsWith("+")
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}
                >
                  <stat.icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                <input
                  type="text"
                  placeholder="Search members by name, email, or membership ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-sm sm:text-base bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="premium">Premium</option>
                  <option value="member">Member</option>
                </select>
              </div>
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-xl sm:rounded-2xl">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Loading members...
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      Member
                    </th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      Role & Status
                    </th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      Borrowed Books
                    </th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      Fine
                    </th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                              {member.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-3 sm:ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {member.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {member.email}
                            </div>
                            <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <Hash className="w-3 h-3 mr-1" />
                              {member.membershipId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                              member.role
                            )}`}
                          >
                            {member.role.charAt(0).toUpperCase() +
                              member.role.slice(1)}
                          </span>
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                member.status
                              )}`}
                            >
                              {getStatusIcon(member.status)}
                              <span className="ml-1">
                                {member.status.charAt(0).toUpperCase() +
                                  member.status.slice(1)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {member.borrowedBooks} current
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {member.totalBorrowed} total
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div
                          className={`text-sm font-medium ${
                            member.fine > 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          ${member.fine.toFixed(2)}
                        </div>
                        {member.fine > 0 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Payment pending
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setIsActionMenuOpen(
                                isActionMenuOpen === member.id
                                  ? null
                                  : member.id
                              )
                            }
                            className="p-2 text-gray-400 rounded-lg hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          {isActionMenuOpen === member.id && (
                            <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                              <button
                                onClick={() => handleEditMember(member)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Edit className="w-4 h-4 mr-3" />
                                Edit Member
                              </button>
                              <button
                                onClick={() => handleToggleStatus(member)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                {member.status === "active" ? (
                                  <>
                                    <Lock className="w-4 h-4 mr-3" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Unlock className="w-4 h-4 mr-3" />
                                    Activate
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleResetPassword(member)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <RefreshCw className="w-4 h-4 mr-3" />
                                Reset Password
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4 mr-3" />
                                Delete Member
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {filteredMembers.length > 0 && (
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex + membersPerPage,
                    filteredMembers.length
                  )}{" "}
                  of {filteredMembers.length} members
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1.5 text-sm rounded-lg ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {filteredMembers.length === 0 && !loading && (
            <div className="p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full dark:bg-gray-700">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                No members found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Active Borrowings</p>
                <p className="mt-1 text-2xl font-bold">143</p>
              </div>
              <BookOpen className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="p-4 text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Total Fine Collected</p>
                <p className="mt-1 text-2xl font-bold">$248.75</p>
              </div>
              <Shield className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="p-4 text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Pending Approvals</p>
                <p className="mt-1 text-2xl font-bold">8</p>
              </div>
              <RefreshCw className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed z-40 p-3 text-white transition-all duration-300 rounded-full shadow-lg bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      )}

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      Add New Member
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone
                          </label>
                          <input
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
                            placeholder="Phone number"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Role
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                            <option value="member">Member</option>
                            <option value="premium">Premium</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Member
                </button>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Delete Member
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold">
                          {selectedMember.name}
                        </span>
                        ? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleConfirmDelete}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-lg shadow-sm hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
