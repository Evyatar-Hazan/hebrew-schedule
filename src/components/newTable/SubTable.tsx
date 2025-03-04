import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

import type { SubTableProps } from "../../types/schedule";
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
    const initialHeights: Record<number, number> = {};
    table.getRowModel().rows.forEach((row, rowIndex) => {
      initialHeights[rowIndex] =
        document.getElementById(`row-${rowIndex}`)?.offsetHeight ?? 0;
    });
    setRowHeights(initialHeights);
  }, [data, table]);

  const handleCellBlur = (
    rowIndex: number,
    columnId: string,
    value: string,
    cell: HTMLTableCellElement,
  ) => {
    updateData("value", value, true, true, tableIndex, rowIndex, columnId);

    const newHeight = cell.scrollHeight;
    setRowHeights((prev) => ({
      ...prev,
      [rowIndex]: newHeight,
    }));
  };

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
              const text = header.column.id;
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
