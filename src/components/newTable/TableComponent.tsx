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

import type { TableComponentProps, TableProps } from "../../types/schedule";
import DatePickerButton from "../ParshaTable/DatePickerButton";
import * as styled from "./styled";
import SubTable from "./SubTable";

const getTextWithNewLines = (html: string) =>
  html
    .replace(/<div>/g, "\n")
    .replace(/<\/div>/g, "")
    .replace(/<br>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .trim();

const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.execCommand("insertLineBreak");
  }
};

const renderTextWithLineBreaks = (text: string) =>
  text.split("\n").map((line) => (
    <React.Fragment key={uuidv4()}>
      {line}
      <br />
    </React.Fragment>
  ));

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  updateData,
  onLoadData,
}) => {
  const [isPrint, setIsPrint] = React.useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

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
                    </styled.SubTitle>

                    <styled.SubTitle
                      contentEditable
                      suppressContentEditableWarning
                      onKeyDown={handleKeyDown}
                      onBlur={(e) => {
                        const cleanedText = getTextWithNewLines(
                          e.currentTarget.innerHTML,
                        );
                        updateData(
                          "data",
                          cleanedText,
                          false,
                          true,
                          index,
                          row.index,
                        );
                      }}
                    >
                      {renderTextWithLineBreaks(contentData)}
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
          <table>
            <thead>
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
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

            <footer>
              <styled.Footer
                contentEditable
                suppressContentEditableWarning
                onKeyDown={handleKeyDown}
                onBlur={(e) => {
                  const cleanedText = getTextWithNewLines(
                    e.currentTarget.innerHTML,
                  );
                  updateData("footer", cleanedText, false, false);
                }}
              >
                {renderTextWithLineBreaks(data[0]?.footer || "")}
              </styled.Footer>
            </footer>
          </table>
        </styled.TableWrapper>
      </div>
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
