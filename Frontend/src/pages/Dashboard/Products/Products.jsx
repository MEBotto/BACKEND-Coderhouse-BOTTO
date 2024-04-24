import PropTypes from "prop-types";
import { Routes, Route } from "react-router";
import Home from "./Home/Home";
import Create from "./Create/Create";

export default function Products({ theme }) {
  return (
    <Routes>
      <Route path="/" element={<Home theme={theme} />} />
      <Route path="/create" element={<Create theme={theme} />} />
    </Routes>
  );
}

Products.propTypes = {
  theme: PropTypes.string,
};
