// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Landing from "./pages/Landing";
import AddBook from "./pages/AddBook";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import CalenderView from "./pages/CalendarView";
import Navbar from "./components/common/Navbar";
import ManageMembers from "./pages/ManageMembers";
// import Layout from "./components/common/Layout";
import GenerateReport from "./pages/GenerateReport";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppLoading from "./components/common/AppLoading";
import PrivateRoute from "./components/common/PrivateRoute";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3800);
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <>
            <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              {/* Conditional Navbar - Only show on app pages, not landing */}
              <Routes>
                {/* Public Landing Page - No Navbar */}
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Landing />} />

                {/* Auth Pages - No Navbar */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected App Pages - With Navbar */}
                <Route
                  path="/*"
                  element={
                    <>
                      <Navbar />
                      <Routes>
                        <Route
                          path="/dashboard"
                          element={
                            <PrivateRoute>
                              <Dashboard />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/books"
                          element={
                            <PrivateRoute>
                              <Books />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/books/add"
                          element={
                            <PrivateRoute adminOnly>
                              <AddBook />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/admin/members"
                          element={
                            <PrivateRoute adminOnly>
                              <ManageMembers />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/admin/calendar"
                          element={
                            <PrivateRoute adminOnly>
                              <CalenderView />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/admin/reports"
                          element={
                            <PrivateRoute adminOnly>
                              <GenerateReport />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/profile"
                          element={
                            <PrivateRoute>
                              <Profile />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/admin"
                          element={
                            <PrivateRoute adminOnly>
                              <AdminDashboard />
                            </PrivateRoute>
                          }
                        />

                        {/* Redirect from old root to dashboard if logged in */}
                        <Route
                          path="/"
                          element={<Navigate to="/dashboard" />}
                        />
                      </Routes>
                    </>
                  }
                />
              </Routes>

              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 2000,
                  style: {
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                  },
                }}
              />
            </div>
          </>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
