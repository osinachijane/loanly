import "./WalletBalance.css";

const WalletBalance = (props) => {
  return (
    <div className="wallet-box">
      <p>Wallet Balance</p>
      <h1>
        <sup className="sup">{props.currency}</sup>{" "}
        {props.amount?.toLocaleString()}
      </h1>
    </div>
  );
};

export default WalletBalance;
