import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Loader from "../components/Loader/Loader";
import API from "../services/apiService";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [form, setForm] = useState("login");

  const history = useHistory();

  useEffect(() => {
    if (localStorage.token) {
      history.push("/loans");
    }
    if (form) {
      var cardDiv = document.getElementById("card");
      cardDiv.scrollTop = 0;
    }
  }, [history, form]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(false);
    try {
      const res = await API.login({ email, password });
      const { access_token } = res.data.data;
      localStorage.token = access_token;
      setLoading(false);
      history.push("/loans");
    } catch (error) {
      setResponse(error.response.data);
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
      address,
      password,
    };
    try {
      await API.register(data);
      setLoading(false);
      setForm("login");
      setResponse("Registration successful, please login");
    } catch (error) {
      setResponse(error.response.data);
      setLoading(false);
    }
  };

  let display;

  if (form === "login") {
    display = (
      <>
        <form onSubmit={handleLogin}>
          <div className="logo-box">
            <h2 className="logo">Sign in to Loanly</h2>
          </div>
          <p>
            To sign in, please type in your email address and your password.
          </p>
          <Input
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button type="submit" label={loading ? <Loader /> : "Login"} />
        </form>

        <div className="new_acc">
          <Link onClick={() => setForm("register")} to="#">
            <h5>New to Loanly? Register here</h5>
          </Link>
        </div>
      </>
    );
  } else {
    display = (
      <>
        <form onSubmit={handleRegister}>
          <div className="logo-box">
            <h2 className="logo">Create new account</h2>
          </div>
          <p>To get started, fill in the details below.</p>
          <Input
            label="First Name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <Input
            label="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <Input
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            label="Phone Number"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <Input
            label="House Address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button
            type="submit"
            label={loading ? <Loader /> : "Create Account"}
          />
        </form>

        <div className="new_acc">
          <Link onClick={() => setForm("login")} to="#">
            <h5>Already have an account? Login</h5>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="section">
      <div className="left-section">
        <div className="logo-box">
          <h2 className="logo">Loanly</h2>
        </div>
        <h1>Get quick Loans and pay back seamlessly</h1>
      </div>
      <div className="right-section">
        <div id="card" className="card">
          <div className="new_acc green">
            <h4>{response}</h4>
          </div>
          {display}
          {response && (
            <div className="new_acc">
              <small>{response.message}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
