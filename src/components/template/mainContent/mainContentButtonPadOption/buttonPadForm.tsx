import React, { useEffect, useRef, useState } from "react";
import _map from "lodash/map";
import { useGlobalData, useButton } from "../../../../hooks";
import ActionForm from "./actionForm";
import { IntProfilePageButtonPadActions } from "./../../../../types/globalContextType";

export interface ButtonPadFormProps {}

const ButtonPadForm: React.FC<ButtonPadFormProps> = () => {
  const globalData = useGlobalData();
  const _id = useRef("");

  const {
    activateButtonPad,
    deleteButtonPad,
    readButtonPad,
    getActiveButton,
    updateButtonPad
  } = useButton();

  const buttonPad = getActiveButton();
  const [state, setState] = useState(buttonPad);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  useEffect((): void => {
    if (_id.current !== buttonPad._id) {
      _id.current = buttonPad._id;
      setState(buttonPad);
      setActiveActionId(null);
    }
  }, [buttonPad, buttonPad._id]);

  const handleFormChange = (e: any): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    updateButtonPad(buttonPad._id, state);
  };

  const handleSelectActionSet = (_id: string): void => {
    setActiveActionId(_id);
  };

  return (
    <div className="main-content-button-pad-options">
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

      {/* action block */}
      <div>
        <ul>
          {_map(
            buttonPad.actions,
            (m: IntProfilePageButtonPadActions): React.ReactElement => (
              <li key={m._id} onClick={() => handleSelectActionSet(m._id)}>
                {m._id}
              </li>
            )
          )}
        </ul>
      </div>
      {/* action block */}

      {/* action profile */}

      {activeActionId && buttonPad && (
        <ActionForm theActionId={activeActionId} />
      )}

      {/* action profile */}
    </div>
  );
};

export default ButtonPadForm;
