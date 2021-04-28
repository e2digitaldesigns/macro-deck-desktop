import React, { useEffect, useRef, useState } from "react";
import { useButton } from "../../../../hooks";
import SETTINGS from "../../../../settings/system.json";

export interface IntButtonForm {}

const ButtonForm: React.FC<IntButtonForm> = () => {
  const { getActiveButton, deleteButtonPad, updateButtonPad } = useButton();
  const buttonPad = getActiveButton();
  const [state, setState] = useState(SETTINGS.DEFAULT_STATE.BUTTON_PADS);
  const _id = useRef("");

  useEffect((): void => {
    if (buttonPad && _id.current !== buttonPad._id) {
      _id.current = buttonPad._id;
      setState(state => buttonPad);
    } else if (!buttonPad) {
      setState(state => SETTINGS.DEFAULT_STATE.BUTTON_PADS);
    }
  }, [buttonPad, buttonPad?._id]);

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    state && setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    buttonPad && state && updateButtonPad(state);
  };

  const handleDeleteButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    buttonPad && state?._id && deleteButtonPad(state._id);
  };

  return (
    <>
      <div>
        Text
        <input
          type="text"
          name="text"
          value={state?.text}
          onChange={e => handleFormChange(e)}
        />
      </div>
      <div>
        Text Color
        <input
          type="color"
          name="textColor"
          value={state?.textColor}
          onChange={e => handleFormChange(e)}
        />
      </div>
      <div>
        Icon
        <input
          type="text"
          name="icon"
          value={state?.icon}
          onChange={e => handleFormChange(e)}
        />
      </div>
      <div>
        Icon Color
        <input
          type="color"
          name="iconColor"
          value={state?.iconColor}
          onChange={e => handleFormChange(e)}
        />
      </div>
      <div>
        Image
        <input
          type="text"
          name="image"
          value={state?.image}
          onChange={e => handleFormChange(e)}
        />
      </div>
      <div>
        bgColor
        <input
          type="color"
          name="bgColor"
          value={state?.bgColor}
          onChange={e => handleFormChange(e)}
        />
      </div>
      <div>
        <button onClick={handleFormSubmit}>okie dokie</button>
      </div>

      <div>
        <button onClick={e => handleDeleteButton(e)}>delete</button>
      </div>
    </>
  );
};

export default ButtonForm;
