import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import type { TableComponentProps, TableProps } from "../../types/schedule";
import * as styled from "./styled";
import SubTable from "./SubTable";

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  updateData,
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
                  subTable,
                } = contentItem;

                return (
                  <div key={uuidv4()}>
                    <styled.SubTitle
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        updateData(
                          "subTitle",
                          e.currentTarget.textContent ?? "",
                          false,
                          true,
                          index,
                          row.index,
                        )
                      }
                    >
                      {subTitle}
                    </styled.SubTitle>
                    <styled.SubTitle
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        updateData(
                          "data",
                          e.currentTarget.textContent ?? "",
                          false,
                          true,
                          index,
                          row.index,
                        )
                      }
                    >
                      {contentData}
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
                      onBlur={(e) =>
                        updateData(
                          "subFooter",
                          e.currentTarget.textContent ?? "",
                          false,
                          true,
                          index,
                          row.index,
                        )
                      }
                    >
                      {subFooter}
                    </styled.SubFooter>
                  </div>
                );
              })}
            </styled.SectionWrapper>
          );
        },
      },
      {
        accessorKey: "footer",
        header: "Footer",
        cell: ({ row }) => (
          <styled.Footer
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateData(
                "footer",
                e.currentTarget.textContent ?? "",
                false,
                false,
                row.index,
              )
            }
          >
            {row.original.footer}
          </styled.Footer>
        ),
      },
    ],
    [updateData],
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
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateData(
                "header",
                e.currentTarget.textContent ?? "",
                false,
                false,
                0,
              )
            }
          >
            {data[0]?.header}
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
      </table>
    </styled.TableWrapper>
  );
};

export default TableComponent;
