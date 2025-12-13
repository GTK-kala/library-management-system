// src/pages/Books.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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

  const genres = [
    "all",
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "Biography",
    "History",
    "Fantasy",
  ];

  const mockBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      rating: 4.5,
      available: true,
      year: 1925,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      rating: 4.8,
      available: true,
      year: 1960,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      rating: 4.7,
      available: false,
      year: 1949,
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Fiction",
      rating: 4.6,
      available: true,
      year: 1813,
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      rating: 4.9,
      available: true,
      year: 1937,
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Fiction",
      rating: 4.2,
      available: true,
      year: 1951,
    },
    {
      id: 7,
      title: "The Da Vinci Code",
      author: "Dan Brown",
      genre: "Mystery",
      rating: 4.1,
      available: true,
      year: 2003,
    },
    {
      id: 8,
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Fiction",
      rating: 4.3,
      available: true,
      year: 1988,
    },
    {
      id: 9,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "Non-Fiction",
      rating: 4.7,
      available: true,
      year: 2011,
    },
    {
      id: 10,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self Help",
      rating: 4.8,
      available: true,
      year: 2018,
    },
    {
      id: 11,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Mystery",
      rating: 4.5,
      available: false,
      year: 2019,
    },
    {
      id: 12,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Science Fiction",
      rating: 4.9,
      available: true,
      year: 2021,
    },
  ];

  useEffect(() => {
    // Simulate API call
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
      className="overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-xl"
    >
      <div className="p-6 hover:cursor-pointer">
        {/* Book Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
            <BookOpen className="text-white h-7 w-7" />
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
            </button>
            <button className="p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Eye className="w-5 h-5 text-gray-400 hover:text-blue-500" />
            </button>
          </div>
        </div>

        {/* Book Info */}
        <h3 className="mb-2 text-lg font-bold line-clamp-1">{book.title}</h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          by {book.author}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(book.rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {book.rating}
          </span>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm">
          <span className="px-3 py-1 text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
            {book.genre}
          </span>
          <span className="text-gray-500">{book.year}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <button
          className={`w-full py-3 rounded-xl font-medium transition-colors ${
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
      className="p-6 mb-4 transition-shadow bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-xl"
    >
      <div className="flex items-center space-x-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
          <BookOpen className="w-8 h-8 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                by {book.author}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                {book.genre}
              </span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 text-sm">{book.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">{book.year}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  book.available
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300"
                }`}
              >
                {book.available ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </button>
              <button
                className={`px-6 py-2 rounded-xl font-medium transition-colors ${
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
    <div className="min-h-screen px-4 pt-20 pb-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Book Catalog
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and borrow from our extensive collection
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              placeholder="Search books by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-white shadow-lg dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedGenre === genre
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {genre === "all" ? "All Genres" : genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl ${
                  viewMode === "grid"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl ${
                  viewMode === "list"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Books Grid/List */}
        {loading ? (
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }`}
          >
            {Array(viewMode === "grid" ? 8 : 4)
              .fill(0)
              .map((_, i) =>
                viewMode === "grid" ? (
                  <div
                    key={i}
                    className="p-6 bg-white dark:bg-gray-800 rounded-2xl"
                  >
                    <Skeleton height={150} />
                  </div>
                ) : (
                  <div
                    key={i}
                    className="p-6 bg-white dark:bg-gray-800 rounded-2xl"
                  >
                    <Skeleton height={100} />
                  </div>
                )
              )}
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {currentBooks.map((book) => (
                  <BookRow key={book.id} book={book} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8 space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 bg-gray-100 rounded-xl dark:bg-gray-700 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        currentPage === page
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 bg-gray-100 rounded-xl dark:bg-gray-700 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Results Info */}
        {!loading && (
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} -{" "}
            {Math.min(startIndex + booksPerPage, filteredBooks.length)} of{" "}
            {filteredBooks.length} books
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
