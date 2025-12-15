import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full dark:bg-red-900/30">
            <span className="text-2xl">⛔</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold">Access Denied</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 space-x-2 text-white transition-shadow bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg"
          >
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
