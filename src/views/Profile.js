import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import Navbar from "../components/Navbar/Navbar";
import API from "../services/apiService";

const Profile = (props) => {
  const [response, setResponse] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getProfile = async (e) => {
      try {
        const res = await API.getProfile();
        const { data } = res.data;
        setResponse(data);
      } catch (error) {
        setResponse(error.response.data);
      }
    };
    getProfile();
  }, []);

  const logout = () => {
    if (localStorage.token) {
      localStorage.removeItem("token");
      history.push("/");
    }
  };

  const { user } = response;

  return (
    <>
      <Navbar />
      {!user && (
        <div className="centralize">
          <h1>Loading...</h1>
        </div>
      )}
      {user && (
        <div className="section">
          <div className="container">
            <div className="mt-50" />
            <Card>
              <form className="form-profile">
                <div className="logo-bo">
                  <h2 className="logo">My Account</h2>
                </div>
                <Input
                  label="First Name"
                  type="text"
                  defaultValue={user.first_name}
                  disabled
                />
                <Input
                  label="Last Name"
                  type="text"
                  defaultValue={user.last_name}
                  disabled
                />

                <Input
                  label="Email Address"
                  type="text"
                  defaultValue={user.email}
                  disabled
                />

                <Input
                  label="House Address"
                  type="text"
                  defaultValue={user.address}
                  disabled
                />

                <Input
                  label="Phone Number"
                  type="text"
                  defaultValue={user.phone_number}
                  disabled
                />

                <Button onClick={logout} label={"Logout"} />
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
