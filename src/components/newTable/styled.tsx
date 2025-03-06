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
`;

export const HeaderCellStyle = `
  border: 2px solid black;
  padding: 1rem;
  text-align: center;
`;

export const HeaderCell = styled.th`
  ${HeaderCellStyle}
`;

export const SectionHeaderStyle = `
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  border: 2px solid black;
  border-collapse: collapse;
`;

export const SectionHeader = styled.div`
  ${SectionHeaderStyle}
`;

export const SubTitleStyle = `
  font-size: 1.25rem;
  padding: 1rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid black;
  cursor: pointer;
  word-wrap: break-word;
  white-space: normal;
`;

export const SubTitle = styled.div`
  ${SubTitleStyle}
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
  font-size: 1.25rem;
`;

export const SubFooter = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  border: 2px solid black;
`;

export const StyledDiv = styled.div<{ componentStyle: string }>`
  ${({ componentStyle }) => componentStyle};
`;

export const StyledInput = styled.input<{ componentStyle: string }>`
  ${({ componentStyle }) => componentStyle};
`;

export const Input = styled.input``;
