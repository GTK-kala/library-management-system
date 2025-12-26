import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Eye,
  Users,
  Clock,
  Printer,
  ArrowUp,
  BookOpen,
  Download,
  FileText,
  PieChart,
  Calendar,
  ChevronUp,
  ArrowLeft,
  BarChart3,
  RefreshCw,
  TrendingUp,
  DollarSign,
  CheckCircle,
  ChevronDown,
  FilePieChart,
  FileBarChart,
  FileSpreadsheet,
} from "lucide-react";
import toast from "react-hot-toast";

const GenerateReport = () => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [dateRange, setDateRange] = useState("month");
  const [reportType, setReportType] = useState("borrowing");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [endDate, setEndDate] = useState(getLastDayOfMonth());
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [expandedSection, setExpandedSection] = useState(null);
  const [startDate, setStartDate] = useState(getFirstDayOfMonth());

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

  // Mock report data
  const mockReports = {
    borrowing: {
      title: "Borrowing Activity Report",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      stats: [
        { label: "Total Borrows", value: "1,247", change: "+12%" },
        { label: "Active Loans", value: "143", change: "-3%" },
        { label: "Overdue Items", value: "18", change: "+5%" },
        { label: "Avg. Return Time", value: "4.2 days", change: "-0.3" },
      ],
      data: [
        { month: "Jan", borrows: 120, returns: 115 },
        { month: "Feb", borrows: 145, returns: 138 },
        { month: "Mar", borrows: 165, returns: 158 },
        { month: "Apr", borrows: 180, returns: 172 },
        { month: "May", borrows: 210, returns: 202 },
        { month: "Jun", borrows: 195, returns: 188 },
      ],
      topBooks: [
        {
          title: "The Silent Patient",
          author: "Alex Michaelides",
          borrows: 45,
        },
        { title: "Atomic Habits", author: "James Clear", borrows: 38 },
        { title: "Project Hail Mary", author: "Andy Weir", borrows: 32 },
        { title: "The Midnight Library", author: "Matt Haig", borrows: 29 },
        { title: "Klara and the Sun", author: "Kazuo Ishiguro", borrows: 26 },
      ],
    },
    members: {
      title: "Membership Activity Report",
      icon: <Users className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      stats: [
        { label: "New Members", value: "89", change: "+15%" },
        { label: "Active Members", value: "1,245", change: "+8%" },
        { label: "Inactive Members", value: "87", change: "-12%" },
        { label: "Premium Members", value: "312", change: "+25%" },
      ],
      data: [
        { month: "Jan", new: 45, active: 1150 },
        { month: "Feb", new: 52, active: 1180 },
        { month: "Mar", new: 61, active: 1210 },
        { month: "Apr", new: 58, active: 1235 },
        { month: "May", new: 67, active: 1260 },
        { month: "Jun", new: 89, active: 1245 },
      ],
      topMembers: [
        { name: "Sarah Johnson", books: 24, lastActive: "Today" },
        { name: "Michael Chen", books: 19, lastActive: "Yesterday" },
        { name: "Emma Williams", books: 17, lastActive: "2 days ago" },
        { name: "David Miller", books: 15, lastActive: "Today" },
        { name: "Lisa Anderson", books: 14, lastActive: "3 days ago" },
      ],
    },
    finances: {
      title: "Financial Report",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      stats: [
        { label: "Total Revenue", value: "$2,845.50", change: "+18%" },
        { label: "Fines Collected", value: "$248.75", change: "+5%" },
        { label: "Membership Fees", value: "$1,890.00", change: "+22%" },
        { label: "Outstanding Fines", value: "$156.25", change: "-8%" },
      ],
      data: [
        { month: "Jan", revenue: 420, fines: 45 },
        { month: "Feb", revenue: 485, fines: 52 },
        { month: "Mar", revenue: 520, fines: 48 },
        { month: "Apr", revenue: 580, fines: 56 },
        { month: "May", revenue: 620, fines: 62 },
        { month: "Jun", revenue: 685, fines: 75 },
      ],
      topRevenue: [
        { source: "Membership Fees", amount: "$1,890.00", percentage: "66%" },
        { source: "Late Fines", amount: "$685.00", percentage: "24%" },
        { source: "Book Sales", amount: "$210.50", percentage: "7%" },
        { source: "Services", amount: "$60.00", percentage: "3%" },
      ],
    },
    inventory: {
      title: "Inventory Report",
      icon: <FileText className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      stats: [
        { label: "Total Books", value: "10,247", change: "+3%" },
        { label: "Available Books", value: "8,156", change: "+1%" },
        { label: "Borrowed Books", value: "1,483", change: "+5%" },
        { label: "New Arrivals", value: "124", change: "+8%" },
      ],
      data: [
        { month: "Jan", total: 10000, available: 8100 },
        { month: "Feb", total: 10120, available: 8120 },
        { month: "Mar", total: 10200, available: 8090 },
        { month: "Apr", total: 10350, available: 8200 },
        { month: "May", total: 10480, available: 8300 },
        { month: "Jun", total: 10247, available: 8156 },
      ],
      topGenres: [
        { genre: "Fiction", count: 3124, percentage: "30%" },
        { genre: "Science", count: 2458, percentage: "24%" },
        { genre: "History", count: 1876, percentage: "18%" },
        { genre: "Biography", count: 1562, percentage: "15%" },
        { genre: "Technology", count: 1227, percentage: "13%" },
      ],
    },
  };

  const reportTypes = [
    {
      id: "borrowing",
      label: "Borrowing Activity",
      icon: <BookOpen className="w-4 h-4" />,
    },
    { id: "members", label: "Membership", icon: <Users className="w-4 h-4" /> },
    {
      id: "finances",
      label: "Financial",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  const dateRanges = [
    { id: "week", label: "Last Week" },
    { id: "month", label: "This Month" },
    { id: "quarter", label: "This Quarter" },
    { id: "year", label: "This Year" },
    { id: "custom", label: "Custom Range" },
  ];

  const exportFormats = [
    { id: "pdf", label: "PDF", icon: <FilePieChart className="w-4 h-4" /> },
    {
      id: "excel",
      label: "Excel",
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
    { id: "csv", label: "CSV", icon: <FileBarChart className="w-4 h-4" /> },
    { id: "print", label: "Print", icon: <Printer className="w-4 h-4" /> },
  ];

  // Helper functions
  function getFirstDayOfMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1)
      .toISOString()
      .split("T")[0];
  }

  function getLastDayOfMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];
  }

  useEffect(() => {
    // Load initial report data
    generateReport();
  }, [reportType, dateRange, startDate, endDate]);

  const generateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setReportData(mockReports[reportType]);
      setLoading(false);
      toast.success("Report generated successfully!");
    }, 1000);
  };

  const handleExport = () => {
    toast.success(`Report exported as ${selectedFormat.toUpperCase()}!`);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const ReportSection = ({
    title,
    icon,
    children,
    isOpen = false,
    onToggle,
  }) => (
    <div className="mb-4 overflow-hidden border border-gray-200 rounded-xl dark:border-gray-700">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-semibold">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
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
                Generate Reports
              </h1>
              <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                Create detailed reports for library analysis and insights
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={generateReport}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white transition-all bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl hover:shadow-lg disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Generating..." : "Refresh Report"}
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white transition-all bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg sm:rounded-xl hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Left Sidebar - Report Configuration */}
          <div className="space-y-6 lg:col-span-1">
            {/* Report Type Selection */}
            <div className="p-4 bg-white rounded-xl dark:bg-gray-800">
              <h3 className="mb-4 font-semibold">Report Type</h3>
              <div className="space-y-2">
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setReportType(type.id)}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                      reportType === type.id
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        reportType === type.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {type.icon}
                    </div>
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="p-4 bg-white rounded-xl dark:bg-gray-800">
              <h3 className="mb-4 font-semibold">Date Range</h3>
              <div className="space-y-2">
                {dateRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setDateRange(range.id)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                      dateRange === range.id
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{range.label}</span>
                    </div>
                    {dateRange === range.id && (
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Date Range */}
              {dateRange === "custom" && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Export Format */}
            <div className="p-4 bg-white rounded-xl dark:bg-gray-800">
              <h3 className="mb-4 font-semibold">Export Format</h3>
              <div className="grid grid-cols-2 gap-2">
                {exportFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                      selectedFormat === format.id
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mb-2 ${
                        selectedFormat === format.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {format.icon}
                    </div>
                    <span className="text-xs font-medium">{format.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Report Summary */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
              <h3 className="mb-3 font-semibold">Report Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Type:
                  </span>
                  <span className="font-medium">
                    {mockReports[reportType]?.title}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Period:
                  </span>
                  <span className="font-medium">
                    {startDate} to {endDate}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Generated:
                  </span>
                  <span className="font-medium">Just now</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Status:
                  </span>
                  <span className="flex items-center gap-1 font-medium text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Report Display */}
          <div className="lg:col-span-3">
            {/* Report Header */}
            <div className="p-6 mb-6 bg-white rounded-xl dark:bg-gray-800">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${mockReports[reportType]?.color}`}
                  >
                    {mockReports[reportType]?.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {mockReports[reportType]?.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Period: {startDate} to {endDate}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
              {reportData?.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white rounded-xl dark:bg-gray-800"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span
                      className={`text-sm ${
                        stat.change.startsWith("+")
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Report Sections */}
            <div className="space-y-6">
              {/* Data Visualization */}
              <ReportSection
                title="Data Visualization"
                icon={<BarChart3 className="w-5 h-5" />}
                isOpen={expandedSection === "visualization"}
                onToggle={() => toggleSection("visualization")}
              >
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Monthly Trends</h4>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-gray-200 rounded-lg dark:bg-gray-700">
                        Line Chart
                      </button>
                      <button className="px-3 py-1 text-xs bg-gray-100 rounded-lg dark:bg-gray-800">
                        Bar Chart
                      </button>
                    </div>
                  </div>
                  {/* Mock Chart */}
                  <div className="flex items-end justify-between h-48 gap-2">
                    {reportData?.data.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="mb-1 text-xs text-gray-500">
                          {item.month}
                        </div>
                        <div className="relative w-full">
                          <div
                            className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-300"
                            style={{
                              height: `${
                                ((item.borrows ||
                                  item.new ||
                                  item.revenue ||
                                  item.total) /
                                  250) *
                                100
                              }px`,
                            }}
                          ></div>
                          {item.returns && (
                            <div
                              className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-green-500 to-green-300"
                              style={{
                                height: `${
                                  ((item.returns ||
                                    item.active ||
                                    item.fines ||
                                    item.available) /
                                    250) *
                                  100
                                }px`,
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="mt-2 text-xs font-medium">
                          {item.borrows ||
                            item.new ||
                            item.revenue ||
                            item.total}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-gradient-to-t from-blue-500 to-blue-300"></div>
                      <span>Primary Metric</span>
                    </div>
                    {reportType === "borrowing" && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-gradient-to-t from-green-500 to-green-300"></div>
                        <span>Returns</span>
                      </div>
                    )}
                  </div>
                </div>
              </ReportSection>

              {/* Top Items */}
              <ReportSection
                title={
                  reportType === "borrowing"
                    ? "Top Borrowed Books"
                    : reportType === "members"
                    ? "Top Active Members"
                    : reportType === "finances"
                    ? "Revenue Sources"
                    : "Top Genres"
                }
                icon={<TrendingUp className="w-5 h-5" />}
                isOpen={expandedSection === "topItems"}
                onToggle={() => toggleSection("topItems")}
              >
                <div className="space-y-3">
                  {reportType === "borrowing" &&
                    reportData?.topBooks?.map((book, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30"
                      >
                        <div>
                          <div className="font-medium">{book.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {book.author}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">
                            {book.borrows} borrows
                          </span>
                          <div className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                            Top #{index + 1}
                          </div>
                        </div>
                      </div>
                    ))}

                  {reportType === "members" &&
                    reportData?.topMembers?.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30"
                      >
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            Last active: {member.lastActive}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">
                            {member.books} books
                          </span>
                          <div className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-300">
                            Active
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ReportSection>

              {/* Detailed Breakdown */}
              <ReportSection
                title="Detailed Breakdown"
                icon={<FileText className="w-5 h-5" />}
                isOpen={expandedSection === "breakdown"}
                onToggle={() => toggleSection("breakdown")}
              >
                <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                          Item
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                          Count/Amount
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                          Percentage
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                          Trend
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {reportType === "finances" &&
                        reportData?.topRevenue?.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">{item.source}</td>
                            <td className="px-4 py-3 font-medium">
                              {item.amount}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                  <div
                                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                                    style={{ width: item.percentage }}
                                  ></div>
                                </div>
                                <span>{item.percentage}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                <TrendingUp className="w-4 h-4" />
                                +12%
                              </span>
                            </td>
                          </tr>
                        ))}

                      {reportType === "inventory" &&
                        reportData?.topGenres?.map((genre, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">{genre.genre}</td>
                            <td className="px-4 py-3 font-medium">
                              {genre.count.toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                  <div
                                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                                    style={{ width: genre.percentage }}
                                  ></div>
                                </div>
                                <span>{genre.percentage}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                <TrendingUp className="w-4 h-4" />
                                +3%
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </ReportSection>

              {/* Report Notes */}
              <ReportSection
                title="Report Notes & Insights"
                icon={<PieChart className="w-5 h-5" />}
                isOpen={expandedSection === "notes"}
                onToggle={() => toggleSection("notes")}
              >
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h4 className="mb-2 font-medium text-blue-700 dark:text-blue-300">
                      Key Insights
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                      <li>
                        • Borrowing activity increased by 12% compared to last
                        month
                      </li>
                      <li>
                        • Member engagement is highest during weekday afternoons
                      </li>
                      <li>• Fiction remains the most popular genre</li>
                      <li>• Premium membership adoption grew by 25%</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <h4 className="mb-2 font-medium text-green-700 dark:text-green-300">
                      Recommendations
                    </h4>
                    <ul className="space-y-2 text-sm text-green-600 dark:text-green-400">
                      <li>
                        • Consider increasing fiction collection based on demand
                      </li>
                      <li>• Run promotions to boost off-peak hour visits</li>
                      <li>• Expand premium membership benefits</li>
                      <li>• Review and update overdue fine policies</li>
                    </ul>
                  </div>
                </div>
              </ReportSection>
            </div>

            {/* Action Footer */}
            <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Report generated on {new Date().toLocaleDateString()} at{" "}
                {new Date().toLocaleTimeString()}
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Schedule Report
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg">
                  Save to Archive
                </button>
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
          className="fixed z-40 p-3 text-white transition-all duration-300 rounded-full shadow-lg bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      )}
    </div>
  );
};

export default GenerateReport;
