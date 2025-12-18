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
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Digital Book Collection",
      description:
        "Access thousands of books in digital format from anywhere, anytime.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Search System",
      description:
        "Find any book in seconds with our advanced search and filtering system.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Availability",
      description:
        "Your library never sleeps. Borrow and return books at any time.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description:
        "Your data is protected with enterprise-grade security measures.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Reading Analytics",
      description:
        "Track your reading habits and discover personalized recommendations.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
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
      icon: <BookMarked className="w-5 h-5" />,
    },
    {
      label: "Active Users",
      value: "5,000+",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Daily Borrows",
      value: "500+",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: "Satisfaction Rate",
      value: "98%",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="container px-4 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              LibraFlow
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Testimonials
            </a>
            <Link
              to="/login"
              className="px-6 py-2 text-white transition-shadow bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container px-4 py-16 mx-auto md:py-24">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20">
              <Zap className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Modern Library Management System
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Transform Your{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Library Experience
              </span>
            </h1>

            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
              A comprehensive digital library platform that combines powerful
              management tools with an intuitive user interface. Manage,
              discover, and enjoy books like never before.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>

              <Link
                to="/login"
                className="flex items-center justify-center px-8 py-4 text-lg font-semibold transition-all duration-300 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-xl hover:shadow-lg"
              >
                Explore Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-12 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
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
            className="relative"
          >
            {/* Animated Dashboard Preview */}
            <div className="relative overflow-hidden shadow-2xl rounded-2xl">
              <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
                {/* Mock Dashboard UI */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                    <div className="w-24 h-3 bg-gray-700 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-3 bg-gray-700 rounded"></div>
                    <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-20 p-4 rounded-xl bg-gradient-to-r from-blue-900/50 to-purple-900/50"
                    >
                      <div className="w-16 h-3 mb-2 bg-gray-600 rounded"></div>
                      <div className="w-12 h-6 bg-blue-500 rounded"></div>
                    </div>
                  ))}
                </div>

                <div className="h-48 p-4 mb-6 rounded-xl bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-32 h-3 bg-gray-600 rounded"></div>
                    <div className="w-16 h-3 bg-blue-500 rounded"></div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-10 h-10 mr-3 bg-gray-700 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="w-40 h-3 mb-1 bg-gray-600 rounded"></div>
                          <div className="w-24 h-2 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 p-4 rounded-xl bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                    <div className="w-24 h-3 mb-3 bg-gray-600 rounded"></div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <div className="w-20 h-2 bg-gray-700 rounded"></div>
                          <div className="w-10 h-2 bg-blue-500 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-32 p-4 rounded-xl bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                    <div className="w-24 h-3 mb-3 bg-gray-600 rounded"></div>
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-8 h-8 mr-3 bg-gray-700 rounded-full"></div>
                          <div className="flex-1">
                            <div className="w-20 h-2 mb-1 bg-gray-600 rounded"></div>
                            <div className="w-16 h-2 bg-gray-700 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute w-8 h-8 rounded-full -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
              <div className="absolute w-12 h-12 -bottom-4 -left-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse-slow"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute w-64 h-64 rounded-full -z-10 top-10 -right-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
            <div className="absolute w-64 h-64 rounded-full -z-10 bottom-10 -left-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-gray-800/50"
      >
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Everything You Need in a{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Modern Library
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Our platform combines powerful management tools with an intuitive
              interface designed for libraries of all sizes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 transition-shadow duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-xl"
              >
                <div
                  className={`h-16 w-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Get Started in{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                4 Easy Steps
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Join thousands of readers and start your digital library journey
              today.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-0 right-0 hidden h-1 transform -translate-y-1/2 lg:block top-1/2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative text-center"
                >
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-3xl font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                    {step.number}
                  </div>

                  <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
                    <div className="mb-4 text-4xl">{step.icon}</div>
                    <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-gray-800/50"
      >
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Loved by{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Readers Worldwide
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              See what our community of readers, librarians, and educators are
              saying.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white shadow-lg dark:bg-gray-800 rounded-2xl"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <p className="mb-6 italic text-gray-700 dark:text-gray-300">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-8 text-4xl font-bold md:text-5xl">
                Ready to Transform Your{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Library Experience?
                </span>
              </h2>

              <p className="max-w-3xl mx-auto mb-12 text-xl text-gray-600 dark:text-gray-300">
                Join thousands of libraries and readers who have already
                upgraded to the future of library management.
              </p>

              <div className="flex flex-col justify-center gap-6 sm:flex-row">
                <Link
                  to="/register"
                  className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>

                <Link
                  to="/login"
                  className="flex items-center justify-center px-8 py-4 text-lg font-semibold transition-all duration-300 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-xl hover:shadow-lg"
                >
                  Schedule a Demo
                  <Calendar className="w-5 h-5 ml-2" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    30K+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Books</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    98%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Satisfaction
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    24/7
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Support
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    50+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Countries
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center mb-6 space-x-3 md:mb-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                LibraFlow
              </span>
            </div>

            <div className="flex items-center mb-6 space-x-6 md:mb-0">
              <a
                href="#features"
                className="text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Testimonials
              </a>
              <Link
                to="/login"
                className="text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Sign In
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Globe className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">English</span>
            </div>
          </div>

          <div className="pt-8 mt-8 text-center border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} LibraFlow. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Made with ❤️ for book lovers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
