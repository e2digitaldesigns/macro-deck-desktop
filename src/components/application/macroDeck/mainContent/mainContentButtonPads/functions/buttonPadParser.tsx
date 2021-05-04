import React from "react";
import { AddBox, Delete, Edit } from "@material-ui/icons";
import { useButton, useGlobalData } from "../../../../../../hooks";
import { IntGlobalData } from "../../../../../../types";
import Icon from "@material-ui/core/Icon";

export interface ButtonPadParserProps {
  padNumber: number;
}

const ButtonPadParser: React.FC<ButtonPadParserProps> = ({ padNumber }) => {
  const globalData: IntGlobalData = useGlobalData();
  const { activateButtonPad, createButtonPad, deleteButtonPad, readButtonPad } =
    useButton();
  const buttonPad = readButtonPad(padNumber);
  const activeId = globalData?.state?.active?.buttonPadId;

  const handleButtonCreate = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    createButtonPad(padNumber);
  };

  const handleButtonActivate = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    buttonPad && activateButtonPad(buttonPad._id);
  };

  const handleDeleteButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    buttonPad && deleteButtonPad(buttonPad._id);
  };

  if (!padNumber) return <div></div>;

  return (
    <div
      className={`button-pad-inner ${
        buttonPad?._id === activeId ? "active" : ""
      }`}
      // style={{ backgroundColor: buttonPad?.bgColor }}
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

          <div className="button-icon icon-button">
            {buttonPad?.icon && (
              <Icon fontSize="inherit">{buttonPad.icon}</Icon>
            )}
          </div>
          <div className="button-text">{buttonPad?.text}</div>
          <div className="button-bg-image"></div>
        </>
      ) : (
        <div className="emptyButtonPad" onClick={handleButtonCreate}>
          <AddBox fontSize="inherit" />
        </div>
      )}
    </div>
  );
};

export default ButtonPadParser;
