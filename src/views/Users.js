import { useEffect, useState } from "react";
import moment from "moment";
import Navbar from "../components/Navbar/Navbar";
import API from "../services/apiService";

const Users = (props) => {
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await API.getUsers();
        const { data } = res.data;
        setResponse(data);
      } catch (error) {
        setResponse(error.response.data);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <Navbar />
      {!response && (
        <div className="centralize">
          <h1>Loading...</h1>
        </div>
      )}
      {response && (
        <div className="section">
          <div className="container transactions">
            <div className="mt-50" />

            <h2 className="logo">Users</h2>
            <div className="card-table">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Address</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {response?.map((tranx, i) => {
                    return (
                      <tr key={i}>
                        <td>{tranx.first_name}</td>
                        <td>{tranx.last_name}</td>
                        <td>{tranx.email}</td>
                        <td>{tranx.phone_number}</td>
                        <td>{tranx.address}</td>
                        <td>{moment(tranx.created_at).format("LLL")}</td>
                        <td>{moment(tranx.updated_at).format("LLL")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
