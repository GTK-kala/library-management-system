import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  ///////// SUBMIT DATA WHEN USER IS LOGIN ///////////
  const HandleSubmit = async (e) => {
    const API = import.meta.env.VITE_API_URL;
    const url = `https://library-management-system-production-27d8.up.railway.app/api/login`;

    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setUser(data.user);
        localStorage.setItem("id", data.user.id);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  /////// LOGOUT THE ACCOUNT WHEN USER CLICK LOGOUT BUTTON //////
  const Logout = () => {
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    email,
    loading,
    password,
    showPassword,
    Logout,
    setUser,
    setEmail,
    setLoading,
    setPassword,
    HandleSubmit,
    setShowPassword,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
