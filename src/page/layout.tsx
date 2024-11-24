import useAuthStore from "@/store/auth.store";
import { useEffect } from "react";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const { user, fetchCurrentUser, logout } = useAuthStore();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    }
  }, [token, fetchCurrentUser]);
  return (
    <div>
      {/* nav */}
      <div className="flex justify-between pb-4">
        <p>Book Catalog</p>
        <div className="flex items-center gap-2">
          <p>{user?.name}</p>
          <p
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-red-500 p-1 hover:bg-slate-900 rounded-full"
          >
            <MdOutlinePowerSettingsNew />
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
