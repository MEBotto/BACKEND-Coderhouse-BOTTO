import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";

export default function NavLink({ link, role }) {
  const { pathname } = useLocation();

  return (
    <Link
      className={`p-1 ${
        pathname === link.path && "border-b-2 border-mainColor"
      } text-white ${link.role ? link.role === role ? "block" : "hidden" : "block"}`}
      to={link.path}
    >
      {link.name}
    </Link>
  );
}

NavLink.propTypes = {
  link: PropTypes.shape({
    role: PropTypes.string.isRequired, 
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
};
