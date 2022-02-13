import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="section">
      <div className="left-section">
        <div className="logo-box">
          <h2 className="logo">Loanly</h2>
        </div>
        <h1>Get quick Loans and pay back seamlessly</h1>
      </div>
      <div className="right-section">
        <div className="card">
          <form>
            <div className="logo-box">
              <h2 className="logo">Sign in to Loanly</h2>
            </div>
            <p>
              To sign in, please type in your email address and your password.
            </p>
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
            <Link to="/loans">
              <Button label="Login" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;
