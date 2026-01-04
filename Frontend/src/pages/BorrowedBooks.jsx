import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GetUserBooks } from "../Api/UserApi.js";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import {
  Eye,
  Star,
  Clock,
  BookOpen,
  Calendar,
  Download,
  FileText,
  ArrowLeft,
  RefreshCw,
  BookMarked,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

// Helper functions outside component
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

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Memoized StatsCard component
const StatsCard = memo(({ title, value, icon, color, change }) => (
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
));

StatsCard.displayName = "StatsCard";

// Memoized BookCard component
const BookCard = memo(({ book, onReturn, onRenew }) => {
  const getCoverColor = useCallback(() => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-yellow-500 to-amber-500",
    ];
    const index = (book.id || 0) % colors.length;
    return colors[index];
  }, [book.id]);

  const coverColor = book.coverColor || getCoverColor();

  const calculateProgress = useMemo(() => {
    if (!book.borrowed || !book.due) return 50;

    const borrowedDate = new Date(book.borrowed);
    const dueDate = new Date(book.due);
    const today = new Date();

    const totalDays = Math.floor(
      (dueDate - borrowedDate) / (1000 * 60 * 60 * 24)
    );
    const daysPassed = Math.floor(
      (today - borrowedDate) / (1000 * 60 * 60 * 24)
    );

    if (totalDays <= 0) return 100;
    if (daysPassed <= 0) return 0;
    if (daysPassed >= totalDays) return 100;

    return Math.round((daysPassed / totalDays) * 100);
  }, [book.borrowed, book.due]);

  const calculateDaysRemaining = useMemo(() => {
    if (!book.due) return 0;
    const dueDate = new Date(book.due);
    const today = new Date();
    const diffTime = dueDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [book.due]);

  const daysRemaining = book.days_left || calculateDaysRemaining;
  const progress = book.progress || calculateProgress;
  const isOverdue = daysRemaining < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl"
    >
      <div className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <div
              className={`relative w-full h-48 lg:w-40 lg:h-56 rounded-xl overflow-hidden bg-gradient-to-br ${coverColor}`}
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
                    {book.status?.charAt(0)?.toUpperCase() +
                      book.status?.slice(1) || "Unknown"}
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
                              i < Math.floor(book.rating || 0)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                          {book.rating || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {book.fine > 0 && (
                    <div className="mt-2 sm:mt-0">
                      <span className="px-3 py-1 text-sm font-medium text-red-600 rounded-full bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                        Fine: ${(book.fine || 0).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {book.description || "No description available."}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Loan Progress
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {daysRemaining > 0
                        ? `${daysRemaining} days left`
                        : `${Math.abs(daysRemaining)} days overdue`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOverdue
                          ? "bg-red-500"
                          : book.status === "returned"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.max(0, progress))}%`,
                      }}
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
                        {formatDate(book.borrowed)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p
                        className={`text-sm font-medium ${
                          isOverdue ? "text-red-600 dark:text-red-400" : ""
                        }`}
                      >
                        {formatDate(book.due)}
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
                      onClick={() => onReturn(book)}
                      className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg"
                    >
                      Return Book
                    </button>
                    <button
                      onClick={() => onRenew(book)}
                      disabled={
                        !(book.isRenewable ?? true) ||
                        (book.renewalsLeft || 0) <= 0
                      }
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        (book.isRenewable ?? true) &&
                        (book.renewalsLeft || 0) > 0
                          ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          : "text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                      }`}
                    >
                      Renew ({book.renewalsLeft || 0} left)
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
});

BookCard.displayName = "BookCard";

// Loading Skeleton Component
const LoadingSkeleton = memo(() => (
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
));

LoadingSkeleton.displayName = "LoadingSkeleton";

// Main Component
const BorrowedBooks = () => {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("dueDate");
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showReturnModal, setShowReturnModal] = useState(false);

  // Load data once on mount
  useEffect(() => {
    let mounted = true;
    let scrollTimeout;

    const LoadData = async () => {
      try {
        const books = await GetUserBooks();
        if (mounted && books) {
          setBorrowedBooks(Array.isArray(books) ? books : []);
        }
      } catch (error) {
        console.error("Error loading books:", error);
        if (mounted) {
          setBorrowedBooks([]);
        }
      } finally {
        if (mounted) {
          setTimeout(() => setLoading(false), 300);
        }
      }
    };

    LoadData();

    // Throttle scroll handler
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowBackToTop(window.scrollY > 300);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      mounted = false;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Memoize filtered books
  const filteredBooks = useMemo(() => {
    return borrowedBooks
      .filter((book) => {
        if (selectedFilter === "all") return true;
        return book.status === selectedFilter;
      })
      .sort((a, b) => {
        if (sortBy === "dueDate") {
          const dateA = a.due ? new Date(a.due).getTime() : 0;
          const dateB = b.due ? new Date(b.due).getTime() : 0;
          return dateA - dateB;
        }
        if (sortBy === "title")
          return (a.title || "").localeCompare(b.title || "");
        if (sortBy === "borrowedDate") {
          const dateA = a.borrowed ? new Date(a.borrowed).getTime() : 0;
          const dateB = b.borrowed ? new Date(b.borrowed).getTime() : 0;
          return dateB - dateA;
        }
        return 0;
      });
  }, [borrowedBooks, selectedFilter, sortBy]);

  // Memoize stats
  const stats = useMemo(() => {
    const activeLoans = borrowedBooks.filter(
      (b) => b.status === "active"
    ).length;
    const overdueBooks = borrowedBooks.filter(
      (b) => b.status === "overdue"
    ).length;
    const totalFines = borrowedBooks.reduce(
      (sum, book) => sum + (book.fine || 0),
      0
    );
    const booksRead = borrowedBooks.filter(
      (b) => b.status === "returned"
    ).length;

    return { activeLoans, overdueBooks, totalFines, booksRead };
  }, [borrowedBooks]);

  // Memoize event handlers
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleReturnBook = useCallback((book) => {
    setSelectedBook(book);
    setShowReturnModal(true);
  }, []);

  const handleRenewBook = useCallback((book) => {
    setSelectedBook(book);
    setShowRenewModal(true);
  }, []);

  const confirmReturn = useCallback(() => {
    if (!selectedBook) return;

    setBorrowedBooks((prev) =>
      prev.map((book) =>
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
  }, [selectedBook]);

  const confirmRenew = useCallback(() => {
    if (!selectedBook) return;

    const newDueDate = new Date(selectedBook.due);
    newDueDate.setDate(newDueDate.getDate() + 14);

    setBorrowedBooks((prev) =>
      prev.map((book) =>
        book.id === selectedBook.id
          ? {
              ...book,
              due: newDueDate.toISOString().split("T")[0],
              renewalsLeft: (book.renewalsLeft || 1) - 1,
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
  }, [selectedBook]);

  return (
    <div className="min-h-screen px-3 pt-5 pb-6 sm:px-4 sm:pt-5 sm:pb-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
            <div>
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
            value={stats.activeLoans}
            icon={<BookOpen className="w-6 h-6 text-blue-600" />}
            color="bg-blue-100 dark:bg-blue-900/30"
          />
          <StatsCard
            title="Overdue Books"
            value={stats.overdueBooks}
            icon={<AlertCircle className="w-6 h-6 text-red-600" />}
            color="bg-red-100 dark:bg-red-900/30"
            change={stats.overdueBooks > 0 ? "+1 this week" : ""}
          />
          <StatsCard
            title="Total Fines"
            value={`$${stats.totalFines.toFixed(2)}`}
            icon={<FileText className="w-6 h-6 text-orange-600" />}
            color="bg-orange-100 dark:bg-orange-900/30"
          />
          <StatsCard
            title="Books Read"
            value={stats.booksRead}
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            color="bg-green-100 dark:bg-green-900/30"
            change={stats.booksRead > 0 ? "+2 this month" : ""}
          />
        </div>

        {/* Filters and Sort */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 lg:flex-row">
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
          <LoadingSkeleton />
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard
                  key={book.id || book._id || Math.random()}
                  book={book}
                  onReturn={handleReturnBook}
                  onRenew={handleRenewBook}
                />
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
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed z-40 p-3 text-white transition-all duration-300 rounded-full shadow-lg bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105"
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
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
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
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
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
                  {selectedBook.renewalsLeft || 0} renewal(s) left.
                </p>
              </div>
              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Current due date:
                  </span>
                  <span className="font-medium">
                    {formatDate(selectedBook.due)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    New due date:
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatDate(
                      new Date(selectedBook.due).setDate(
                        new Date(selectedBook.due).getDate() + 14
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
                  disabled={(selectedBook.renewalsLeft || 0) <= 0}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg ${
                    (selectedBook.renewalsLeft || 0) > 0
                      ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg"
                      : "text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  }`}
                >
                  {(selectedBook.renewalsLeft || 0) > 0
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
