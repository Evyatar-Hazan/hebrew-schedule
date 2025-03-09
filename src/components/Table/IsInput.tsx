import React, { useState } from "react";

import type { IsInputProps } from "../../types/schedule";
import * as styled from "./styled";

const IsInput = ({
  component,
  value,
  onSave,
  componentStyle,
}: IsInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <div onClick={handleClick}>
      {isEditing ? (
        <styled.StyledDiv componentStyle={componentStyle}>
          <styled.StyledInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleSave}
            autoFocus
            componentStyle={componentStyle}
          />
        </styled.StyledDiv>
      ) : (
        component
      )}
    </div>
  );
};

export default IsInput;
