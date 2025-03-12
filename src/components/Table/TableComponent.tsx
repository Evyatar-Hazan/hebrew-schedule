/* eslint-disable max-lines */
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useMemo, useRef } from "react";
import { flushSync } from "react-dom";
import { v4 as uuidv4 } from "uuid";

import type {
  Data,
  TableComponentProps,
  TableProps,
} from "../../types/schedule";
import {
  getTextWithNewLines,
  handleKeyDown,
  renderTextWithLineBreaks,
} from "../../utils/handleTextWithNewLines";
import DatePickerButton from "../datePicker/DatePickerButton";
import * as styled from "./styled";
import StyledTable from "./StyledTable";
import SubTable from "./SubTable";

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  updateData,
  onLoadData,
}) => {
  const [isPrint, setIsPrint] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState<Data[]>([]);
  const [cIndex, setCIndex] = React.useState<number>(0);
  const [rowIndex, setRowIndex] = React.useState<number>(0);
  const tableRef = useRef<HTMLTableElement>(null);

  const updateContentData = (
    contentData: Data[],
    index: number,
    rowIndex_: number,
  ) => {
    updateData("data", contentData, false, true, index, rowIndex_);
  };

  const handleOpenModal = (
    contentData: Data[],
    index: number,
    rowIndex_: number,
  ) => {
    setModalData(contentData);
    setCIndex(index);
    setRowIndex(rowIndex_);

    setIsModalOpen(true);
  };

  const columns = useMemo<ColumnDef<TableProps["data"][number]>[]>(
    () => [
      {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => {
          const { content } = row.original;
          return (
            <styled.SectionWrapper>
              {content.map((contentItem, index) => {
                const {
                  subTitle,
                  parasha,
                  dataDate,
                  data: contentData,
                  subFooter,
                  selectDate,
                  subTable,
                } = contentItem;

                return (
                  <div key={uuidv4()}>
                    <styled.SubTitle
                      contentEditable
                      suppressContentEditableWarning
                      onKeyDown={handleKeyDown}
                    >
                      <styled.SubTitleTitle
                        onBlur={(e) => {
                          const cleanedText = getTextWithNewLines(
                            e.currentTarget.innerHTML,
                          );
                          updateData(
                            "subTitle",
                            cleanedText,
                            false,
                            true,
                            index,
                            row.index,
                          );
                        }}
                      >
                        {renderTextWithLineBreaks(subTitle)}
                      </styled.SubTitleTitle>
                      <styled.SubTitleText
                        onBlur={(e) => {
                          const cleanedText = getTextWithNewLines(
                            e.currentTarget.innerHTML,
                          );
                          updateData(
                            "parasha",
                            cleanedText,
                            false,
                            true,
                            index,
                            row.index,
                          );
                        }}
                      >
                        {" "}
                        {renderTextWithLineBreaks(parasha)}
                      </styled.SubTitleText>
                    </styled.SubTitle>

                    <styled.SubTitle
                      onClick={() =>
                        handleOpenModal(contentData, index, row.index)
                      }
                    >
                      {contentData.map(
                        ({
                          textData,
                          fontSize,
                          fontWeight,
                          marginTop,
                          marginButton,
                        }) => (
                          <styled.Text
                            key={uuidv4()}
                            fontSize={fontSize}
                            fontWeight={fontWeight}
                            marginTop={marginTop}
                            marginButton={marginButton}
                          >
                            {renderTextWithLineBreaks(textData)}
                          </styled.Text>
                        ),
                      )}
                    </styled.SubTitle>

                    <SubTable
                      tableIndex={index}
                      updateData={updateData}
                      columns={subTable.columns}
                      data={subTable.rowData}
                    />

                    <styled.SubFooter
                      contentEditable
                      suppressContentEditableWarning
                      onKeyDown={handleKeyDown}
                      onBlur={(e) => {
                        const cleanedText = getTextWithNewLines(
                          e.currentTarget.innerHTML,
                        );
                        updateData(
                          "subFooter",
                          cleanedText,
                          false,
                          true,
                          index,
                          row.index,
                        );
                      }}
                    >
                      {renderTextWithLineBreaks(subFooter)}
                    </styled.SubFooter>

                    <styled.SubFooter
                      style={{ display: isPrint ? "none" : "black" }}
                    >
                      <DatePickerButton
                        key={selectDate}
                        onDateSelect={(newDates) => onLoadData(newDates, index)}
                        selectedDates={selectDate}
                      />
                    </styled.SubFooter>
                  </div>
                );
              })}
            </styled.SectionWrapper>
          );
        },
      },
    ],
    [isPrint, onLoadData, updateData],
  );

  const handlePdfAndImage = async () => {
    flushSync(() => setIsPrint(true));
    if (tableRef.current) {
      try {
        const canvas = await html2canvas(tableRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: null,
          scrollX: 0,
          scrollY: 0,
          width: tableRef.current.clientWidth,
          height: tableRef.current.clientHeight,
        });

        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "table-screenshot.png";
        link.click();

        const pdf = new jsPDF("l", "mm", "a4");
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("table-screenshot.pdf");
      } catch (error) {
        /* empty */
      }
    }
    setIsPrint(false);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div>
        <styled.TableWrapper ref={tableRef}>
          <tbody>
            <tr key={data[0]?.header || "default-key"}>
              <td colSpan={columns.length}>
                <styled.SectionHeader
                  key={data[0]?.header || "default-key"}
                  contentEditable
                  suppressContentEditableWarning
                  onKeyDown={handleKeyDown}
                  onBlur={(e) => {
                    const cleanedText = getTextWithNewLines(
                      e.currentTarget.innerHTML,
                    );
                    updateData("header", cleanedText, false, false, 0);
                  }}
                >
                  {renderTextWithLineBreaks(data[0]?.header || "")}
                </styled.SectionHeader>
              </td>
            </tr>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            <td key={data[0]?.footer || "default-key"} colSpan={columns.length}>
              <styled.Footer
                key={data[0]?.footer || "default-key"}
                contentEditable
                suppressContentEditableWarning
                onKeyDown={handleKeyDown}
                onBlur={(e) => {
                  const cleanedText = getTextWithNewLines(
                    e.currentTarget.innerHTML,
                  );
                  updateData("footer", cleanedText, false, false, 0);
                }}
              >
                {renderTextWithLineBreaks(data[0]?.footer || "")}
              </styled.Footer>
            </td>
          </tbody>
        </styled.TableWrapper>
      </div>
      {isModalOpen && (
        <StyledTable
          data={modalData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          updateContentData={updateContentData}
          cIndex={cIndex}
          rowIndex={rowIndex}
        />
      )}
      <button
        onClick={handlePdfAndImage}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        📸 צילום מסך
      </button>
    </div>
  );
};

export default TableComponent;
