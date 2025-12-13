// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/common/Layout";
import Navbar from "./components/common/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./components/common/PrivateRoute";

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Navbar />

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <Layout showNavbar={true}>
                    <PrivateRoute adminOnly>
                      <AdminDashboard />
                    </PrivateRoute>
                  </Layout>
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
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>

            <Toaster
              position="top-right"
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
                success: {
                  iconTheme: {
                    primary: "#10b981",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
