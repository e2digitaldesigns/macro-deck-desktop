import React from "react";
import ActionForm from "./actionForm/actionForm";
import ActionList from "./actionList";
import ButtonForm from "./buttonForm";

export interface ButtonPadFormProps {}

const ButtonPadForm: React.FC<ButtonPadFormProps> = () => {
  return (
    <div className="main-content-button-pad-options">
      <div>
        <ButtonForm />
      </div>

      <div>
        <ActionList />
      </div>

      <div>
        <ActionForm />
      </div>
    </div>
  );
};

export default ButtonPadForm;
