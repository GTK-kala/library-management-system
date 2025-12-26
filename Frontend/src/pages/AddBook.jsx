import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { languages, genre } from "../assets/Data/data.js";
import {
  X,
  Tag,
  User,
  Hash,
  Plus,
  Info,
  Copy,
  Check,
  Globe,
  Upload,
  Layers,
  Calendar,
  BookOpen,
  FileText,
  ChevronUp,
  ArrowLeft,
  BookMarked,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publication_year: new Date().getFullYear(),
    publisher: "",
    total_copies: 1,
    description: "",
    language: "English",
    pages: 1,
    edition: "First Edition",
  });

  const [authors, setAuthors] = useState([""]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenreToggle = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleAddAuthor = () => {
    setAuthors([...authors, ""]);
  };

  const handleRemoveAuthor = (index) => {
    if (authors.length > 1) {
      const newAuthors = authors.filter((_, i) => i !== index);
      setAuthors(newAuthors);
    }
  };

  const handleAuthorChange = (index, value) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);

    // Update main author field with first author
    if (index === 0) {
      setFormData({ ...formData, author: value });
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG, PNG, JPG, WebP)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Scroll event listener for Back to Top button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = localStorage.getItem("id");
    const bookData = {
      ...formData,
      authors: authors.filter((author) => author.trim() !== ""),
      genres: selectedGenres,
      coverImage: coverPreview,
      total_copies: formData.total_copies,
    };
    console.log(bookData);
    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/api/book/add/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        resetForm();
        toast.success(data.message, {
          duration: 2000,
          icon: "📚",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      isbn: "",
      genre: "",
      publication_year: new Date().getFullYear(),
      publisher: "",
      total_copies: 1,
      description: "",
      language: "English",
      pages: 0,
      edition: "First Edition",
    });
    setSelectedGenres([]);
    setAuthors([""]);
    setCoverPreview(null);
  };

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
              {/* Back Button - Exactly like CalendarView */}
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
                Add New Book
              </h1>
              <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                Fill in the details to add a new book to the library
              </p>
            </div>

            {/* Quick Stats on Mobile */}
            <div className="grid w-full grid-cols-3 gap-2 sm:hidden">
              <div className="p-2 bg-white rounded-lg dark:bg-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Genres
                </p>
                <p className="font-semibold">{selectedGenres.length}</p>
              </div>
              <div className="p-2 bg-white rounded-lg dark:bg-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Authors
                </p>
                <p className="font-semibold">
                  {authors.filter((a) => a.trim()).length}
                </p>
              </div>
              <div className="p-2 bg-white rounded-lg dark:bg-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Copies
                </p>
                <p className="font-semibold">{formData.total_copies}</p>
              </div>
            </div>
          </div>

          {/* Progress Steps - Responsive */}
          <div className="flex items-center justify-between pb-2 mb-6 overflow-x-auto sm:mb-8">
            {["Basic Info", "Details", "Additional", "Review"].map(
              (step, index) => (
                <div key={step} className="flex items-center flex-shrink-0">
                  <div
                    className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-sm sm:text-base ${
                      index === 0
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    {index === 0 ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="hidden ml-2 text-sm font-medium sm:inline">
                    {step}
                  </span>
                  <span className="ml-1 text-xs font-medium sm:hidden">
                    {step.split(" ")[0]}
                  </span>
                  {index < 3 && (
                    <div
                      className={`h-1 w-4 sm:w-8 md:w-16 mx-1 sm:mx-2 ${
                        index === 0
                          ? "bg-gradient-to-r from-blue-600 to-purple-600"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    ></div>
                  )}
                </div>
              )
            )}
          </div>
        </motion.div>

        <form onSubmit={(e) => HandleSubmit(e)}>
          <div className="flex flex-col gap-4 lg:flex-row sm:gap-6 lg:gap-8">
            {/* Left Column - Cover Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/3"
            >
              {/* Cover Image Upload */}
              <div className="p-4 mb-4 bg-white shadow-sm sm:p-6 sm:mb-6 dark:bg-gray-800 rounded-xl sm:rounded-2xl sm:shadow-lg">
                <h2 className="flex items-center mb-4 text-lg font-bold sm:mb-6 sm:text-xl">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Book Cover
                </h2>

                <div className="space-y-4">
                  {/* Cover Preview */}
                  <div className="relative">
                    <div
                      className={`aspect-[3/4] w-full rounded-lg sm:rounded-xl border-2 border-dashed ${
                        coverPreview
                          ? "border-transparent"
                          : "border-gray-300 dark:border-gray-600"
                      } overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}
                    >
                      {coverPreview ? (
                        <img
                          src={coverPreview}
                          alt="Book cover preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="p-4 text-center sm:p-6">
                          <BookOpen className="w-8 h-8 mx-auto mb-3 text-gray-400 sm:w-12 sm:h-12" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No cover image
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            Upload a cover image
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Remove Button */}
                    {coverPreview && (
                      <button
                        type="button"
                        onClick={() => setCoverPreview(null)}
                        className="absolute p-1.5 sm:p-2 text-white transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div>
                    <label className="block w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleCoverUpload(e)}
                        className="hidden"
                        id="cover-upload"
                      />
                      <div className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-center text-white transition-shadow cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl hover:shadow-lg">
                        <div className="flex items-center justify-center space-x-2">
                          <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Upload Cover Image</span>
                        </div>
                      </div>
                    </label>
                    <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                      JPEG, PNG, or WebP (max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats - Desktop */}
              <div className="hidden p-4 text-white shadow-sm sm:block sm:p-6 sm:shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl">
                <h3 className="mb-3 font-bold sm:mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Books in Library</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Available Copies</span>
                    <span className="font-bold">{formData.total_copies}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Genre Added</span>
                    <span className="font-bold">{selectedGenres.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Authors</span>
                    <span className="font-bold">
                      {authors.filter((a) => a.trim()).length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Help Tips - Mobile */}
              <div className="p-4 sm:hidden bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      Tips
                    </p>
                    <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                      • Fill all required fields marked with *
                      <br />• Add multiple authors if needed
                      <br />• Select relevant genres for better discovery
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form Fields */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/3"
            >
              <div className="p-4 mb-4 bg-white shadow-sm sm:p-6 sm:mb-6 dark:bg-gray-800 rounded-xl sm:rounded-2xl sm:shadow-lg">
                <h2 className="mb-4 text-lg font-bold sm:mb-6 sm:text-xl">
                  Book Information
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Book Title *
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(e) => handleChange(e)}
                        className="w-full py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-sm sm:text-base transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter book title"
                        required
                      />
                    </div>
                  </div>

                  {/* Authors (Multiple) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Authors *
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddAuthor()}
                        className="flex items-center text-xs text-blue-600 sm:text-sm dark:text-blue-400 hover:underline"
                      >
                        <Plus className="w-3 h-3 mr-1 sm:w-4 sm:h-4" />
                        Add Author
                      </button>
                    </div>

                    <div className="space-y-3">
                      {authors.map((author, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 sm:space-x-3"
                        >
                          <div className="relative flex-1">
                            <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                            <input
                              type="text"
                              value={author}
                              onChange={(e) =>
                                handleAuthorChange(index, e.target.value)
                              }
                              className="w-full py-2.5 sm:py-3 pl-9 sm:pl-12 pr-8 sm:pr-10 text-sm sm:text-base transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={`Author ${index + 1} name`}
                              required={index === 0}
                            />
                          </div>
                          {authors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveAuthor(index)}
                              className="flex-shrink-0 p-2 text-red-500 transition-colors rounded-lg sm:p-3 hover:bg-red-50 dark:hover:bg-red-900/30 sm:rounded-xl"
                            >
                              <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ISBN & Genre */}
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        ISBN *
                      </label>
                      <div className="relative">
                        <Hash className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                        <input
                          type="text"
                          name="isbn"
                          value={formData.isbn}
                          onChange={(e) => handleChange(e)}
                          className="w-full py-2.5 sm:py-3 pl-9 sm:pl-12 pr-4 text-sm sm:text-base transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter ISBN"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Primary Genre
                      </label>
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={(e) => handleChange(e)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a genre</option>
                        {genre.map((genre) => (
                          <option key={genre} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Additional Genres */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 sm:mb-3 dark:text-gray-300">
                      Additional Genres
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {genre.slice(0, 6).map((genre) => (
                        <button
                          key={genre}
                          type="button"
                          onClick={() => handleGenreToggle(genre)}
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full transition-all whitespace-nowrap ${
                            selectedGenres.includes(genre)
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{genre}</span>
                            {selectedGenres.includes(genre) && (
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    {genre.length > 6 && (
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {selectedGenres.length} genres selected
                      </p>
                    )}
                  </div>

                  {/* Publication Year & Publisher */}
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Publication Year
                      </label>
                      <div className="relative">
                        <Calendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                        <input
                          type="number"
                          name="publication_year"
                          value={formData.publication_year}
                          onChange={(e) => handleChange(e)}
                          min="1000"
                          max={new Date().getFullYear() + 5}
                          className="w-full py-2.5 sm:py-3 pl-9 sm:pl-12 pr-4 text-sm sm:text-base transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Year"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Publisher
                      </label>
                      <input
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={(e) => handleChange(e)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Publisher name"
                      />
                    </div>
                  </div>

                  {/* Copies & Language */}
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Total Copies *
                      </label>
                      <div className="relative">
                        <BookMarked className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                        <input
                          type="number"
                          name="total_copies"
                          value={formData.total_copies}
                          onChange={(e) => handleChange(e)}
                          min="1"
                          max="1000"
                          className="w-full py-2.5 sm:py-3 pl-9 sm:pl-12 pr-4 text-sm sm:text-base transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Number of copies"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Language
                      </label>
                      <div className="relative">
                        <Globe className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 sm:w-5 sm:h-5 left-3 sm:left-4 top-1/2" />
                        <select
                          name="language"
                          value={formData.language}
                          onChange={(e) => handleChange(e)}
                          className="w-full py-2.5 sm:py-3 pl-9 sm:pl-12 pr-4 text-sm sm:text-base transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {languages.slice(0, 5).map((lang) => (
                            <option key={lang} value={lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pages & Edition */}
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Number of Pages
                      </label>
                      <input
                        type="number"
                        name="pages"
                        value={formData.pages}
                        onChange={(e) => handleChange(e)}
                        min="1"
                        max="5000"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Total pages"
                      />
                    </div>

                    <div>
                      <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Edition
                      </label>
                      <input
                        type="text"
                        name="edition"
                        value={formData.edition}
                        onChange={(e) => handleChange(e)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., First Edition, Revised"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block mb-1.5 sm:mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <div className="relative">
                      <FileText className="absolute w-4 h-4 text-gray-400 sm:w-5 sm:h-5 left-3 sm:left-4 top-3 sm:top-4" />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={(e) => handleChange(e)}
                        rows="4"
                        className="w-full py-2.5 sm:py-3 pl-9 sm:pl-12 pr-4 text-sm sm:text-base transition-all border border-gray-300 outline-none resize-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter book description..."
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formData.description.length}/2000 characters
                      </p>
                      {formData.description.length > 1900 && (
                        <p className="text-xs text-orange-500">
                          {2000 - formData.description.length} characters left
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
                  <button
                    type="button"
                    onClick={() => navigate("/books")}
                    className="w-full sm:w-auto px-4 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-gray-800 transition-colors bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => resetForm()}
                    className="w-full sm:w-auto px-4 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white transition-shadow bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg sm:rounded-xl hover:shadow-lg"
                  >
                    Reset Form
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !formData.title ||
                    !formData.isbn ||
                    !formData.total_copies
                  }
                  className="w-full sm:w-auto px-4 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white transition-shadow bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-4 h-4 mr-2 sm:w-5 sm:h-5 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Book...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Plus className="w-4 h-4 mr-2 sm:w-5 sm:h-5" />
                      Add Book to Library
                    </span>
                  )}
                </button>
              </div>

              {/* Validation Summary - Mobile */}
              {(!formData.title ||
                !formData.isbn ||
                !formData.total_copies) && (
                <div className="p-3 mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 sm:hidden">
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">
                    Required fields missing:
                  </p>
                  <ul className="mt-1 text-xs text-red-500 dark:text-red-300">
                    {!formData.title && <li>• Book title is required</li>}
                    {!formData.isbn && <li>• ISBN is required</li>}
                    {!formData.total_copies && (
                      <li>• Number of copies is required</li>
                    )}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </form>

        {/* Footer Note */}
        <div className="pt-4 mt-6 border-t border-gray-200 sm:mt-8 sm:pt-6 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-center text-gray-500 sm:text-left dark:text-gray-400">
              All fields marked with * are required
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Copy className="w-3 h-3 mr-1" />
                <span>ISBN Validation</span>
              </div>
              <div className="flex items-center">
                <Layers className="w-3 h-3 mr-1" />
                <span>Auto-save Draft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed z-40 p-3 text-white transition-all duration-300 rounded-full shadow-lg bottom-6 right-4 sm:bottom-8 sm:right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      )}
    </div>
  );
};

export default AddBook;
