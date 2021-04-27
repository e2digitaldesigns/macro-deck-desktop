import React, { useState } from "react";
import * as styled from "./select.styles";

const options = [
  { _id: "a", display: "AAA" },
  { _id: "b", display: "BBB" },
  { _id: "c", display: "CCC" },
];

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: any) => () => {
    console.log(value);
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <styled.Main>
      <h1>Custom Select/dropdown</h1>
      <styled.DropDownContainer>
        <styled.DropDownHeader onClick={toggling}>
          {selectedOption || options[0].display}
        </styled.DropDownHeader>
        {isOpen && (
          <styled.DropDownListContainer>
            <styled.DropDownList>
              {options.map(option => (
                <styled.ListItem
                  onClick={onOptionClicked(option._id)}
                  key={option._id}
                >
                  {option.display}
                </styled.ListItem>
              ))}
            </styled.DropDownList>
          </styled.DropDownListContainer>
        )}
      </styled.DropDownContainer>
    </styled.Main>
  );
}
