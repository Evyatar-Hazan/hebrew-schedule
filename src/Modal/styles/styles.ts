// styles/ModalStyles.ts

import styled from "styled-components";

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
  white-space: pre-wrap;
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
