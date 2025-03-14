import styled from "styled-components";

export const TableWrapper = styled.table`
  border-collapse: collapse;
  table-layout: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
`;

export const TableHeader = styled.thead`
  border: 2px solid black;
`;

export const TableRow = styled.tr<{ isEven?: boolean }>`
  border: 2px solid black;
`;

export const TableCell = styled.td`
  border: 2px solid black;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-line;
`;

export const HeaderCellStyle = `
  border: 2px solid black;
  padding: 1rem;
  text-align: center;
`;

export const HeaderCell = styled.th`
  ${HeaderCellStyle}
`;

export const SectionHeader = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  border: 2px solid black;
`;

export const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  padding: 1rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid black;
  cursor: pointer;
  word-wrap: break-word;
  white-space: pre-line;
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  border: 2px solid black;
`;

export const NoDataText = styled.p`
  border: 2px solid black;
  text-align: center;
  font-size: 1rem;
`;

export const Footer = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  border: 2px solid black;
  border-collapse: collapse;
  white-space: pre-line;
`;

export const SubFooter = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  border: 2px solid black;
  white-space: pre-line;
`;

export const StyledDiv = styled.div<{ componentStyle: string }>`
  ${({ componentStyle }) => componentStyle};
`;

export const StyledInput = styled.input<{ componentStyle: string }>`
  ${({ componentStyle }) => componentStyle};
`;

export const Input = styled.input``;

export const SubTitleTitle = styled.text``;

export const SubTitleText = styled.text`
  gap: 10px;
  font-size: 2.5rem;
`;

export const Text = styled.text<{
  fontSize?: string;
  fontWeight?: boolean;
  marginTop?: string;
  marginButton?: string;
}>`
  font-size: ${({ fontSize }) => `${fontSize ?? "1.5"}rem`};
  font-weight: ${({ fontWeight }) =>
    (fontWeight ?? false) ? "bold" : "normal"};
  margin-top: ${({ marginTop }) => `${marginTop ?? "0"}px`};
  margin-button: ${({ marginButton }) => `${marginButton ?? "0"}px`};
`;
