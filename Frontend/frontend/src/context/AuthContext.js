import { createContext, useContext, useState } from "react";
import * as api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("userInfo") || "null")
  );
  const [loading, setLoading] = useState(false);

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await api.login({ email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      setLoading(true);
      const { data } = await api.register({ name, email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginUser, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};