import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";

const Done = () => {
  return (
    <div className="container center">
      <h1>Payment was Unsuccessful, please try again later !</h1>

      <div className="btn-wrapper">
        <Link to="/loans">
          <Button label="Continue" />
        </Link>
      </div>
    </div>
  );
};

export default Done;
