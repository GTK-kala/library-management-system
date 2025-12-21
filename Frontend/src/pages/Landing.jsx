import { useState } from "react"; // Added for mobile menu
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Search,
  Clock,
  Shield,
  BarChart3,
  Star,
  ArrowRight,
  CheckCircle,
  BookMarked,
  Calendar,
  TrendingUp,
  Zap,
  Globe,
  Menu,
  X,
} from "lucide-react";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Digital Book Collection",
      description:
        "Access thousands of books in digital format from anywhere, anytime.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Search className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Smart Search System",
      description:
        "Find any book in seconds with our advanced search and filtering system.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "24/7 Availability",
      description:
        "Your library never sleeps. Borrow and return books at any time.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Secure Platform",
      description:
        "Your data is protected with enterprise-grade security measures.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Reading Analytics",
      description:
        "Track your reading habits and discover personalized recommendations.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Community Features",
      description:
        "Join book clubs, share reviews, and connect with fellow readers.",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Sign up in seconds with your email address",
      icon: "👤",
    },
    {
      number: "02",
      title: "Browse Collection",
      description: "Explore thousands of books across all genres",
      icon: "📚",
    },
    {
      number: "03",
      title: "Borrow Books",
      description: "Borrow books instantly with one click",
      icon: "📖",
    },
    {
      number: "04",
      title: "Enjoy Reading",
      description: "Read anytime, anywhere on any device",
      icon: "🌟",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "University Student",
      content:
        "This library system revolutionized how I study! The digital collection saved me hours of searching.",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Research Scholar",
      content:
        "The search functionality is incredibly powerful. Found rare academic papers I couldn't find elsewhere.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emma Williams",
      role: "Book Club President",
      content:
        "Our book club has grown 300% since we started using LibraFlow. The community features are amazing!",
      rating: 4,
      avatar: "EW",
    },
  ];

  const stats = [
    {
      label: "Books Available",
      value: "10,000+",
      icon: <BookMarked className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      label: "Active Users",
      value: "5,000+",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      label: "Daily Borrows",
      value: "500+",
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      label: "Satisfaction Rate",
      value: "98%",
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation - Fixed for mobile */}
      <nav className="container sticky top-0 z-50 px-3 py-4 mx-auto sm:px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
              <BookOpen className="w-4 h-4 text-white sm:w-6 sm:h-6" />
            </div>
            <span className="text-lg font-bold text-transparent sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              LibraFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-4 md:flex lg:space-x-6">
            <a
              href="#features"
              className="px-2 py-1 text-sm text-gray-600 transition-colors lg:text-base dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="px-2 py-1 text-sm text-gray-600 transition-colors lg:text-base dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="px-2 py-1 text-sm text-gray-600 transition-colors lg:text-base dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Testimonials
            </a>
            <Link
              to="/login"
              className="px-4 py-4 text-sm text-white transition-shadow sm:px-6 sm:py-2 sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 bg-gray-100 rounded-lg md:hidden dark:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pb-4 mt-4 border-b border-gray-200 md:hidden dark:border-gray-700"
          >
            <div className="flex flex-col space-y-3">
              <a
                href="#features"
                className="py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <Link
                to="/login"
                className="py-2 text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Optimized for mobile */}
      <section className="container px-3 py-8 mx-auto sm:px-4 sm:py-16">
        <div className="flex flex-col items-center lg:grid lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 w-full mt-8 lg:order-1 lg:mt-0"
          >
            <div className="inline-flex items-center px-3 py-1.5 mb-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20">
              <Zap className="w-3 h-3 mr-2 text-blue-600 sm:w-4 sm:h-4 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-600 sm:text-sm dark:text-blue-400">
                Modern Library Management System
              </span>
            </div>

            <h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Transform Your{" "}
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text sm:inline">
                Library Experience
              </span>
            </h1>

            <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg dark:text-gray-300">
              A comprehensive digital library platform that combines powerful
              management tools with an intuitive user interface. Manage,
              discover, and enjoy books like never before.
            </p>

            <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:gap-4">
              <Link
                to="/register"
                className="flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 sm:px-8 sm:py-4 sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 sm:w-5 sm:h-5" />
              </Link>

              <Link
                to="/login"
                className="flex items-center justify-center px-6 py-3 text-sm font-semibold transition-all duration-300 bg-white border border-gray-300 sm:px-8 sm:py-4 sm:text-base dark:bg-gray-800 dark:border-gray-700 rounded-xl hover:shadow-lg"
              >
                Explore Demo
              </Link>
            </div>

            {/* Stats - Improved for mobile */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 border border-gray-200 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl dark:border-gray-700"
                >
                  <div className="flex items-center justify-center mb-1 sm:mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold text-transparent sm:text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative order-1 w-full lg:order-2"
          >
            {/* Animated Dashboard Preview - Simplified for mobile */}
            <div className="relative overflow-hidden shadow-xl sm:shadow-2xl rounded-xl sm:rounded-2xl">
              <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800">
                {/* Mock Dashboard UI - Simplified */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-lg sm:w-8 sm:h-8"></div>
                    <div className="w-16 h-2 bg-gray-700 rounded sm:w-24 sm:h-3"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 bg-gray-700 rounded sm:w-16 sm:h-3"></div>
                    <div className="w-6 h-6 bg-gray-700 rounded-full sm:w-8 sm:h-8"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 sm:gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-16 p-2 rounded-lg sm:h-20 sm:p-4 sm:rounded-xl bg-gradient-to-r from-blue-900/50 to-purple-900/50"
                    >
                      <div className="w-12 h-2 mb-1 bg-gray-600 rounded sm:w-16 sm:h-3 sm:mb-2"></div>
                      <div className="w-8 h-4 bg-blue-500 rounded sm:w-12 sm:h-6"></div>
                    </div>
                  ))}
                </div>

                <div className="h-32 p-3 mb-4 rounded-lg sm:h-48 sm:p-4 sm:rounded-xl bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div className="w-20 h-2 bg-gray-600 rounded sm:w-32 sm:h-3"></div>
                    <div className="w-12 h-2 bg-blue-500 rounded sm:w-16 sm:h-3"></div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-8 h-8 mr-2 bg-gray-700 rounded-lg sm:w-10 sm:h-10 sm:mr-3"></div>
                        <div className="flex-1">
                          <div className="w-24 h-2 mb-1 bg-gray-600 rounded sm:w-40 sm:h-3"></div>
                          <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Improved for mobile */}
      <section
        id="features"
        className="py-12 sm:py-20 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-gray-800/50"
      >
        <div className="container px-3 mx-auto sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-8 text-center sm:mb-16"
          >
            <h2 className="mb-4 text-xl font-bold leading-snug sm:text-2xl md:text-3xl lg:text-4xl">
              Everything You Need in a{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Modern Library
              </span>
            </h2>
            <p className="max-w-3xl px-2 mx-auto text-sm text-gray-600 sm:text-base md:text-lg dark:text-gray-300">
              Our platform combines powerful management tools with an intuitive
              interface designed for libraries of all sizes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="p-4 transition-shadow duration-300 bg-white shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 rounded-xl sm:rounded-2xl hover:shadow-lg"
              >
                <div
                  className={`h-12 w-12 sm:h-16 sm:w-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-base font-bold sm:text-lg lg:text-xl">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Improved for mobile */}
      <section id="how-it-works" className="py-12 sm:py-20">
        <div className="container px-3 mx-auto sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-8 text-center sm:mb-16"
          >
            <h2 className="mb-4 text-xl font-bold leading-snug sm:text-2xl md:text-3xl lg:text-4xl">
              Get Started in{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                4 Easy Steps
              </span>
            </h2>
            <p className="max-w-3xl px-2 mx-auto text-sm text-gray-600 sm:text-base md:text-lg dark:text-gray-300">
              Join thousands of readers and start your digital library journey
              today.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line - Hidden on small screens */}
            <div className="absolute left-0 right-0 hidden h-1 transform -translate-y-1/2 lg:block top-1/2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.2 }}
                  className="relative text-center"
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-lg font-bold text-white rounded-full sm:w-16 sm:h-16 lg:w-20 lg:h-20 sm:text-xl lg:text-2xl bg-gradient-to-r from-blue-500 to-purple-500">
                    {step.number}
                  </div>

                  <div className="p-4 bg-white shadow-md sm:p-6 dark:bg-gray-800 rounded-xl sm:rounded-2xl">
                    <div className="mb-3 text-2xl sm:text-3xl lg:text-4xl">
                      {step.icon}
                    </div>
                    <h3 className="mb-2 text-sm font-bold sm:text-base lg:text-lg">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center sm:mt-16">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 sm:px-8 sm:py-4 sm:text-base lg:text-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Start Your Free Trial
              <ArrowRight className="w-4 h-4 ml-2 sm:w-5 sm:h-5" />
            </Link>
            <p className="mt-3 text-xs text-gray-500 sm:mt-4 sm:text-sm dark:text-gray-400">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Improved for mobile */}
      <section
        id="testimonials"
        className="py-12 sm:py-20 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-gray-800/50"
      >
        <div className="container px-3 mx-auto sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-8 text-center sm:mb-16"
          >
            <h2 className="mb-4 text-xl font-bold leading-snug sm:text-2xl md:text-3xl lg:text-4xl">
              Loved by{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Readers Worldwide
              </span>
            </h2>
            <p className="max-w-3xl px-2 mx-auto text-sm text-gray-600 sm:text-base md:text-lg dark:text-gray-300">
              See what our community of readers, librarians, and educators are
              saying.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 rounded-xl sm:rounded-2xl"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white rounded-full sm:w-12 sm:h-12 sm:mr-4 bg-gradient-to-r from-blue-500 to-purple-500">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold sm:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <p className="mb-4 text-xs italic leading-relaxed text-gray-700 sm:text-sm dark:text-gray-300">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Improved for mobile */}
      <section className="py-12 sm:py-20">
        <div className="container px-3 mx-auto sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-6 text-xl font-bold leading-snug sm:text-2xl md:text-3xl lg:text-4xl">
                Ready to Transform Your{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Library Experience?
                </span>
              </h2>

              <p className="max-w-3xl px-2 mx-auto mb-8 text-sm text-gray-600 sm:text-base md:text-lg dark:text-gray-300">
                Join thousands of libraries and readers who have already
                upgraded to the future of library management.
              </p>

              <div className="flex flex-col justify-center gap-3 mb-8 sm:flex-row sm:gap-4">
                <Link
                  to="/register"
                  className="flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 sm:px-8 sm:py-4 sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 sm:w-5 sm:h-5" />
                </Link>

                <Link
                  to="/login"
                  className="flex items-center justify-center px-6 py-3 text-sm font-semibold transition-all duration-300 bg-white border border-gray-300 sm:px-8 sm:py-4 sm:text-base dark:bg-gray-800 dark:border-gray-700 rounded-xl hover:shadow-lg"
                >
                  Schedule a Demo
                  <Calendar className="w-4 h-4 ml-2 sm:w-5 sm:h-5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-4 sm:gap-6 lg:gap-8">
                <div className="p-3 text-center sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="text-lg font-bold text-blue-600 sm:text-xl md:text-2xl lg:text-3xl dark:text-blue-400">
                    30K+
                  </div>
                  <div className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                    Books
                  </div>
                </div>
                <div className="p-3 text-center sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="text-lg font-bold text-purple-600 sm:text-xl md:text-2xl lg:text-3xl dark:text-purple-400">
                    98%
                  </div>
                  <div className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                    Satisfaction
                  </div>
                </div>
                <div className="p-3 text-center sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="text-lg font-bold text-green-600 sm:text-xl md:text-2xl lg:text-3xl dark:text-green-400">
                    24/7
                  </div>
                  <div className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                    Support
                  </div>
                </div>
                <div className="p-3 text-center sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="text-lg font-bold text-orange-600 sm:text-xl md:text-2xl lg:text-3xl dark:text-orange-400">
                    50+
                  </div>
                  <div className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                    Countries
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Improved for mobile */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container px-3 mx-auto sm:px-4">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <BookOpen className="w-4 h-4 text-white sm:w-6 sm:h-6" />
              </div>
              <span className="text-lg font-bold text-transparent sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                LibraFlow
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <a
                href="#features"
                className="px-1 text-xs text-gray-600 transition-colors sm:text-sm dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="px-1 text-xs text-gray-600 transition-colors sm:text-sm dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="px-1 text-xs text-gray-600 transition-colors sm:text-sm dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Testimonials
              </a>
              <Link
                to="/login"
                className="px-1 text-xs text-gray-600 transition-colors sm:text-sm dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Sign In
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
              <span className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                English
              </span>
            </div>
          </div>

          <div className="pt-6 mt-6 text-center border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              © {new Date().getFullYear()} LibraFlow. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              Made by Khalid for book lovers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
