import { useMemo } from "react";
import MonoConnect from "@mono.co/connect.js";

import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import LoanBox from "../components/LoanBox/LoanBox";
import Navbar from "../components/Navbar/Navbar";
import WalletBalance from "../components/WalletBalance/WalletBalance";

const Loans = () => {
  const monoConnect = useMemo(() => {
    const monoInstance = new MonoConnect({
      key: "test_pk_jpjEQfjGVIj7HUkJDwto",
      scope: "payments",
      data: {
        type: "onetime-debit", // onetime-debit || recurring-debit
        amount: 1500000, // amount in kobo
        description: "Loan Repayment",
        reference: Date.now(),
        redirect_url: window.location.origin + "/done",
        meta: {
          fullname: "Nsiegbunam Jane",
          address: "Ajah, Lagos",
        },
      },
      onSuccess: (chargeObject) => {
        console.log(`charged successfully`, chargeObject);
      },
    });

    monoInstance.setup();

    return monoInstance;
  }, []);

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
              label="Make Payment"
              size="sm"
              onClick={() => monoConnect.open()}
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