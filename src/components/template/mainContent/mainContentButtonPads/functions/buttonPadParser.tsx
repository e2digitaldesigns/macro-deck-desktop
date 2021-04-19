import React from "react";
import { AddBox, Delete, Edit } from "@material-ui/icons";
import { useButton, useGlobalData } from "./../../../../../hooks";

export interface ButtonPadParserProps {
  padNumber: number;
}

const ButtonPadParser: React.FC<ButtonPadParserProps> = ({ padNumber }) => {
  const globalData = useGlobalData();
  const { activateButtonPad, deleteButtonPad, readButtonPad } = useButton();
  const buttonPad = readButtonPad(padNumber);
  const buttonPadId: string = buttonPad?._id;
  const activeId = globalData?.state?.activeProfile?.buttonPad?._id;

  const handleButtonActivate = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    activateButtonPad(buttonPadId, padNumber);
  };

  const handleDeleteButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    buttonPadId && deleteButtonPad(buttonPadId);
  };

  const handleTest = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    console.log(28, "button tester");
  };

  if (!padNumber) return <div></div>;

  return (
    <div
      className={`button-pad-inner ${
        buttonPadId && buttonPadId === activeId ? "active" : ""
      }`}
    >
      {buttonPad ? (
        <>
          <div
            className="button-option-icon icon-close"
            onClick={e => handleDeleteButton(e)}
          >
            <Delete fontSize="inherit" />
          </div>
          <div
            className="button-option-icon icon-edit"
            onClick={e => handleButtonActivate(e)}
          >
            <Edit fontSize="inherit" />
          </div>

          <div className="button-test-link" onClick={e => handleTest(e)}></div>

          <div className="button-icon icon-button">
            <Edit fontSize="inherit" />
          </div>
          <div className="button-text">{buttonPad?.text}</div>
          <div className="button-bg-image"></div>
        </>
      ) : (
        <div className="emptyButtonPad" onClick={handleButtonActivate}>
          <AddBox fontSize="inherit" />
        </div>
      )}
    </div>
  );
};

export default ButtonPadParser;
