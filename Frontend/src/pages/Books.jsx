import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { genres, mockBooks } from "../assets/Data/data";
import {
  Search,
  Filter,
  BookOpen,
  Star,
  Eye,
  Heart,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Calendar,
  User,
  Hash,
  CheckCircle,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Books = () => {
  const booksPerPage = 12;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBooks(mockBooks);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  const BookCard = ({ book }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl sm:rounded-2xl hover:shadow-lg"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg sm:h-14 sm:w-14 sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
            <BookOpen className="w-5 h-5 text-white sm:h-7 sm:w-7" />
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button className="p-1.5 sm:p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Heart className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5 hover:text-red-500" />
            </button>
            <button className="p-1.5 sm:p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Eye className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5 hover:text-blue-500" />
            </button>
          </div>
        </div>

        <h3 className="h-10 mb-2 text-sm font-bold sm:text-base line-clamp-2 sm:h-12">
          {book.title}
        </h3>
        <p className="mb-2 text-xs text-gray-600 sm:mb-3 sm:text-sm dark:text-gray-400 line-clamp-1">
          by {book.author}
        </p>

        <div className="flex items-center mb-3 sm:mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  i < Math.floor(book.rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {book.rating}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="px-2.5 py-1 sm:px-3 sm:py-1 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 rounded-full">
            {book.genre}
          </span>
          <span className="flex items-center text-gray-500">
            <Calendar className="w-3 h-3 mr-1 sm:w-4 sm:h-4" />
            {book.year}
          </span>
        </div>
      </div>

      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
        <button
          className={`w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl font-medium transition-colors ${
            book.available
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
              : "bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!book.available}
        >
          {book.available ? "Borrow Now" : "Unavailable"}
        </button>
      </div>
    </motion.div>
  );

  const BookRow = ({ book }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 mb-3 transition-shadow bg-white border border-gray-200 sm:p-6 sm:mb-4 dark:border-gray-700 dark:bg-gray-800 rounded-xl sm:rounded-2xl hover:shadow-lg"
    >
      {/* Mobile View (Stacked Layout) */}
      <div className="sm:hidden">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold line-clamp-2">{book.title}</h3>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  by {book.author}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <div className="flex items-center space-x-1">
                  <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Eye className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                  </button>
                </div>
                <span className="px-2 py-0.5 text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 rounded-full">
                  {book.genre}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 text-xs">{book.rating}</span>
              </div>
              <span className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {book.year}
              </span>
            </div>
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                book.available
                  ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300"
                  : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300"
              }`}
            >
              {book.available ? "Available" : "Checked Out"}
            </span>
          </div>

          <button
            className={`w-full py-2.5 text-sm rounded-lg font-medium transition-colors ${
              book.available
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!book.available}
          >
            {book.available ? "Borrow Now" : "Unavailable"}
          </button>
        </div>
      </div>

      {/* Desktop View (Row Layout) */}
      <div className="flex-row items-start hidden gap-6 sm:flex">
        <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
          <BookOpen className="w-8 h-8 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold line-clamp-2">{book.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                by {book.author}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="px-3 py-1 text-sm text-blue-600 rounded-full bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300">
                {book.genre}
              </span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 text-sm">{book.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 mt-4 sm:flex-row sm:items-center sm:mt-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {book.year}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  book.available
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300"
                    : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300"
                }`}
              >
                {book.available ? "Available" : "Checked Out"}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Eye className="w-5 h-5 text-gray-400 hover:text-blue-500" />
              </button>
              <button
                className={`px-6 py-2 text-sm rounded-xl font-medium transition-colors ${
                  book.available
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!book.available}
              >
                {book.available ? "Borrow" : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen px-3 pt-5 pb-6 sm:px-4 sm:pt-20 sm:pb-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="mb-2 text-xl font-bold text-transparent sm:text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Book Catalog
          </h1>
          <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Browse and borrow from our extensive collection
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4 sm:gap-4 sm:mb-8">
          <div className="p-3 bg-white rounded-lg sm:p-4 dark:bg-gray-800 sm:rounded-xl">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-blue-500 sm:w-5 sm:h-5" />
              <div>
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  Total Books
                </p>
                <p className="text-lg font-bold sm:text-xl">{books.length}</p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg sm:p-4 dark:bg-gray-800 sm:rounded-xl">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500 sm:w-5 sm:h-5" />
              <div>
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  Available
                </p>
                <p className="text-lg font-bold sm:text-xl">
                  {books.filter((b) => b.available).length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg sm:p-4 dark:bg-gray-800 sm:rounded-xl">
            <div className="flex items-center">
              <Hash className="w-4 h-4 mr-2 text-purple-500 sm:w-5 sm:h-5" />
              <div>
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  Genres
                </p>
                <p className="text-lg font-bold sm:text-xl">
                  {genres.length - 1}
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg sm:p-4 dark:bg-gray-800 sm:rounded-xl">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-orange-500 sm:w-5 sm:h-5" />
              <div>
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  Active Readers
                </p>
                <p className="text-lg font-bold sm:text-xl">1,234</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters - Improved spacing */}
        <div className="mb-6 space-y-4 sm:mb-8 sm:space-y-6">
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
            <input
              type="text"
              placeholder="Search books by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-sm bg-white border border-gray-200 sm:py-4 sm:pl-12 sm:text-base dark:border-gray-700 dark:bg-gray-800 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Controls Container - Better organization */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="w-full sm:w-auto">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full p-3 bg-white border border-gray-200 sm:hidden dark:bg-gray-800 rounded-xl dark:border-gray-700"
              >
                <div className="flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="font-medium">Filter by Genre</span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    isFilterOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* Genre Filters */}
              <div
                className={`${
                  isFilterOpen ? "block" : "hidden"
                } sm:block mt-3 sm:mt-0`}
              >
                <div className="flex flex-wrap gap-2">
                  {genres.slice(0, 6).map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full transition-colors whitespace-nowrap ${
                        selectedGenre === genre
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {genre === "all" ? "All" : genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* View Toggle and Results Count - Better spacing */}
            <div className="flex flex-col items-start w-full gap-3 sm:flex-row sm:items-center sm:gap-4 sm:w-auto">
              {/* Results Count - Moved to its own line on mobile */}
              <div className="w-full text-sm text-gray-600 dark:text-gray-400 sm:text-right sm:w-auto">
                <span className="font-medium">{filteredBooks.length}</span>{" "}
                books found
              </div>

              {/* View Toggle - Better spacing */}
              <div className="flex items-center self-start space-x-1 sm:space-x-2 sm:self-auto">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid/List */}
        {loading ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                : "space-y-3 sm:space-y-4"
            }
          >
            {Array(viewMode === "grid" ? 8 : 4)
              .fill(0)
              .map((_, i) =>
                viewMode === "grid" ? (
                  <div
                    key={i}
                    className="p-4 bg-white sm:p-6 dark:bg-gray-800 rounded-xl sm:rounded-2xl"
                  >
                    <Skeleton height={200} />
                  </div>
                ) : (
                  <div
                    key={i}
                    className="p-4 bg-white sm:p-6 dark:bg-gray-800 rounded-xl sm:rounded-2xl"
                  >
                    <Skeleton height={120} />
                  </div>
                )
              )}
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 md:gap-6">
                {currentBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {currentBooks.map((book) => (
                  <BookRow key={book.id} book={book} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6 sm:mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 bg-gray-100 rounded-lg sm:rounded-xl dark:bg-gray-700 disabled:opacity-50"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {(() => {
                  const pages = [];
                  const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;

                  let startPage = Math.max(
                    1,
                    currentPage - Math.floor(maxVisiblePages / 2)
                  );
                  let endPage = Math.min(
                    totalPages,
                    startPage + maxVisiblePages - 1
                  );

                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }

                  for (let page = startPage; page <= endPage; page++) {
                    pages.push(
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl transition-colors ${
                          currentPage === page
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }

                  return pages;
                })()}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 bg-gray-100 rounded-lg sm:rounded-xl dark:bg-gray-700 disabled:opacity-50"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Results Info - Fixed positioning */}
        {!loading && (
          <div className="mt-6 sm:mt-8">
            <div className="inline-flex flex-col items-center w-full gap-2 px-4 py-3 bg-white sm:flex-row dark:bg-gray-800 rounded-xl sm:w-auto">
              <span className="text-sm text-center text-gray-600 sm:text-base dark:text-gray-400 sm:text-left">
                Showing <span className="font-semibold">{startIndex + 1}</span>{" "}
                -{" "}
                <span className="font-semibold">
                  {Math.min(startIndex + booksPerPage, filteredBooks.length)}
                </span>{" "}
                of <span className="font-semibold">{filteredBooks.length}</span>{" "}
                books
              </span>
              {totalPages > 1 && (
                <>
                  <span className="hidden mx-2 sm:block">•</span>
                  <span className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                    Page <span className="font-semibold">{currentPage}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Quick Stats Footer */}
        <div className="pt-4 mt-6 border-t border-gray-200 sm:mt-8 sm:pt-6 dark:border-gray-800">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
              <span>{books.filter((b) => b.available).length} Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></div>
              <span>{genres.length - 1} Genres</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-purple-500 rounded-full"></div>
              <span>{books.length} Total Books</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
