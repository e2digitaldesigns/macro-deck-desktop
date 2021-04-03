import React from "react";
import { useButton } from "./../../../../../hooks";

export interface ButtonPadParserProps {
  padNumber: number;
}

const ButtonPadParser: React.FC<ButtonPadParserProps> = ({ padNumber }) => {
  const { activateButtonPad, readButtonPad } = useButton();
  const buttonPad = readButtonPad(padNumber);

  buttonPad && console.log(buttonPad);

  const handleButtonActivate = () => {
    activateButtonPad(buttonPad?._id, padNumber);
  };

  if (!padNumber) return <div></div>;

  return (
    <div onClick={handleButtonActivate}>
      {buttonPad ? <h3>{buttonPad?.text}</h3> : <h3>123</h3>}
    </div>
  );
};

export default ButtonPadParser;
