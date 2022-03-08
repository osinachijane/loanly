import { useEffect, useState } from "react";
import moment from "moment";
import Navbar from "../components/Navbar/Navbar";
import API from "../services/apiService";

const Transactions = (props) => {
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await API.getTransactions();
        const { data } = res.data;
        setResponse(data);
      } catch (error) {
        setResponse(error.response.data);
      }
    };
    getTransactions();
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

            <h2 className="logo">Transactions</h2>
            <div className="card-table">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Payment Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Reference</th>
                    <th>Payment Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {response?.map((tranx, i) => {
                    let pill;
                    const status = tranx.payment_status;
                    if (status === "initiated") {
                      pill = "orange";
                    } else if (status === "successful") {
                      pill = "green";
                    } else {
                      pill = "red";
                    }
                    return (
                      <tr key={i}>
                        <td>{tranx.user}</td>
                        <td>{tranx.payment_type}</td>
                        <td>{tranx.amount}</td>
                        <td>{tranx.description}</td>
                        <td>{tranx.reference}</td>
                        <td className={`capitalize ${pill}`}>
                          <p> {tranx.payment_status}</p>
                        </td>
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

export default Transactions;
