import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import type { Data } from "../../types/schedule";
import {
  getTextWithNewLines,
  handleKeyDown,
  renderTextWithLineBreaks,
} from "../../utils/handleTextWithNewLines";

const ModalBackground = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 80%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: center;
  background-color: #f4f4f4;
  font-weight: 600;
  color: #333;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const Input = styled.input`
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

const Select = styled.select`
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

const Button = styled.button`
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

interface StyledTableProps {
  data: Data[];
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  updateContentData: (
    contentData: Data[],
    index: number,
    rowIndex: number,
  ) => void;
  cIndex: number;
  rowIndex: number;
}

const StyledTable: React.FC<StyledTableProps> = ({
  data,
  isModalOpen,
  setIsModalOpen,
  updateContentData,
  cIndex,
  rowIndex,
}) => {
  const [localData, setLocalData] = useState<Data[]>(data);

  const deleteItem = (index: number) => {
    setLocalData((prev) => prev.filter((_, i) => i !== index));
  };

  const addNewItem = (index: number) => {
    const newItem: Data = {
      textData: "",
      fontSize: "1.0",
      fontWeight: false,
      marginTop: "0",
      marginButton: "0",
    };

    setLocalData((prev) => {
      const updatedData = [...prev];
      updatedData.splice(index + 1, 0, newItem);
      return updatedData;
    });
  };

  const handleTextChange = (index: number, newText: string) => {
    setLocalData((prev) => {
      const updatedData = [...prev];
      updatedData[index].textData = newText;
      return updatedData;
    });
  };

  const handleStyleChange = (index: number, key: string, value: string) => {
    setLocalData((prev) => {
      const updatedData = [...prev];
      const currentItem = updatedData[index];

      if (key === "fontWeight") {
        currentItem[key] = value === "true";
      } else {
        (currentItem as unknown as Record<string, string | boolean>)[key] =
          value;
      }

      return updatedData;
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(false);
    updateContentData(localData, cIndex, rowIndex);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <ModalBackground onClick={handleModalOpen}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Table>
          <thead>
            <tr>
              <Th>טקסט</Th>
              <Th>גודל</Th>
              <Th>מודגש</Th>
              <Th>מרחק מלמעלה</Th>
              <Th>מרחק מלמטה</Th>
              <Th>מחיקה/הוספה</Th>
            </tr>
          </thead>
          <tbody>
            {localData.map((item, index) => (
              <tr key={uuidv4()}>
                <Td
                  contentEditable
                  suppressContentEditableWarning
                  onKeyDown={handleKeyDown}
                  onBlur={(e) => {
                    const cleanedText = getTextWithNewLines(
                      e.currentTarget.innerHTML,
                    );
                    handleTextChange(index, cleanedText);
                  }}
                >
                  {renderTextWithLineBreaks(item.textData)}
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={item.fontSize}
                    onChange={(e) =>
                      handleStyleChange(index, "fontSize", e.target.value)
                    }
                    step="0.1"
                    min="0.1"
                  />
                </Td>

                <Td>
                  <Select
                    value={item.fontWeight ? "true" : "false"}
                    onChange={(e) =>
                      handleStyleChange(index, "fontWeight", e.target.value)
                    }
                  >
                    <option value="true">כן</option>
                    <option value="false">לא</option>
                  </Select>
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={item.marginTop}
                    onChange={(e) =>
                      handleStyleChange(index, "marginTop", e.target.value)
                    }
                    min="0"
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={item.marginButton}
                    onChange={(e) =>
                      handleStyleChange(index, "marginButton", e.target.value)
                    }
                    min="0"
                  />
                </Td>
                <Td>
                  <Button onClick={() => deleteItem(index)}>מחיקה</Button>
                  <Button onClick={() => addNewItem(index)}>+</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ModalContent>
    </ModalBackground>
  );
};

export default StyledTable;
