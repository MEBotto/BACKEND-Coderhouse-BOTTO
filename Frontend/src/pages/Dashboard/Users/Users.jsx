import PropTypes from "prop-types";
import { Routes, Route } from "react-router";
import Home from "./Home/Home";
import Edit from "./Edit/Edit";

export default function Users({ theme }) {
  return (
    <Routes>
      <Route path="/" element={<Home theme={theme} />} />
      <Route path="/:id" element={<Edit theme={theme} />} />
    </Routes>
  );
}

Users.propTypes = {
  theme: PropTypes.string,
};