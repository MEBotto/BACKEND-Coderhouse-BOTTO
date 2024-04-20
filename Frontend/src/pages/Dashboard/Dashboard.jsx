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
      className={`flex h-screen ${
        theme === "dark" ? "bg-color" : "bg-colorLight"
      } flex-col md:flex-row md:overflow-hidden`}
    >
      <div className="w-full flex-none md:w-64">
        <Sidebar theme={theme} />
      </div>
      <div
        className={`flex-grow p-4 md:overflow-y-auto md:p-8 ${
          theme === "dark" ? "bg-color" : "bg-colorLight"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          {/* <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/invoices" element={<Invoices />} /> */}
        </Routes>
      </div>
    </div>
  );
}
