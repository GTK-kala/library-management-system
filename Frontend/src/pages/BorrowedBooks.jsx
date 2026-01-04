import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  Download,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Eye,
  RefreshCw,
  FileText,
  Star,
  BookMarked,
} from "lucide-react";
import toast from "react-hot-toast";

// Mock data for borrowed books
const mockBorrowedBooks = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    coverColor: "from-blue-500 to-cyan-500",
    borrowedDate: "2024-01-15",
    dueDate: "2024-02-15",
    returnDate: null,
    status: "active", // active, overdue, returned
    isOverdue: false,
    daysRemaining: 5,
    totalDays: 30,
    progress: 83,
    fine: 0,
    rating: 4.5,
    genre: "Mystery",
    description:
      "A psychological thriller about a woman who shoots her husband and then stops speaking.",
    isRenewable: true,
    renewalsLeft: 2,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    coverColor: "from-green-500 to-emerald-500",
    borrowedDate: "2024-01-20",
    dueDate: "2024-01-30",
    returnDate: null,
    status: "overdue",
    isOverdue: true,
    daysRemaining: -3,
    totalDays: 10,
    progress: 100,
    fine: 1.5,
    rating: 4.8,
    genre: "Self-Help",
    description: "A guide to building good habits and breaking bad ones.",
    isRenewable: true,
    renewalsLeft: 1,
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverColor: "from-purple-500 to-pink-500",
    borrowedDate: "2024-01-05",
    dueDate: "2024-01-25",
    returnDate: "2024-01-22",
    status: "returned",
    isOverdue: false,
    daysRemaining: 0,
    totalDays: 20,
    progress: 100,
    fine: 0,
    rating: 4.7,
    genre: "Science Fiction",
    description:
      "A lone astronaut must save humanity in this high-stakes sci-fi thriller.",
    isRenewable: false,
    renewalsLeft: 0,
  },
  {
    id: 4,
    title: "The Midnight Library",
    author: "Matt Haig",
    coverColor: "from-orange-500 to-red-500",
    borrowedDate: "2024-01-25",
    dueDate: "2024-02-24",
    returnDate: null,
    status: "active",
    isOverdue: false,
    daysRemaining: 20,
    totalDays: 30,
    progress: 33,
    fine: 0,
    rating: 4.3,
    genre: "Fiction",
    description:
      "Between life and death there is a library where you can experience all the lives you could have lived.",
    isRenewable: true,
    renewalsLeft: 3,
  },
  {
    id: 5,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverColor: "from-yellow-500 to-amber-500",
    borrowedDate: "2024-01-18",
    dueDate: "2024-02-17",
    returnDate: null,
    status: "active",
    isOverdue: false,
    daysRemaining: 12,
    totalDays: 30,
    progress: 60,
    fine: 0,
    rating: 4.2,
    genre: "Science Fiction",
    description: "An AI friend observes human behavior in this poignant novel.",
    isRenewable: true,
    renewalsLeft: 2,
  },
];

