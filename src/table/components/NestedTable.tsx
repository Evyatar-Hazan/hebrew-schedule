/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable max-lines */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState } from "react";

import DatePickerButton from "../../components/datePicker/DatePickerButton";
import EditRowModal from "../../Modal/components/Modal";
import { useEditableTable } from "../hooks/useEditableTable";
import {
  SubTable,
  SubTd,
  SubTh,
  SubTitleText,
  SubTitleTitle,
  Table,
  Td,
  Text,
  Th,
  Wrapper,
} from "../styles/styles";
import type { Data, UseEditableTableReturnType } from "../types/types";
import PlayfulLoader from "./cuteLoader";
import Footer from "./footer";
import Header from "./header";

interface NestedTableProps {
  dates: string[];
  setDates: (val: string[]) => void;
  isPrint: boolean;
  tableRef: React.RefObject<HTMLTableElement | null>;
}

const NestedTable: React.FC<NestedTableProps> = ({
  dates,
  setDates,
  isPrint,
  tableRef,
}) => {
  const {
    data,
    handleEdit,
    handleEditData,
    handleHeaderEdit,
    handleTitleChange,
    handleFooterChange,
    handleSubHeaderEdit,
    setCellRef,
    title,
    footer,
    subRowHeights,
    maxRowLength,
    fetchDataByDate,
  }: UseEditableTableReturnType =
    useEditableTable() as UseEditableTableReturnType;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Data[]>([]);

  const [modalPosition, setModalPosition] = useState<{
    col: number;
    row: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchDataByDate(dates);
    };
    fetchData();
  }, [dates, fetchDataByDate]);

  const openModal = useCallback(
    (modalDataParam: Data[], colIndex: number, rowIndex: number) => {
      setModalData(modalDataParam);
      setModalPosition({ col: colIndex, row: rowIndex });
      setIsModalOpen(true);
    },
    [],
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData([]);
    setModalPosition(null);
  };

  const saveModalData = (updatedData: Data[]) => {
    if (!modalPosition) {
      return;
    }
    const { col, row } = modalPosition;
    handleEditData(updatedData, col, row);
    closeModal();
  };

  if (dates.length === 0) {
    return <PlayfulLoader />;
  }

  return (
    <>
      <Wrapper ref={tableRef}>
        <Header title={title} handleTitleChange={handleTitleChange} />
        <Table>
          <thead>
            <tr>
              {data.map((col, idx) => {
                const [title_, text] = col.column.split("\n");
                return (
                  <Th
                    key={idx}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleHeaderEdit(e.target.innerText, idx)}
                  >
                    <SubTitleTitle>{title_ + "\n"}</SubTitleTitle>
                    <SubTitleText>{text}</SubTitleText>
                  </Th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {Array.from({
              length: maxRowLength,
            }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {data.map((col, colIndex) => {
                  const row = col.rows[rowIndex];
                  if (typeof row === "string") {
                    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
                    const match = row.match(regex);
                    if (match) {
                      if (isPrint) {
                        return null;
                      }
                      return (
                        <Td key={`${colIndex}-${rowIndex}`}>
                          <DatePickerButton
                            key={row}
                            onDateSelect={(newDate) => {
                              const newDates = [...dates];
                              newDates[colIndex] = newDate;
                              setDates(newDates);
                            }}
                            selectedDates={dates[colIndex]}
                          />
                        </Td>
                      );
                    }
                    return (
                      <Td
                        key={`${colIndex}-${rowIndex}`}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleEdit(e.target.innerText, colIndex, rowIndex)
                        }
                      >
                        {row}
                      </Td>
                    );
                  }
                  if (Array.isArray(row)) {
                    return (
                      <Td
                        key={`${colIndex}-${rowIndex}`}
                        contentEditable
                        suppressContentEditableWarning
                        onClick={() =>
                          openModal(row as Data[], colIndex, rowIndex)
                        }
                      >
                        {row.map(
                          ({
                            textData,
                            fontSize,
                            fontWeight,
                            marginTop,
                            marginBottom,
                          }) => (
                            <Text
                              key={`${colIndex}-${rowIndex}`}
                              fontSize={fontSize}
                              fontWeight={fontWeight}
                              marginTop={marginTop}
                              marginBottom={marginBottom}
                            >
                              {textData}
                            </Text>
                          ),
                        )}
                      </Td>
                    );
                  }
                  return (
                    <Td key={`${colIndex}-${rowIndex}`}>
                      <SubTable>
                        <thead>
                          <tr>
                            {row.subcolumns.map((subcol, subColIndex) => (
                              <SubTh
                                key={`${colIndex}-${rowIndex}-${subColIndex}`}
                                height={
                                  subRowHeights[
                                    `${subColIndex}-${rowIndex + 1}`
                                  ]
                                }
                              >
                                <div
                                  ref={(el) => {
                                    if (el) {
                                      setCellRef(
                                        `${colIndex}-${subColIndex}-${rowIndex + 1}`,
                                        el,
                                      );
                                    }
                                  }}
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) =>
                                    handleSubHeaderEdit(
                                      e.target.innerText,
                                      colIndex,
                                      subColIndex,
                                    )
                                  }
                                >
                                  {subcol.name}
                                </div>
                              </SubTh>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({
                            length: Math.max(
                              ...(row.subcolumns.map((s) => s.rows.length) ?? [
                                0,
                              ]),
                            ),
                          }).map((__, subRowIndex) => {
                            const groupKey = `${rowIndex}-${subRowIndex}`;
                            const cellKey = `${colIndex}-${rowIndex}-${subRowIndex}`;

                            return (
                              <tr key={cellKey}>
                                {row.subcolumns.map((subcol, subColIndex) => (
                                  <SubTd
                                    key={`${cellKey}-${subColIndex}`}
                                    height={subRowHeights[groupKey]}
                                  >
                                    <div
                                      style={{
                                        display: "inline-block",
                                        textAlign: "center",
                                      }}
                                      ref={(el) => {
                                        if (el) {
                                          setCellRef(
                                            `${colIndex}-${rowIndex}-${subRowIndex}-${subColIndex}`,
                                            el,
                                          );
                                        }
                                      }}
                                      contentEditable
                                      suppressContentEditableWarning
                                      onBlur={(e) =>
                                        handleEdit(
                                          e.target.innerText,
                                          colIndex,
                                          rowIndex,
                                          subColIndex,
                                          subRowIndex,
                                        )
                                      }
                                    >
                                      {subcol.rows[subRowIndex]}
                                    </div>
                                  </SubTd>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </SubTable>
                    </Td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>

        <Footer title={footer} handleFooterChange={handleFooterChange} />
        {isModalOpen && (
          <EditRowModal
            data={modalData as Data[]}
            onClose={closeModal}
            onSave={saveModalData}
          />
        )}
      </Wrapper>
    </>
  );
};

export default NestedTable;
