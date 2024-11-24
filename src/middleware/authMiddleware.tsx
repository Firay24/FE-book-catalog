import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth.store";

const AuthMiddleware = () => {
  const navigate = useNavigate();
  const { fetchCurrentUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true); // State untuk menunggu proses autentikasi

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        navigate("/login");
        return;
      }

      try {
        await fetchCurrentUser(storedToken);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [fetchCurrentUser, logout, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Loader saat autentikasi berlangsung
  }

  return <Outlet />; // Jika autentikasi berhasil, render komponen anak
};

export default AuthMiddleware;
