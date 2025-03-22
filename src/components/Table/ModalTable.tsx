import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { Data } from "../../types/schedule";
import {
  getTextWithNewLines,
  handleKeyDown,
  renderTextWithLineBreaks,
} from "../../utils/handleTextWithNewLines";
import * as styled from "./styled";

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

const ModalTable: React.FC<StyledTableProps> = ({
  data,
  isModalOpen,
  setIsModalOpen,
  updateContentData,
  cIndex,
  rowIndex,
}) => {
  const [localData, setLocalData] = useState<Data[]>(data);

  const updateData = (index: number, newData: Partial<Data>) => {
    setLocalData((prev) => {
      const updatedData = [...prev];
      updatedData[index] = { ...updatedData[index], ...newData };
      return updatedData;
    });
  };

  const deleteItem = (index: number) => {
    setLocalData((prev) => prev.filter((_, i) => i !== index));
  };

  const addNewItem = (index: number) => {
    const newItem: Data = {
      textData: "",
      fontSize: "1.0",
      fontWeight: false,
      marginTop: "0",
      marginBottom: "0",
    };

    setLocalData((prev) => {
      const updatedData = [...prev];
      updatedData.splice(index + 1, 0, newItem);
      return updatedData;
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    updateContentData(localData, cIndex, rowIndex);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <styled.ModalBackground onClick={handleModalClose}>
      <styled.ModalContent onClick={(e) => e.stopPropagation()}>
        <styled.Table>
          <thead>
            <tr>
              {[
                "טקסט",
                "גודל",
                "מרחק מלמעלה",
                "מרחק מלמטה",
                "מודגש",
                "פעולות",
              ].map((header) => (
                <styled.Th key={header}>{header}</styled.Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {localData.map((item, index) => (
              <tr key={uuidv4()}>
                <styled.Td
                  contentEditable
                  suppressContentEditableWarning
                  onKeyDown={handleKeyDown}
                  onBlur={(e) =>
                    updateData(index, {
                      textData: getTextWithNewLines(e.currentTarget.innerHTML),
                    })
                  }
                >
                  {renderTextWithLineBreaks(item.textData)}
                </styled.Td>
                {[
                  { key: "fontSize", type: "number", min: "0.1", step: "0.1" },
                  { key: "marginTop", type: "number", min: "0" },
                  { key: "marginBottom", type: "number", min: "0" },
                ].map(({ key, ...props }) => (
                  <styled.Td key={key}>
                    <styled.Input
                      {...props}
                      value={item[key as keyof Data] as string | number}
                      onChange={(e) =>
                        updateData(index, { [key]: e.target.value })
                      }
                    />
                  </styled.Td>
                ))}
                <styled.Td>
                  <styled.Select
                    value={item.fontWeight ? "true" : "false"}
                    onChange={(e) =>
                      updateData(index, {
                        fontWeight: e.target.value === "true",
                      })
                    }
                  >
                    <option value="true">כן</option>
                    <option value="false">לא</option>
                  </styled.Select>
                </styled.Td>
                <styled.Td>
                  <styled.Button onClick={() => deleteItem(index)}>
                    מחיקה
                  </styled.Button>
                  <styled.Button onClick={() => addNewItem(index)}>
                    +
                  </styled.Button>
                </styled.Td>
              </tr>
            ))}
          </tbody>
        </styled.Table>
      </styled.ModalContent>
    </styled.ModalBackground>
  );
};

export default ModalTable;
