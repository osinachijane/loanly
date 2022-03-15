import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./Navbar.css";

const Navbar = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.token) {
      const decoded = jwt_decode(localStorage.token);
      const { email } = decoded.data;
      setEmail(email);
    }
  }, []);
  return (
    <nav className="nav">
      <Link to="/loans">
        <h2 className="logo">Loanly</h2>
      </Link>

      <div className="profile-wrapper">
        <Link to="/transactions">Transactions</Link>
        {/* <Link to="/users">Users</Link> */}
        <Link to="/account">Account</Link>
        <Link to="#">{email}</Link>
      </div>
    </nav>
  );
};

export default Navbar;
