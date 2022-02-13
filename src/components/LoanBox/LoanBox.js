import Card from "../Card/Card";
import "./LoanBox.css";

const LoanBox = ({ date, amount, dueDate, paymentType, children }) => {
  return (
    <>
      <div className="card-header">{date}</div>
      <Card size="md">
        <div>
          <h3>NGN {amount?.toLocaleString()}</h3>
          <small>Amount</small>
        </div>
        <div>
          <p>{dueDate}</p>
          <small>Due Date</small>
        </div>
        <div>
          <p>{paymentType}</p>
          <small>Payment Type</small>
        </div>
        <div>{children}</div>
      </Card>
    </>
  );
};

export default LoanBox;
