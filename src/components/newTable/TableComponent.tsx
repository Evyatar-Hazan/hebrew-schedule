import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import styled from "styled-components";
import { v4 } from "uuid";

import type { TableProps } from "../../types/schedule";

type RowData = Record<string, string>;

type SubTableProps = {
  columns: { accessor: string; header: string }[];
  data: RowData[];
};

const TableWrapper = styled.div`
  display: flex;
  justify-content: row-reverse;
  align-items: center;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
`;

const TableHeader = styled.thead`
  border: 2px solid black;
`;

const TableRow = styled.tr<{ isEven?: boolean }>`
  border: 2px solid black;
`;

const TableCell = styled.td`
  border: 2px solid black;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  word-wrap: break-word;
  white-space: normal;
`;

const HeaderCell = styled.th`
  border: 2px solid black;
  padding: 1rem;
  text-align: center;
`;

const SectionHeader = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  border: 2px solid black;
`;

const SubTitle = styled.div`
  font-size: 1.25rem;
  padding: 1rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid black;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  border: 2px solid black;
`;

const NoDataText = styled.p`
  border: 2px solid black;
  text-align: center;
  font-size: 1rem;
`;

const Footer = styled.div`
  padding: 1rem;
  border: 2px solid black;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
`;

const SubTable: React.FC<SubTableProps> = ({ columns, data }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return <NoDataText>No data available</NoDataText>;
  }

  return (
    <StyledTable>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const text =
                /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition*/
                (header.column.columnDef as never)["accessor"] ?? "";

              return <HeaderCell key={header.id}>{text}</HeaderCell>;
            })}
          </TableRow>
        ))}
      </TableHeader>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {row.original[cell.column.id]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};

const TableComponent: React.FC<TableProps> = ({ data }) => (
  <TableWrapper>
    {data.map((table) => (
      <div key={v4()}>
        <SectionHeader>{table.header}</SectionHeader>

        <SectionWrapper>
          {table.content.map((content) => (
            <div key={v4()}>
              <SubTitle>{content.subTitle}</SubTitle>
              <SubTitle>{content.data}</SubTitle>
              <SubTable
                columns={content.subTable.columns}
                data={content.subTable.rowData}
              />
              <Footer>{content.subFooter}</Footer>
            </div>
          ))}
        </SectionWrapper>
        <Footer>{table.footer}</Footer>
      </div>
    ))}
  </TableWrapper>
);

export default TableComponent;
