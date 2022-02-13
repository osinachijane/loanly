import "./Card.css";

const Card = (props) => {
  const { children, size } = props;

  let CARD_SIZE = "card-lg";

  if (size === "md") {
    CARD_SIZE = "card-md";
  } else if (size === "sm") {
    CARD_SIZE = "card-sm";
  }

  return (
    <>
      <div className={`${`loan-card`} ${CARD_SIZE}`} {...props}>
        {children}
      </div>
    </>
  );
};

export default Card;
