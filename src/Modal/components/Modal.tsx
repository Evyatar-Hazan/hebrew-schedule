import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Th } from "../../table/styles/styles";
import type { Data } from "../../table/types/types";
import {
  getTextWithNewLines,
  handleKeyDown,
} from "../../utils/handleTextWithNewLines";
import {
  Button,
  Input,
  ModalBackground,
  ModalContent,
  Select,
  Table,
  Td,
} from "../styles/styles";

type StyledTableProps = {
  data: Data[];

  onClose: () => void;

  onSave: (updatedData: Data[]) => void;
};

const ModalTable: React.FC<StyledTableProps> = ({ data, onClose, onSave }) => {
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

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Table>
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
                <Th key={header}>{header}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {localData.map((item, index) => (
              <tr key={uuidv4()}>
                <Td
                  contentEditable
                  suppressContentEditableWarning
                  onKeyDown={handleKeyDown}
                  onBlur={(e) =>
                    updateData(index, {
                      textData: getTextWithNewLines(e.currentTarget.innerHTML),
                    })
                  }
                >
                  {item.textData}
                </Td>
                {[
                  { key: "fontSize", type: "number", min: "0.1", step: "0.1" },
                  { key: "marginTop", type: "number", min: "0" },
                  { key: "marginBottom", type: "number", min: "0" },
                ].map(({ key, ...props }) => (
                  <Td key={key}>
                    <Input
                      {...props}
                      value={item[key as keyof Data] as string | number}
                      onChange={(e) =>
                        updateData(index, { [key]: e.target.value })
                      }
                    />
                  </Td>
                ))}
                <Td>
                  <Select
                    value={item.fontWeight ? "true" : "false"}
                    onChange={(e) =>
                      updateData(index, {
                        fontWeight: e.target.value === "true",
                      })
                    }
                  >
                    <option value="true">כן</option>
                    <option value="false">לא</option>
                  </Select>
                </Td>
                <Td>
                  <Button onClick={() => deleteItem(index)}>מחיקה</Button>
                  <Button onClick={() => addNewItem(index)}>+</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* כפתורי סגירה ושמירה */}
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}
        >
          <Button onClick={onClose} style={{ marginLeft: 8 }}>
            ביטול
          </Button>
          <Button onClick={() => onSave(localData)}>שמירה</Button>
        </div>
      </ModalContent>
    </ModalBackground>
  );
};

export default ModalTable;
