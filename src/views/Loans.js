import { useEffect, useState } from "react";
// import MonoConnect from "@mono.co/connect.js";

import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import LoanBox from "../components/LoanBox/LoanBox";
import Navbar from "../components/Navbar/Navbar";
import WalletBalance from "../components/WalletBalance/WalletBalance";
import API from "../services/apiService";

const Loans = (props) => {
  const [paymentLink, setPaymentLink] = useState("");
  const [loans, setLoans] = useState([]);
  const [errorPaid, setErrorPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingLoans, setLoadingLoans] = useState(false);
  const [requestBtnClicked, setRequestBtnClicked] = useState(false);

  const [loanForm, setLoanForm] = useState({
    amount: "",
    description: "",
    payment_type: "onetime-debit",
    due_date: "",
  });

  // const secret_key = "test_sk_DBxW4YRkBGgA80s1T8KY";

  useEffect(() => {
    if (paymentLink) {
      window.open(paymentLink, "_self");
    }
    getLoans();
  }, [paymentLink]);

  const initiatePaymentHandler = async (loan) => {
    const data = {
      amount: loan.amount * 100,
      type: "onetime-debit",
      description: loan.description,
      reference: Date.now(),
      redirect_url: window.location.origin + "/loans",
      meta: {
        loan_id: loan._id,
      },
    };
    setLoading(true);
    setErrorPaid(false);
    await postTransaction(data);
    try {
      const response = await fetch(
        `https://api.withmono.com/v1/payments/initiate`,
        {
          method: "post",
          headers: {
            "mono-sec-key": process.env.REACT_APP_MONO_SEC_KEY,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();
      setLoading(false);
      console.log(res);
      setPaymentLink(res.payment_link);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const postTransaction = async (data) => {
    const clean_data = {
      payment_type: data.type,
      amount: data.amount,
      description: data.description,
      reference: data.reference,
    };
    try {
      await API.postTransaction(clean_data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getLoans = async () => {
    setLoadingLoans(true);
    try {
      const res = await API.getLoans();
      setLoans(res.data.data);
      setLoadingLoans(false);
    } catch (error) {
      setLoadingLoans(false);
      console.log(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setLoanForm({ ...loanForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const res = await API.postLoan(loanForm);
      setRequestBtnClicked(false);
      setLoadingSubmit(false);
      getLoans();
    } catch (error) {
      setLoadingSubmit(false);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="section">
        <div className="container">
          <div className="mt-50" />
          {errorPaid && (
            <p style={{ textAlign: "center", marginBottom: 10, color: "red" }}>
              Sorry, you have to settle current loan to continue !{" "}
            </p>
          )}
          <Card>
            <WalletBalance currency="NGN" amount={4500} />
            <div>
              {!requestBtnClicked && (
                <Button
                  label="Request New Loan"
                  onClick={() => {
                    setErrorPaid(false);
                    const paid = loans.length
                      ? loans.find((loan) => loan.paid === true)
                      : true;
                    if (paid) {
                      setRequestBtnClicked(true);
                    } else {
                      setErrorPaid(true);
                    }
                  }}
                />
              )}
            </div>
          </Card>

          <div className="mt-50" />
          {!requestBtnClicked ? (
            <>
              {loans?.map((loan, i) => (
                <LoanBox
                  date={loan.created_at}
                  amount={loan.amount}
                  description={loan.description}
                  dueDate={loan.due_date}
                  paymentType={loan.payment_type}
                >
                  <Button
                    disabled={loan.paid}
                    label={
                      !loan.paid && loading ? "Loading..." : "Make Payment"
                    }
                    size="sm"
                    onClick={() => initiatePaymentHandler(loan)}
                  />
                </LoanBox>
              ))}
              {!loadingLoans && !loans.length && (
                <h2 style={{ display: "flex" }}>NO EXISTING LOANS!</h2>
              )}
              {loadingLoans && <h2 style={{ display: "flex" }}>Loading....</h2>}
            </>
          ) : (
            <Card>
              <form className="form-profile" onSubmit={handleSubmit}>
                <div className="logo-bo">
                  <h2 className="logo">Request Loan</h2>
                </div>
                <Input
                  label="Amount"
                  type="text"
                  value={loanForm.amount}
                  onChange={handleChange}
                  name="amount"
                  required
                />
                <Input
                  label="Description"
                  type="text"
                  value={loanForm.description}
                  onChange={handleChange}
                  name="description"
                  required
                />

                <Input
                  label="Payment Type"
                  type="text"
                  value={loanForm.payment_type}
                />

                <Input
                  label="Repayment Date"
                  type="date"
                  value={loanForm.due_date}
                  onChange={handleChange}
                  name="due_date"
                  required
                />
                <div style={{ marginBottom: 30 }} />
                <Button
                  type="submit"
                  // onClick={handleSubmit}
                  label="Submit"
                  disabled={loadingSubmit}
                />
                <div style={{ marginBottom: 10 }} />
                <Button
                  transparent
                  onClick={() => {
                    setRequestBtnClicked(false);
                  }}
                  label={"Cancel"}
                />
              </form>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Loans;
{
  /* <LoanBox
date="December 2, 2021"
amount={36750}
dueDate="December 12, 2021"
paymentType="Onetime Payment"
>
<Button label="Payment Made" size="sm" disabled />
</LoanBox> */
}
