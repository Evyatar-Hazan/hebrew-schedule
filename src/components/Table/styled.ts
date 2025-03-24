import styled from "styled-components";

const commonStyles = `
  border: 2px solid black;
  padding: 1rem;
  text-align: center;
`;

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
  ${commonStyles};
`;

export const TableRow = styled.tr<{ isEven?: boolean }>`
  ${commonStyles};
`;

export const TableCell = styled.td`
  ${commonStyles};
  cursor: pointer;
  word-wrap: break-word;
  white-space: pre-line;
`;

export const HeaderCell = styled.th`
  ${commonStyles};
`;

export const SectionHeader = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  ${commonStyles};
`;

export const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  padding: 1rem;
  font-weight: 600;
  text-align: center;
  ${commonStyles};
  cursor: pointer;
  word-wrap: break-word;
  white-space: pre-line;
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid black;
`;

export const NoDataText = styled.p`
  ${commonStyles};
  text-align: center;
  font-size: 1rem;
`;

export const Footer = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  ${commonStyles};
  border-collapse: collapse;
  white-space: pre-line;
`;

export const SubFooter = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  ${commonStyles};
  white-space: pre-line;
`;

export const StyledDiv = styled.div<{ componentStyle: string }>`
  ${({ componentStyle }) => componentStyle};
`;

export const StyledInput = styled.input<{ componentStyle: string }>`
  ${({ componentStyle }) => componentStyle};
`;

export const SubTitleTitle = styled.text``;

export const SubTitleText = styled.text`
  gap: 10px;
  font-size: 2.5rem;
`;

export const Text = styled.text<{
  fontSize?: string;
  fontWeight?: boolean;
  marginTop?: string;
  marginBottom?: string;
}>`
  font-size: ${({ fontSize }) => `${fontSize ?? "1.5"}rem`};
  font-weight: ${({ fontWeight }) =>
    (fontWeight ?? false) ? "bold" : "normal"};
  margin-top: ${({ marginTop }) => `${marginTop ?? "0"}px`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom ?? "0"}px`};
`;

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 80%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: center;
  background-color: #f4f4f4;
  font-weight: 600;
  color: #333;
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

export const Input = styled.input`
  text-align: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  font-size: 14px;
  width: 50%;
  box-sizing: border-box;
  margin: 5px 0;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  margin: 5px 0;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 8px 15px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: #218838;
  }

  &:focus {
    outline: none;
  }
`;
