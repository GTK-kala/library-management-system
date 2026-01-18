import {
  Plus,
  User,
  Shield,
  Download,
  Calendar,
  BarChart3,
  RefreshCw,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import { All_Users } from "../../Api/UserApi";

//////////////////////////////////////////////////

////////////// LANDING PAGE DATA ////////////////
export const steps = [
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
export const testimonials = [
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

/////////////////////////////////////////////////

///////////// BOOKS PAGE DATA //////////////////
export const genres = [
  "all",
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "Biography",
  "History",
  "Fantasy",
];
export const mockBooks = [
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

////////////////////////////////////////////////

//////// ADMIN DASHBOARD DATA /////////////////
export const monthlyData = [
  { month: "Jan", books: 120, members: 45, revenue: 1200 },
  { month: "Feb", books: 150, members: 52, revenue: 1500 },
  { month: "Mar", books: 180, members: 61, revenue: 1800 },
  { month: "Apr", books: 210, members: 75, revenue: 2100 },
  { month: "May", books: 240, members: 82, revenue: 2400 },
  { month: "Jun", books: 280, members: 95, revenue: 2800 },
];
export const genreDistribution = [
  { name: "Fiction", value: 35, color: "#3b82f6" },
  { name: "Non-Fiction", value: 25, color: "#10b981" },
  { name: "Science", value: 15, color: "#8b5cf6" },
  { name: "Technology", value: 12, color: "#f59e0b" },
  { name: "Biography", value: 8, color: "#ef4444" },
  { name: "Other", value: 5, color: "#6b7280" },
];
export const statusData = [
  { name: "Available", value: 65, color: "#10b981" },
  { name: "Borrowed", value: 25, color: "#3b82f6" },
  { name: "Reserved", value: 8, color: "#f59e0b" },
  { name: "Overdue", value: 2, color: "#ef4444" },
];
export const activity = [
  {
    id: 1,
    type: "borrow",
    user: "John Doe",
    book: "The Great Gatsby",
    time: "10:30 AM",
    status: "success",
  },
  {
    id: 2,
    type: "return",
    user: "Jane Smith",
    book: "1984",
    time: "11:15 AM",
    status: "success",
  },
  {
    id: 3,
    type: "reservation",
    user: "Bob Johnson",
    book: "Atomic Habits",
    time: "12:00 PM",
    status: "pending",
  },
  {
    id: 4,
    type: "member",
    user: "Alice Brown",
    action: "New registration",
    time: "1:45 PM",
    status: "success",
  },
  {
    id: 5,
    type: "overdue",
    user: "Charlie Wilson",
    book: "The Hobbit",
    time: "2:30 PM",
    status: "warning",
  },
  {
    id: 6,
    type: "book",
    action: "New book added",
    title: "Project Hail Mary",
    time: "3:15 PM",
    status: "success",
  },
];
export const Books = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    borrows: 124,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    borrows: 112,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    borrows: 98,
    rating: 4.8,
  },
  {
    id: 4,
    title: "The Midnight Library",
    author: "Matt Haig",
    borrows: 87,
    rating: 4.4,
  },
  {
    id: 5,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    borrows: 76,
    rating: 4.3,
  },
];
export const quickActions = [
  {
    label: "Add New Book",
    icon: Plus,
    color: "bg-blue-500",
    path: "/admin/books/add",
  },
  {
    label: "Manage Members",
    icon: User,
    color: "bg-green-500",
    path: "/admin/members",
  },
  {
    label: "View Reports",
    icon: BarChart3,
    color: "bg-purple-500",
    path: "/admin/reports",
  },
  {
    label: "Generate Report",
    icon: Download,
    color: "bg-orange-500",
    path: "/admin/export",
  },
  {
    label: "Manage Fines",
    icon: DollarSign,
    color: "bg-yellow-500",
    path: "/admin/fines",
  },
  {
    label: "Calendar View",
    icon: Calendar,
    color: "bg-pink-500",
    path: "/admin/calendar",
  },
];

//////////////////////////////////////////////

////////////// PROFILE DATA /////////////////
export const borrowingHistory = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    borrowed: "2024-01-15",
    returned: "2024-01-29",
    status: "returned",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    borrowed: "2024-01-20",
    due: "2024-02-03",
    status: "borrowed",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    borrowed: "2023-12-10",
    returned: "2023-12-24",
    status: "returned",
  },
  {
    id: 4,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    borrowed: "2023-11-05",
    returned: "2023-11-19",
    status: "returned",
  },
];
export const stats = {
  totalBorrowed: 24,
  currentlyBorrowed: 2,
  onTimeReturns: 22,
  favoriteGenre: "Fiction",
};

/////////////////////////////////////////////

//////////////// ADD BOOKS DATA ////////////
export const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Arabic",
  "Hindi",
  "Russian",
  "Portuguese",
];
export const genre = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Biography",
  "History",
  "Science",
  "Technology",
  "Self-Help",
  "Business",
  "Poetry",
  "Drama",
];

/////////////////////////////////////////////

//////////////// MANAGE MEMBERS DATA ////////
export const roles = ["all", "admin", "premium", "member"];
export const statuses = ["all", "active", "inactive", "suspended"];
export const stats1 = [
  {
    label: "Total Members",
    value: All_Users.length.toString(),
    icon: User,
    color: "blue",
    change: "+12%",
  },
  {
    label: "Active Members",
    value: All_Users.filter(
      (user) => user.status === "active",
    ).length.toString(),
    icon: CheckCircle,
    color: "green",
    change: "+8%",
  },
  {
    label: "Premium Members",
    value: "42",
    icon: Shield,
    color: "purple",
    change: "+15%",
  },
  {
    label: "Pending Approval",
    value: "8",
    icon: RefreshCw,
    color: "orange",
    change: "-2%",
  },
];
