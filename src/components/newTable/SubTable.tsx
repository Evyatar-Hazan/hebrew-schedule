import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useState } from "react";

import type { SubTableProps } from "../../types/schedule";
import * as styled from "./styled";

const SubTable: React.FC<SubTableProps> = ({
  columns,
  data,
  updateData,
  tableIndex,
}) => {
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    columnId: string;
  } | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });

  const handleCellClick = (
    rowIndex: number,
    columnId: string,
    value: string,
  ) => {
    setEditingCell({ rowIndex, columnId });
    setInputValue(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (editingCell) {
      updateData(
        "value",
        inputValue,
        true,
        true,
        tableIndex,
        editingCell.rowIndex,
        editingCell.columnId,
      );
      setEditingCell(null);
    }
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
              const text = (header.column.columnDef as never)["accessor"] ?? "";
              return (
                <styled.HeaderCell key={header.id}>{text}</styled.HeaderCell>
              );
            })}
          </styled.TableRow>
        ))}
      </styled.TableHeader>
      <tbody>
        {table.getRowModel().rows.map((row, rowIndex) => (
          <styled.TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const isEditing =
                editingCell?.rowIndex === rowIndex &&
                editingCell.columnId === cell.column.id;
              return (
                <styled.TableCell
                  key={cell.id}
                  onClick={() =>
                    handleCellClick(
                      rowIndex,
                      cell.column.id,
                      row.original[cell.column.id],
                    )
                  }
                >
                  {isEditing ? (
                    <styled.Input
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      autoFocus
                    />
                  ) : (
                    row.original[cell.column.id]
                  )}
                </styled.TableCell>
              );
            })}
          </styled.TableRow>
        ))}
      </tbody>
    </styled.StyledTable>
  );
};

export default SubTable;
