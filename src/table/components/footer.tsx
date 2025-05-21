import React from "react";

import { Footer as FooterStyle } from "../styles/styles";

const Footer: React.FC<{
  title: string;
  handleFooterChange: (title: string) => void;
}> = ({ title, handleFooterChange }) => (
  <FooterStyle
    contentEditable
    suppressContentEditableWarning
    onBlur={(e) => handleFooterChange(e.target.innerText)}
  >
    {title}
  </FooterStyle>
);

export default Footer;
