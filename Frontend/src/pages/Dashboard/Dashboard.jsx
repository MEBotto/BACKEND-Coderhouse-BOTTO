import { Routes, Route } from "react-router";
import Sidebar from "../../components/Sidebar.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import Home from "./Home/Home.jsx";
// import Products from "./Products/Products.jsx";
// import Users from "./Users/Users.jsx";
// import Invoices from "./Invoices/Invoices.jsx";

export default function Dashboard() {
  const { theme } = useTheme();
  return (
    <div
      className={`h-screen w-screen ${
        theme === "dark" ? "bg-color" : "bg-colorLight"
      } flex `}
    >
      <div className="w-full flex-none md:w-64">
        <Sidebar theme={theme} />
      </div>
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/invoices" element={<Invoices />} /> */}
      </Routes>
    </div>
  );
}
