import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Profile from "./components/Profile";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/authSlice";
function App() {
  const { openedComponent } = useSelector((state) => state.extra)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [])

  const renderDashboardContent = () => {
    switch (openedComponent) {
      case "Dashboard":
        return <Dashboard />
      case "Products":
        return <Products />
      case "Orders":
        return <Orders />
      case "Users":
        return <Users />
      case "Profile":
        return <Profile />
      default:
        return <Dashboard />
    }
  }
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Protected Admin Route */}
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "Admin" ? (
              <div className="min-h-screen bg-[#f5f7ff]">
                <Header />
                <div className="flex">
                  <SideBar />
                  <div className="flex-1 min-w-0 md:pl-60 pt-16 transition-all duration-300">
                    {renderDashboardContent()}
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <ToastContainer theme="dark" />
    </Router>
  );
}

export default App;
