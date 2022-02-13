import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <h2 className="logo">Loanly</h2>
      </Link>

      <Link to="/">Logout</Link>
    </nav>
  );
};

export default Navbar;