const BorrowedBooks = () => {
  const [loading, setLoading] = useState(true);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all"); // all, active, overdue, returned
  const [sortBy, setSortBy] = useState("dueDate"); // dueDate, title, borrowedDate
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBorrowedBooks(mockBorrowedBooks);
      setLoading(false);
    }, 800);

    // Back to Top scroll listener
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter and sort books
  const filteredBooks = borrowedBooks
    .filter((book) => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "active") return book.status === "active";
      if (selectedFilter === "overdue") return book.status === "overdue";
      if (selectedFilter === "returned") return book.status === "returned";
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate")
        return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "borrowedDate")
        return new Date(b.borrowedDate) - new Date(a.borrowedDate);
      return 0;
    });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReturnBook = (book) => {
    setSelectedBook(book);
    setShowReturnModal(true);
  };

  const handleRenewBook = (book) => {
    setSelectedBook(book);
    setShowRenewModal(true);
  };

  const confirmReturn = () => {
    setBorrowedBooks(
      borrowedBooks.map((book) =>
        book.id === selectedBook.id
          ? {
              ...book,
              status: "returned",
              returnDate: new Date().toISOString().split("T")[0],
            }
          : book
      )
    );
    toast.success(`"${selectedBook.title}" returned successfully!`);
    setShowReturnModal(false);
    setSelectedBook(null);
  };

  const confirmRenew = () => {
    const newDueDate = new Date(selectedBook.dueDate);
    newDueDate.setDate(newDueDate.getDate() + 14); // Add 14 days

    setBorrowedBooks(
      borrowedBooks.map((book) =>
        book.id === selectedBook.id
          ? {
              ...book,
              dueDate: newDueDate.toISOString().split("T")[0],
              renewalsLeft: book.renewalsLeft - 1,
              daysRemaining: 14,
            }
          : book
      )
    );
    toast.success(
      `"${
        selectedBook.title
      }" renewed successfully! New due date: ${newDueDate.toLocaleDateString()}`
    );
    setShowRenewModal(false);
    setSelectedBook(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "returned":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      case "returned":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const StatsCard = ({ title, value, icon, color, change }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white dark:bg-gray-800 rounded-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
          {change && (
            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </motion.div>
  );

  const BookCard = ({ book }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="overflow-hidden bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl"
    >
      <div className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <div
              className={`relative w-full h-48 lg:w-40 lg:h-56 rounded-xl overflow-hidden bg-gradient-to-br ${book.coverColor}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white/90" />
              </div>
              <div className="absolute top-3 left-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    book.status
                  )}`}
                >
                  {getStatusIcon(book.status)}
                  <span className="ml-1">
                    {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="flex-1">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex flex-col justify-between mb-3 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      by {book.author}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="px-2.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                        {book.genre}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(book.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                          {book.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  {book.fine > 0 && (
                    <div className="mt-2 sm:mt-0">
                      <span className="px-3 py-1 text-sm font-medium text-red-600 rounded-full bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                        Fine: ${book.fine.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {book.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Loan Progress
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {book.daysRemaining > 0
                        ? `${book.daysRemaining} days left`
                        : `${Math.abs(book.daysRemaining)} days overdue`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        book.status === "overdue"
                          ? "bg-red-500"
                          : book.status === "returned"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Borrowed</p>
                      <p className="text-sm font-medium">
                        {formatDate(book.borrowedDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p
                        className={`text-sm font-medium ${
                          book.isOverdue ? "text-red-600 dark:text-red-400" : ""
                        }`}
                      >
                        {formatDate(book.dueDate)}
                      </p>
                    </div>
                  </div>
                  {book.returnDate && (
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      <div>
                        <p className="text-xs text-gray-500">Returned</p>
                        <p className="text-sm font-medium">
                          {formatDate(book.returnDate)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {book.status === "active" && (
                  <>
                    <button
                      onClick={() => handleReturnBook(book)}
                      className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg"
                    >
                      Return Book
                    </button>
                    <button
                      onClick={() => handleRenewBook(book)}
                      disabled={!book.isRenewable || book.renewalsLeft <= 0}
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        book.isRenewable && book.renewalsLeft > 0
                          ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          : "text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                      }`}
                    >
                      Renew ({book.renewalsLeft} left)
                    </button>
                  </>
                )}
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Eye className="inline w-4 h-4 mr-1" />
                  View Details
                </button>
                {book.status === "returned" && (
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <FileText className="inline w-4 h-4 mr-1" />
                    View Receipt
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen px-3 pt-5 pb-6 sm:px-4 sm:pt-5 sm:pb-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
            <div>
              {/* Back Button */}
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
                My Borrowed Books
              </h1>
              <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                Manage your borrowed books, track due dates, and renew loans
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
                <Download className="w-4 h-4" />
                Export List
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white transition-all bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl hover:shadow-lg">
                <BookOpen className="w-4 h-4" />
                Borrow History
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 mb-6 lg:grid-cols-4 sm:gap-4 sm:mb-8">
          <StatsCard
            title="Active Loans"
            value={borrowedBooks.filter((b) => b.status === "active").length}
            icon={<BookOpen className="w-6 h-6 text-blue-600" />}
            color="bg-blue-100 dark:bg-blue-900/30"
          />
          <StatsCard
            title="Overdue Books"
            value={borrowedBooks.filter((b) => b.status === "overdue").length}
            icon={<AlertCircle className="w-6 h-6 text-red-600" />}
            color="bg-red-100 dark:bg-red-900/30"
            change="+1 this week"
          />
          <StatsCard
            title="Total Fines"
            value={`$${borrowedBooks
              .reduce((sum, book) => sum + book.fine, 0)
              .toFixed(2)}`}
            icon={<FileText className="w-6 h-6 text-orange-600" />}
            color="bg-orange-100 dark:bg-orange-900/30"
          />
          <StatsCard
            title="Books Read"
            value={borrowedBooks.filter((b) => b.status === "returned").length}
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            color="bg-green-100 dark:bg-green-900/30"
            change="+2 this month"
          />
        </div>

        {/* Filters and Sort */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Filter Buttons */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {["all", "active", "overdue", "returned"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedFilter === filter
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dueDate">Due Date</option>
                <option value="title">Title</option>
                <option value="borrowedDate">Borrowed Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Borrowed Books List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl animate-pulse"
              >
                <div className="flex gap-6">
                  <div className="w-40 h-56 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  <div className="flex-1 space-y-4">
                    <div className="w-3/4 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-1/2 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-full h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-1/3 h-8 bg-gray-200 rounded dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-xl">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-gray-100 rounded-full dark:bg-gray-700">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                      No borrowed books found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedFilter === "all"
                        ? "You haven't borrowed any books yet."
                        : `You don't have any ${selectedFilter} books.`}
                    </p>
                  </div>
                  <Link
                    to="/books"
                    className="px-4 py-2 mt-4 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg"
                  >
                    Browse Books
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Tips */}
        <div className="p-6 mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
          <h3 className="mb-4 font-semibold text-blue-700 dark:text-blue-300">
            📚 Quick Tips
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  Renew Early
                </p>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                  Renew books at least 2 days before due date
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-300">
                  Avoid Fines
                </p>
                <p className="text-sm text-red-600/80 dark:text-red-400/80">
                  Late returns incur $0.50 per day fine
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BookMarked className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-300">
                  Reading History
                </p>
                <p className="text-sm text-green-600/80 dark:text-green-400/80">
                  Track all books you've read in your history
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed z-40 p-3 text-white transition-all duration-300 rounded-full shadow-lg bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronRight className="w-5 h-5 transform rotate-270" />
        </motion.button>
      )}

      {/* Return Book Modal */}
      {showReturnModal && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md overflow-hidden bg-white dark:bg-gray-800 rounded-2xl"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${selectedBook.coverColor}`}
                >
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Return Book
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedBook.title}
                  </p>
                </div>
              </div>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Are you sure you want to return this book? Please ensure the
                book is in good condition.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReturn}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg"
                >
                  Confirm Return
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Renew Book Modal */}
      {showRenewModal && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md overflow-hidden bg-white dark:bg-gray-800 rounded-2xl"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${selectedBook.coverColor}`}
                >
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Renew Book
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedBook.title}
                  </p>
                </div>
              </div>
              <div className="p-4 mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Renewing will extend the due date by 14 days. You have{" "}
                  {selectedBook.renewalsLeft} renewal(s) left.
                </p>
              </div>
              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Current due date:
                  </span>
                  <span className="font-medium">
                    {formatDate(selectedBook.dueDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    New due date:
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatDate(
                      new Date(selectedBook.dueDate).setDate(
                        new Date(selectedBook.dueDate).getDate() + 14
                      )
                    )}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRenewModal(false)}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRenew}
                  disabled={selectedBook.renewalsLeft <= 0}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg ${
                    selectedBook.renewalsLeft > 0
                      ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg"
                      : "text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  }`}
                >
                  {selectedBook.renewalsLeft > 0
                    ? "Confirm Renewal"
                    : "No Renewals Left"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
