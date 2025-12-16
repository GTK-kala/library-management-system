import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { languages, genre } from "../assets/Data/data";
import {
  ArrowLeft,
  Upload,
  BookOpen,
  User,
  Hash,
  Tag,
  Calendar,
  BookMarked,
  Image as ImageIcon,
  Globe,
  FileText,
  Plus,
  X,
  Check,
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

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [authors, setAuthors] = useState([""]);

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
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG, PNG, JPG, WebP)");
        return;
      }

      // Validate file size (max 5MB)
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

  ////// API CALL TO THE BACKEND
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
      const url = `http://localhost:3001/api/book/add/${id}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
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
    <div className="min-h-screen px-4 pt-20 pb-8">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="p-2 transition-colors bg-gray-100 rounded-lg dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="mb-2 text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Add New Book
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill in the details to add a new book to the library
                </p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {["Basic Info", "Details", "Additional", "Review"].map(
              (step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      index === 0
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    {index === 0 ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className="hidden ml-2 font-medium md:inline">
                    {step}
                  </span>
                  {index < 3 && (
                    <div
                      className={`h-1 w-16 mx-2 ${
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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Cover Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              {/* Cover Image Upload */}
              <div className="p-6 mb-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
                <h2 className="flex items-center mb-6 text-xl font-bold">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Book Cover
                </h2>

                <div className="space-y-4">
                  {/* Cover Preview */}
                  <div className="relative">
                    <div
                      className={`aspect-[3/4] w-full rounded-xl border-2 border-dashed ${
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
                        <div className="p-6 text-center">
                          <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-500 dark:text-gray-400">
                            No cover image
                          </p>
                          <p className="text-sm text-gray-400">
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
                        className="absolute p-2 text-white transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
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
                      <div className="w-full px-4 py-3 font-medium text-center text-white transition-shadow cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg">
                        <div className="flex items-center justify-center space-x-2">
                          <Upload className="w-5 h-5" />
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

              {/* Quick Stats */}
              <div className="p-6 text-white shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                <h3 className="mb-4 font-bold">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Books in Library</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Available Copies</span>
                    <span className="font-bold">{formData.totalCopies}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Genre Added</span>
                    <span className="font-bold">{selectedGenres.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Authors</span>
                    <span className="font-bold">
                      {authors.filter((a) => a.trim()).length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form Fields */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="p-6 mb-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
                <h2 className="mb-6 text-xl font-bold">Book Information</h2>

                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Book Title *
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(e) => handleChange(e)}
                        className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Author
                      </button>
                    </div>

                    <div className="space-y-3">
                      {authors.map((author, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="relative flex-1">
                            <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                            <input
                              type="text"
                              value={author}
                              onChange={(e) =>
                                handleAuthorChange(index, e.target.value)
                              }
                              className="w-full py-3 pl-12 pr-10 transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={`Author ${index + 1} name`}
                              required={index === 0}
                            />
                          </div>
                          {authors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveAuthor(index)}
                              className="p-3 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ISBN & Genre */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        ISBN *
                      </label>
                      <div className="relative">
                        <Hash className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                        <input
                          type="text"
                          name="isbn"
                          value={formData.isbn}
                          onChange={(e) => handleChange(e)}
                          className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter ISBN"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Primary Genre
                      </label>
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={(e) => handleChange(e)}
                        className="w-full px-4 py-3 transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Additional Genres
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {genre.map((genre) => (
                        <button
                          key={genre}
                          type="button"
                          onClick={() => handleGenreToggle(genre)}
                          className={`px-4 py-2 rounded-full transition-all ${
                            selectedGenres.includes(genre)
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Tag className="w-4 h-4" />
                            <span>{genre}</span>
                            {selectedGenres.includes(genre) && (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Publication Year & Publisher */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Publication Year
                      </label>
                      <div className="relative">
                        <Calendar className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                        <input
                          type="number"
                          name="publication_year"
                          value={formData.publication_year}
                          onChange={(e) => handleChange(e)}
                          min="1000"
                          max={new Date().getFullYear() + 5}
                          className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Year"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Publisher
                      </label>
                      <input
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={(e) => handleChange(e)}
                        className="w-full px-4 py-3 transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Publisher name"
                      />
                    </div>
                  </div>

                  {/* Copies & Language */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Total Copies *
                      </label>
                      <div className="relative">
                        <BookMarked className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                        <input
                          type="number"
                          name="total_copies"
                          value={formData.total_copies}
                          onChange={(e) => handleChange(e)}
                          min="1"
                          max="1000"
                          className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Number of copies"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Language
                      </label>
                      <div className="relative">
                        <Globe className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                        <select
                          name="language"
                          value={formData.language}
                          onChange={(e) => handleChange(e)}
                          className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {languages.map((lang) => (
                            <option key={lang} value={lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pages & Edition */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Number of Pages
                      </label>
                      <input
                        type="number"
                        name="pages"
                        value={formData.pages}
                        onChange={(e) => handleChange(e)}
                        min="1"
                        max="5000"
                        className="w-full px-4 py-3 transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Total pages"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Edition
                      </label>
                      <input
                        type="text"
                        name="edition"
                        value={formData.edition}
                        onChange={(e) => handleChange(e)}
                        className="w-full px-4 py-3 transition-all border border-gray-300 outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., First Edition, Revised"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <div className="relative">
                      <FileText className="absolute w-5 h-5 text-gray-400 left-4 top-4" />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={(e) => handleChange(e)}
                        rows="4"
                        className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 outline-none resize-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter book description..."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {formData.description.length}/2000 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/books")}
                  className="w-full px-8 py-3 font-medium text-gray-800 transition-colors bg-gray-100 sm:w-auto dark:bg-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>

                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => resetForm()}
                    className="px-8 py-3 font-medium text-white transition-shadow bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:shadow-lg"
                  >
                    Reset Form
                  </button>

                  <button
                    type="submit"
                    disabled={
                      loading ||
                      !formData.title ||
                      !formData.isbn ||
                      !formData.total_copies
                    }
                    className="px-8 py-3 font-medium text-white transition-shadow bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="w-5 h-5 mr-2 animate-spin"
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
                      <span className="flex items-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Book to Library
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
