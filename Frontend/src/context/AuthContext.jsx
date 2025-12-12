import axios from "axios";
import toast from "react-hot-toast";
import { createContext, use, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const value = { email, password };
    try {
      const url = "http://localhost:3001/api/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(value),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        HandleLogin();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setEmail("");
    setPassword("");
  };

  const HandleLogin = () => {
    setLogin(true);
  };

  const value = {
    user,
    login,
    admin,
    email,
    password,
    loading,
    showPassword,
    setEmail,
    setLoading,
    setPassword,
    HandleSubmit,
    setShowPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
