import { useEffect, useState } from "react";
// import MonoConnect from "@mono.co/connect.js";

import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import LoanBox from "../components/LoanBox/LoanBox";
import Navbar from "../components/Navbar/Navbar";
import WalletBalance from "../components/WalletBalance/WalletBalance";
import API from "../services/apiService";

const Loans = (props) => {
  const [paymentLink, setPaymentLink] = useState("");
  // const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // const secret_key = "test_sk_DBxW4YRkBGgA80s1T8KY";

  useEffect(() => {
    window.open(paymentLink, "_self");
  }, [paymentLink]);

  const initiatePaymentHandler = async () => {
    const data = {
      amount: "70000",
      type: "onetime-debit",
      description: "Bags",
      reference: Date.now(),
      redirect_url: window.location.origin + "/loans",
      meta: {
        fullname: "Nsiegbunam Jane",
        address: "Ajah, Lagos",
      },
    };
    setLoading(true);
    await postTransaction(data);
    try {
      const response = await fetch(
        `https://api.withmono.com/v1/payments/initiate`,
        {
          method: "post",
          headers: {
            "mono-sec-key": "test_sk_DBxW4YRkBGgA80s1T8KY",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();
      console.log(res.payment_link);
      setLoading(false);
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
  // const monoConnect = useMemo(() => {
  //   const monoInstance = new MonoConnect({
  //     key: "test_pk_jpjEQfjGVIj7HUkJDwto",
  //     scope: "payments",
  //     data: {
  //       type: "onetime-debit",
  //       amount: 20000,
  //       description: "Loan Repayment",
  //       account_id: "620a45ddc640fa413bcd8253",
  //       reference: Date.now(),
  //       redirect_url: window.location.origin + "/done",
  //       meta: {
  //         fullname: "Nsiegbunam Jane",
  //         address: "Ajah, Lagos",
  //       },
  //     },
  //     onSuccess: (chargeObject) => {
  //       console.log(`charged successfully`, chargeObject);
  //     },
  //   });

  //   monoInstance.setup();

  //   return monoInstance;
  // }, []);

  return (
    <>
      <Navbar />
      <div className="section">
        <div className="container">
          <div className="mt-50" />
          <Card>
            <WalletBalance currency="NGN" amount={4500} />
            <div>
              <Button label="Request New Loan" />
            </div>
          </Card>

          <div className="mt-50" />
          <LoanBox
            date="Feb 4, 2022"
            amount={15000}
            dueDate="Mar 12, 2022"
            paymentType="Onetime Payment"
          >
            <Button
              label={loading === true ? "Loading..." : "Make Payment"}
              size="sm"
              onClick={initiatePaymentHandler}
            />
          </LoanBox>
          <LoanBox
            date="December 2, 2021"
            amount={36750}
            dueDate="December 12, 2021"
            paymentType="Onetime Payment"
          >
            <Button label="Payment Made" size="sm" disabled />
          </LoanBox>
          <LoanBox
            date="Sept 4, 2021"
            amount={140000}
            dueDate="Sept 12, 2021"
            paymentType="Onetime Payment"
          >
            <Button label="Payment Made" size="sm" disabled />
          </LoanBox>
          <LoanBox
            date="June 4, 202q"
            amount={50000}
            dueDate="Jul 7, 2021"
            paymentType="Onetime Payment"
          >
            <Button label="Payment Made" size="sm" disabled />
          </LoanBox>
          <LoanBox
            date="Feb 4, 2021"
            amount={75000}
            dueDate="Mar 22, 2021"
            paymentType="Onetime Payment"
          >
            <Button label="Payment Made" size="sm" disabled />
          </LoanBox>
        </div>
      </div>
    </>
  );
};

export default Loans;
