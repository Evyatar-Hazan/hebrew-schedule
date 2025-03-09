import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
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

                    <styled.SubFooter>
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
    [onLoadData, updateData],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <styled.TableWrapper>
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default TableComponent;
