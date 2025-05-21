import React from "react";

import { Title } from "../styles/styles";

const Header: React.FC<{
  title: string;
  handleTitleChange: (title: string) => void;
}> = ({ title, handleTitleChange }) => (
  <Title
    contentEditable
    suppressContentEditableWarning
    onBlur={(e) => handleTitleChange(e.target.innerText)}
  >
    {title}
  </Title>
);

export default Header;
