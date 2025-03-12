import React from "react";
import { v4 as uuidv4 } from "uuid";

export const getTextWithNewLines = (html: string) =>
  html
    .replace(/<div>/g, "\n")
    .replace(/<\/div>/g, "")
    .replace(/<br>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .trim();

export const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.execCommand("insertLineBreak");
  }
};

export const renderTextWithLineBreaks = (text: string) =>
  text.split("\n").map((line) => (
    <React.Fragment key={uuidv4()}>
      {line}
      <br />
    </React.Fragment>
  ));
