import React, { useEffect, useRef, useState } from "react";
import { useButton, useGlobalData } from "../../../../../hooks";
import SETTINGS from "../../../../../settings/system.json";
import ICONS from "../../../../../settings/icons.json";
import ButtonFormSchema from "./buttonFormSchema";
import { toast } from "react-toastify";
import _map from "lodash/map";

export interface IntButtonForm {}

const ButtonForm: React.FC<IntButtonForm> = () => {
  const globalData = useGlobalData();
  const { getActiveButton, updateButtonPad } = useButton();
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
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    const regex = /^[a-z\d\-_\s]+$/i;
    if (name === "text" && !regex.test(value) && value.length > 0) return;
    setState({ ...state, [name]: value });
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      await ButtonFormSchema.validate({
        ...state
      });
      buttonPad && state && updateButtonPad(state);
    } catch (err) {
      toast.warning(err.errors[0]);
    }
  };

  const disabled = !globalData?.state?.active?.buttonPadId;

  return (
    <>
      <form>
        <fieldset>
          <div className="color-suffix">
            <label htmlFor="text">Text:</label>
            <input
              disabled={disabled}
              name="text"
              onChange={e => handleFormChange(e)}
              type="text"
              value={state?.text}
            />
            <input
              disabled={disabled}
              name="textColor"
              onChange={e => handleFormChange(e)}
              type="color"
              value={state?.textColor || "#000000"}
            />
          </div>

          <div className="color-suffix">
            <label htmlFor="icon">Icon:</label>
            {/* <input
              disabled={disabled}
              name="icon"
              onChange={e => handleFormChange(e)}
              type="text"
              value={state?.icon}
            /> */}

            <select
              disabled={disabled}
              name="icon"
              onChange={e => handleFormChange(e)}
              value={state?.icon}
            >
              <option value="">None</option>

              {_map(ICONS, (m: any) => (
                <option key={m.name} value={m.name}>
                  {m.display}
                </option>
              ))}
            </select>

            <input
              disabled={disabled}
              name="iconColor"
              onChange={e => handleFormChange(e)}
              type="color"
              value={state?.iconColor || "#000000"}
            />
          </div>

          {/* <div>
            <label htmlFor="image">Image:</label>
            <input
              disabled={disabled}
              name="image"
              onChange={e => handleFormChange(e)}
              type="text"
              value={state?.image}
            />
          </div> */}

          <div>
            <label htmlFor="bgColor">BG Color:</label>
            <input
              disabled={disabled}
              name="bgColor"
              onChange={e => handleFormChange(e)}
              type="color"
              value={state?.bgColor || "#000000"}
            />
          </div>
        </fieldset>

        <div>
          <button
            className="action-list-button"
            disabled={disabled}
            onClick={handleFormSubmit}
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default ButtonForm;
