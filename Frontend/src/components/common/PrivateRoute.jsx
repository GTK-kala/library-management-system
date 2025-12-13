import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="h-20 w-20 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">⛔</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have permission to access this page.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow"
          >
            <span>Return to Dashboard</span>
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
