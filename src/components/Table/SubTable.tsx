import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useCallback, useEffect, useState } from "react";

import type { SubTableProps } from "../../types/schedule";
import { handleKeyDown } from "../../utils/handleTextWithNewLines";
import * as styled from "./styled";

const SubTable: React.FC<SubTableProps> = ({
  columns,
  data,
  updateData,
  tableIndex,
}) => {
  const [rowHeights, setRowHeights] = useState<Record<number, number>>({});

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const rowIndex = Number(entry.target.id.replace("row-", ""));
        setRowHeights((prev) => ({
          ...prev,
          [rowIndex]: entry.contentRect.height,
        }));
      });
    });

    table.getRowModel().rows.forEach((_, rowIndex) => {
      const row = document.getElementById(`row-${rowIndex}`);
      if (row) {
        observer.observe(row);
      }
    });

    return () => observer.disconnect();
  }, [table]);

  const handleCellBlur = useCallback(
    (
      rowIndex: number,
      columnId: string,
      value: string,
      cell: HTMLTableCellElement,
    ) => {
      updateData("value", value, true, true, tableIndex, rowIndex, columnId);
      const newHeight = cell.scrollHeight;
      setRowHeights((prev) => {
        if (prev[rowIndex] === newHeight) {
          return prev;
        }
        return { ...prev, [rowIndex]: newHeight };
      });
    },
    [updateData, tableIndex],
  );

  const handleCellClick = (
    e: React.MouseEvent<HTMLTableCellElement>,
    rowIndex: number,
    columnId: string,
  ) => {
    const target = e.currentTarget;
    target.contentEditable = "true";
    target.focus();

    const handleBlur = () => {
      handleCellBlur(rowIndex, columnId, target.textContent ?? "", target);
      target.contentEditable = "false";
      target.removeEventListener("blur", handleBlur);
    };

    target.addEventListener("blur", handleBlur);
  };

  if (data.length === 0) {
    return <styled.NoDataText>No data available</styled.NoDataText>;
  }

  return (
    <styled.StyledTable>
      <styled.TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <styled.TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const accessor = (
                header.column.columnDef as { accessor?: string }
              ).accessor;
              const text = accessor !== undefined ? accessor.toString() : "";
              return (
                <styled.HeaderCell key={header.id}>{text}</styled.HeaderCell>
              );
            })}
          </styled.TableRow>
        ))}
      </styled.TableHeader>
      <tbody>
        {table.getRowModel().rows.map((row, rowIndex) => (
          <styled.TableRow
            key={row.id}
            id={`row-${rowIndex}`}
            style={{
              height: rowHeights[rowIndex]
                ? `${rowHeights[rowIndex]}px`
                : "auto",
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <styled.TableCell
                key={cell.id}
                onClick={(e) => handleCellClick(e, rowIndex, cell.column.id)}
                onKeyDown={(e) => handleKeyDown(e)}
              >
                {row.original[cell.column.id]}
              </styled.TableCell>
            ))}
          </styled.TableRow>
        ))}
      </tbody>
    </styled.StyledTable>
  );
};

export default SubTable;
