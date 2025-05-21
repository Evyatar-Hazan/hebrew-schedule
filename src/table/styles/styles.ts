/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styled from "styled-components";

export const Wrapper = styled.div`
  overflow-x: auto;
  text-align: center;
  max-width: 100%;
  white-space: pre-wrap;
  border: 2px solid black;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const Footer = styled.p`
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;
  padding: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid black;
  max-width: 100%;
`;

export const Th = styled.th`
  padding: 1rem;
  cursor: pointer;
  border: 2px solid black;
`;

export const SubTitleTitle = styled.text`
  font-weight: 600;
  text-align: center;
`;

export const SubTitleText = styled.text`
  gap: 10px;
  font-size: 2.5rem;
`;

export const Td = styled.td`
  padding: 1rem;
  vertical-align: top;
  word-wrap: break-word;
  cursor: pointer;
  border: 2px solid black;
`;

export const Text = styled.div<{
  fontSize?: string;
  fontWeight?: boolean;
  marginTop?: string;
  marginBottom?: string;
}>`
  vertical-align: top;
  word-wrap: break-word;
  cursor: pointer;
  font-size: ${({ fontSize }) => `${fontSize ?? "1.5"}rem`};
  font-weight: ${({ fontWeight }) =>
    (fontWeight ?? false) ? "bold" : "normal"};
  margin-top: ${({ marginTop }) => `${marginTop ?? "0"}px`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom ?? "0"}px`};
`;

export const SubTable = styled.table`
  width: 100%;
  font-size: 0.875rem;
  table-layout: fixed;
  border-collapse: collapse;
`;

export const SubTh = styled.th<{ height?: number }>`
  cursor: pointer;
  height: ${({ height }) => (height ? `${height}px` : "auto")};
  border: 1px solid black;
`;

export const SubTd = styled.td<{ height?: number }>`
  padding: 0.5rem;
  word-wrap: break-word;
  vertical-align: middle;
  text-align: center;
  height: ${({ height }) => (height ? `${height}px` : "auto")};
  border: 1px solid black;
  width: 1px;
`;
