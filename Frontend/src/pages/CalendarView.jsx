import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Users,
  BookOpen,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CalendarDays,
  BookMarked,
  UserCheck,
  Bell,
  RefreshCw,
  ArrowLeft,
  Printer,
  Menu,
  X,
  ChevronUp,
} from "lucide-react";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Mock events data (in real app, this would come from API)
  const mockEvents = [
    {
      id: 1,
      title: "Book Return Deadline",
      description: "Last day to return borrowed books",
      start: new Date(2024, 1, 15, 10, 0),
      end: new Date(2024, 1, 15, 17, 0),
      type: "deadline",
      color: "bg-red-100 border-red-300 text-red-700",
      icon: <AlertCircle className="w-4 h-4" />,
      participants: 45,
      location: "Main Library",
      status: "upcoming",
    },
    {
      id: 2,
      title: "New Book Arrival",
      description: "New fiction books added to collection",
      start: new Date(2024, 1, 18, 9, 0),
      end: new Date(2024, 1, 18, 11, 0),
      type: "arrival",
      color: "bg-green-100 border-green-300 text-green-700",
      icon: <BookOpen className="w-4 h-4" />,
      participants: 0,
      location: "Catalog Section",
      status: "completed",
    },
    {
      id: 3,
      title: "Library Workshop",
      description: "Digital literacy workshop for students",
      start: new Date(2024, 1, 20, 14, 0),
      end: new Date(2024, 1, 20, 16, 0),
      type: "workshop",
      color: "bg-blue-100 border-blue-300 text-blue-700",
      icon: <Users className="w-4 h-4" />,
      participants: 25,
      location: "Conference Room",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Monthly Maintenance",
      description: "System maintenance and book inventory",
      start: new Date(2024, 1, 22, 8, 0),
      end: new Date(2024, 1, 22, 12, 0),
      type: "maintenance",
      color: "bg-yellow-100 border-yellow-300 text-yellow-700",
      icon: <Clock className="w-4 h-4" />,
      participants: 8,
      location: "Entire Library",
      status: "scheduled",
    },
    {
      id: 5,
      title: "Author Meet & Greet",
      description: "Meet local author Sarah Johnson",
      start: new Date(2024, 1, 25, 15, 0),
      end: new Date(2024, 1, 25, 17, 0),
      type: "event",
      color: "bg-purple-100 border-purple-300 text-purple-700",
      icon: <UserCheck className="w-4 h-4" />,
      participants: 60,
      location: "Auditorium",
      status: "upcoming",
    },
    {
      id: 6,
      title: "Book Club Meeting",
      description: "Monthly book club discussion",
      start: new Date(2024, 1, 28, 18, 0),
      end: new Date(2024, 1, 28, 20, 0),
      type: "club",
      color: "bg-indigo-100 border-indigo-300 text-indigo-700",
      icon: <BookMarked className="w-4 h-4" />,
      participants: 20,
      location: "Reading Room",
      status: "upcoming",
    },
    {
      id: 7,
      title: "Overdue Notices",
      description: "Send overdue book notifications",
      start: new Date(2024, 1, 29, 9, 0),
      end: new Date(2024, 1, 29, 10, 0),
      type: "notification",
      color: "bg-orange-100 border-orange-300 text-orange-700",
      icon: <Bell className="w-4 h-4" />,
      participants: 0,
      location: "Admin Office",
      status: "scheduled",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
    }, 1000);

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

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Navigation functions
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + direction);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else {
      newDate.setDate(newDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get events for current month
  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get days in month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({ date, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    // Next month days
    const totalCells = 42; // 6 weeks
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const EventDetailsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/50 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-2 bg-white shadow-xl rounded-xl sm:rounded-2xl dark:bg-gray-800"
      >
        {selectedEvent && (
          <>
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="pr-2">
                  <div className="flex items-center gap-2 mb-1 sm:gap-3 sm:mb-2">
                    <div
                      className={`p-1.5 rounded-lg sm:p-2 ${
                        selectedEvent.color.split(" ")[0]
                      }`}
                    >
                      {selectedEvent.icon}
                    </div>
                    <h3 className="text-lg font-bold sm:text-xl">
                      {selectedEvent.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 sm:gap-2 sm:text-sm dark:text-gray-400">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    {formatDate(selectedEvent.start)} •{" "}
                    {selectedEvent.start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {selectedEvent.end.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-1.5 text-gray-400 rounded-lg sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="mb-1 text-xs font-semibold text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300">
                    Description
                  </h4>
                  <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <h4 className="mb-1 text-xs font-semibold text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300">
                      Location
                    </h4>
                    <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                      {selectedEvent.location}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-1 text-xs font-semibold text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300">
                      Participants
                    </h4>
                    <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                      {selectedEvent.participants} people
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-1 text-xs font-semibold text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300">
                    Status
                  </h4>
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs rounded-full sm:px-3 sm:py-1 sm:text-sm ${
                      selectedEvent.status === "completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                        : selectedEvent.status === "upcoming"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                    }`}
                  >
                    {selectedEvent.status === "completed" ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1 sm:w-4 sm:h-4" />
                        Completed
                      </>
                    ) : selectedEvent.status === "upcoming" ? (
                      <>
                        <Clock className="w-3 h-3 mr-1 sm:w-4 sm:h-4" />
                        Upcoming
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 mr-1 sm:w-4 sm:h-4" />
                        Scheduled
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 p-4 border-t border-gray-200 sm:gap-3 sm:p-6 dark:border-gray-700">
              <button className="flex-1 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl hover:shadow-lg">
                <Edit className="inline w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2" />
                Edit Event
              </button>
              <button className="px-3 py-2 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );

  const AddEventModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/50 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-2 bg-white shadow-xl rounded-xl sm:rounded-2xl dark:bg-gray-800"
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 sm:p-2 dark:from-blue-900/20 dark:to-purple-900/20">
                <CalendarIcon className="w-4 h-4 text-blue-600 sm:w-5 sm:h-5 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl">Add New Event</h3>
            </div>
            <button
              onClick={() => setShowAddEventModal(false)}
              className="p-1.5 text-gray-400 rounded-lg sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <form className="space-y-3 sm:space-y-4">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300">
                Event Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg sm:px-4 sm:py-2.5 sm:rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter event title"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg sm:px-4 sm:py-2.5 sm:rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg sm:px-4 sm:py-2.5 sm:rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300">
                Event Type
              </label>
              <select className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg sm:px-4 sm:py-2.5 sm:rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="deadline">Deadline</option>
                <option value="arrival">New Arrival</option>
                <option value="workshop">Workshop</option>
                <option value="maintenance">Maintenance</option>
                <option value="event">Special Event</option>
                <option value="club">Book Club</option>
                <option value="notification">Notification</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300">
                Description
              </label>
              <textarea
                rows={2}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg sm:px-4 sm:py-2.5 sm:rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter event description"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm dark:text-gray-300">
                Location
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg sm:px-4 sm:py-2.5 sm:rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter location"
              />
            </div>
          </form>
        </div>

        <div className="flex gap-2 p-4 border-t border-gray-200 sm:gap-3 sm:p-6 dark:border-gray-700">
          <button className="flex-1 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl hover:shadow-lg">
            Create Event
          </button>
          <button
            onClick={() => setShowAddEventModal(false)}
            className="px-3 py-2 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );

  const days = getDaysInMonth();
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const today = new Date();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-3 py-4 mx-auto max-w-7xl sm:px-4 sm:py-8">
        {/* Header with Return Button */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col justify-between gap-3 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:mb-6">
            <div className="w-full">
              <div className="flex items-center justify-between gap-3 mb-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm sm:rounded-xl dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Back</span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-1.5 text-gray-700 bg-gray-100 rounded-lg sm:hidden dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {isSidebarOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Menu className="w-4 h-4" />
                  )}
                </button>
              </div>
              <h1 className="mb-1 text-xl font-bold text-gray-900 sm:text-2xl sm:mb-2 dark:text-white">
                Library Calendar
              </h1>
              <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                Manage library events, deadlines, and schedules
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => setShowAddEventModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl hover:shadow-lg"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Add Event</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          {/* Calendar Controls */}
          <div className="p-3 bg-white rounded-xl sm:p-4 sm:rounded-2xl dark:bg-gray-800">
            <div className="flex flex-col justify-between gap-3 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => navigateDate(-1)}
                    className="p-1.5 text-gray-700 bg-gray-100 rounded-lg sm:p-2 sm:rounded-xl dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={goToToday}
                    className="px-2 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg sm:px-4 sm:py-2 sm:text-sm sm:rounded-xl dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateDate(1)}
                    className="p-1.5 text-gray-700 bg-gray-100 rounded-lg sm:p-2 sm:rounded-xl dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
                  {monthName}
                </h2>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1 p-0.5 bg-gray-100 rounded-lg sm:gap-2 sm:p-1 sm:rounded-xl dark:bg-gray-700">
                  {["month", "week", "day"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-2 py-1 text-xs font-medium rounded-md capitalize sm:px-4 sm:py-2 sm:text-sm sm:rounded-lg ${
                        viewMode === mode
                          ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
                          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      }`}
                    >
                      <span className="hidden sm:inline">{mode}</span>
                      <span className="sm:hidden">{mode.charAt(0)}</span>
                    </button>
                  ))}
                </div>
                <button className="p-1.5 text-gray-700 bg-gray-100 rounded-lg sm:p-2.5 sm:rounded-xl dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg sm:rounded-xl dark:border-gray-700">
              {/* Day Headers */}
              <div className="grid grid-cols-7 min-w-[400px] bg-gray-50 dark:bg-gray-700/50">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-2 text-xs font-semibold text-center text-gray-700 sm:p-3 sm:text-sm dark:text-gray-300"
                    >
                      <span className="hidden sm:inline">{day}</span>
                      <span className="sm:hidden">{day.charAt(0)}</span>
                    </div>
                  )
                )}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 min-w-[400px] bg-white dark:bg-gray-800">
                {days.map((day, index) => {
                  const isToday =
                    day.date.toDateString() === today.toDateString();
                  const dayEvents = getEventsForDate(day.date);

                  return (
                    <div
                      key={index}
                      className={`min-h-[80px] sm:min-h-[120px] border-r border-b border-gray-100 dark:border-gray-700 p-1 sm:p-2 ${
                        !day.isCurrentMonth
                          ? "bg-gray-50/50 dark:bg-gray-900/30"
                          : ""
                      } ${isToday ? "bg-blue-50 dark:bg-blue-900/10" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-medium sm:text-sm ${
                            isToday
                              ? "flex items-center justify-center w-5 h-5 text-xs text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full sm:w-6 sm:h-6"
                              : !day.isCurrentMonth
                              ? "text-gray-400 dark:text-gray-500"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {day.date.getDate()}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-[10px] text-gray-500 sm:text-xs dark:text-gray-400">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      {/* Events for this day */}
                      <div className="space-y-0.5 sm:space-y-1">
                        {dayEvents.slice(0, 1).map((event) => (
                          <div
                            key={event.id}
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowEventModal(true);
                            }}
                            className={`p-1 text-[10px] rounded cursor-pointer border sm:text-xs ${event.color} hover:opacity-90 transition-opacity`}
                          >
                            <div className="flex items-center gap-0.5 sm:gap-1.5">
                              <span className="hidden sm:inline">
                                {event.icon}
                              </span>
                              <span className="font-medium truncate">
                                {event.title}
                              </span>
                            </div>
                            <div className="hidden mt-0.5 text-[10px] opacity-75 sm:block">
                              {event.start.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        ))}
                        {dayEvents.length > 1 && (
                          <div className="text-[10px] text-center text-gray-500 sm:text-xs dark:text-gray-400">
                            +{dayEvents.length - 1} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Toggle */}
        {isSidebarOpen && (
          <div className="mb-6 lg:hidden">
            <div className="p-4 bg-white rounded-xl dark:bg-gray-800">
              <QuickStatsMobile />
              <EventTypesMobile />
              <QuickActionsMobile />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Calendar View - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="p-4 bg-white rounded-xl sm:p-6 sm:rounded-2xl dark:bg-gray-800">
              <div className="flex flex-col justify-between gap-3 mb-4 sm:flex-row sm:items-center sm:mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Event Statistics
                </h3>
                <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-lg sm:p-2 sm:rounded-xl dark:bg-gray-700">
                  <Search className="w-3 h-3 text-gray-400 sm:w-4 sm:h-4" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full px-2 text-xs bg-transparent border-none focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-4 sm:gap-4 sm:mb-6">
                {[
                  { label: "Upcoming", value: "12", color: "bg-blue-500" },
                  { label: "Completed", value: "24", color: "bg-green-500" },
                  { label: "Ongoing", value: "3", color: "bg-yellow-500" },
                  { label: "Cancelled", value: "2", color: "bg-red-500" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gray-50 sm:p-4 sm:rounded-xl dark:bg-gray-700/50"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`w-2 h-2 ${stat.color} rounded-full sm:w-3 sm:h-3`}
                      ></div>
                      <div>
                        <div className="text-lg font-bold text-gray-900 sm:text-2xl dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Event List */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  Recent Events
                </h4>
                {events.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="p-3 transition-colors border border-gray-200 rounded-lg sm:p-4 sm:rounded-xl dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div
                          className={`p-1.5 mt-0.5 rounded-lg sm:p-2 sm:mt-1 ${
                            event.color.split(" ")[0]
                          }`}
                        >
                          {event.icon}
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 sm:text-base dark:text-white">
                            {event.title}
                          </h5>
                          <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500 sm:gap-4 sm:mt-2 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-2 h-2 sm:w-3 sm:h-3" />
                              {event.start.toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-2 h-2 sm:w-3 sm:h-3" />
                              {event.participants}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 sm:mt-0 sm:justify-end sm:gap-2">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full sm:px-3 sm:py-1 ${
                            event.status === "completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                              : event.status === "upcoming"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                          }`}
                        >
                          {event.status}
                        </span>
                        <button className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                          <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width - Hidden on mobile */}
          <div className="hidden space-y-6 lg:block">
            {/* Quick Stats */}
            <div className="p-6 bg-white rounded-2xl dark:bg-gray-800">
              <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Quick Stats
              </h4>
              <div className="space-y-3">
                {[
                  {
                    icon: CalendarDays,
                    label: "Events this month",
                    value: "8",
                    color: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    icon: BookOpen,
                    label: "Book arrivals",
                    value: "3",
                    color: "text-green-600 dark:text-green-400",
                  },
                  {
                    icon: AlertCircle,
                    label: "Deadlines",
                    value: "2",
                    color: "text-red-600 dark:text-red-400",
                  },
                  {
                    icon: Users,
                    label: "Workshops",
                    value: "1",
                    color: "text-purple-600 dark:text-purple-400",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl dark:bg-gray-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 bg-gray-100 rounded-lg dark:bg-gray-700 ${stat.color}`}
                      >
                        <stat.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Types */}
            <div className="p-6 bg-white rounded-2xl dark:bg-gray-800">
              <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Event Types
              </h4>
              <div className="space-y-3">
                {[
                  {
                    type: "deadline",
                    label: "Deadlines",
                    count: 2,
                    color: "bg-red-100 border-red-300 text-red-700",
                  },
                  {
                    type: "arrival",
                    label: "New Arrivals",
                    count: 3,
                    color: "bg-green-100 border-green-300 text-green-700",
                  },
                  {
                    type: "workshop",
                    label: "Workshops",
                    count: 1,
                    color: "bg-blue-100 border-blue-300 text-blue-700",
                  },
                  {
                    type: "event",
                    label: "Special Events",
                    count: 1,
                    color: "bg-purple-100 border-purple-300 text-purple-700",
                  },
                  {
                    type: "club",
                    label: "Book Clubs",
                    count: 1,
                    color: "bg-indigo-100 border-indigo-300 text-indigo-700",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.color.split(" ")[0]
                        }`}
                      ></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {item.label}
                      </span>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-lg dark:bg-gray-700">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
              <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Quick Actions
              </h4>
              <div className="space-y-3">
                <Link
                  to="/calendar/all"
                  className="flex items-center justify-between w-full p-3 text-sm font-medium text-left text-gray-700 bg-white rounded-xl dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span>View All Events</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button className="flex items-center justify-between w-full p-3 text-sm font-medium text-left text-gray-700 bg-white rounded-xl dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span>Manage Recurring Events</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-between w-full p-3 text-sm font-medium text-left text-gray-700 bg-white rounded-xl dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span>Set Event Reminders</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
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

      {/* Modals */}
      {showEventModal && <EventDetailsModal />}
      {showAddEventModal && <AddEventModal />}
    </div>
  );
};

// Mobile Components
const QuickStatsMobile = () => (
  <div className="mb-4 lg:hidden">
    <h4 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
      Quick Stats
    </h4>
    <div className="grid grid-cols-2 gap-2">
      {[
        {
          icon: CalendarDays,
          label: "Events this month",
          value: "8",
          color: "text-blue-600 dark:text-blue-400",
        },
        {
          icon: BookOpen,
          label: "Book arrivals",
          value: "3",
          color: "text-green-600 dark:text-green-400",
        },
        {
          icon: AlertCircle,
          label: "Deadlines",
          value: "2",
          color: "text-red-600 dark:text-red-400",
        },
        {
          icon: Users,
          label: "Workshops",
          value: "1",
          color: "text-purple-600 dark:text-purple-400",
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
        >
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 bg-gray-100 rounded dark:bg-gray-700 ${stat.color}`}
            >
              <stat.icon className="w-3 h-3" />
            </div>
            <div>
              <div className="text-xs text-gray-700 dark:text-gray-300">
                {stat.label}
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EventTypesMobile = () => (
  <div className="mb-4 lg:hidden">
    <h4 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
      Event Types
    </h4>
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: "Deadlines", count: 2, color: "bg-red-100 text-red-700" },
        {
          label: "New Arrivals",
          count: 3,
          color: "bg-green-100 text-green-700",
        },
        { label: "Workshops", count: 1, color: "bg-blue-100 text-blue-700" },
        {
          label: "Special Events",
          count: 1,
          color: "bg-purple-100 text-purple-700",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${item.color.split(" ")[0]}`}
            ></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
          </div>
          <span className="px-1.5 py-0.5 text-xs font-medium bg-gray-100 rounded dark:bg-gray-700">
            {item.count}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const QuickActionsMobile = () => (
  <div className="lg:hidden">
    <h4 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
      Quick Actions
    </h4>
    <div className="space-y-2">
      {[
        "View All Events",
        "Manage Recurring Events",
        "Set Event Reminders",
      ].map((action, index) => (
        <button
          key={index}
          className="flex items-center justify-between w-full p-3 text-sm font-medium text-left text-gray-700 bg-white border border-gray-200 rounded-lg dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <span>{action}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      ))}
    </div>
  </div>
);

export default CalendarView;
