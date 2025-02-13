import React, { ReactNode } from 'react';

interface TableProps {
  content: (React.ReactNode | { content: React.ReactNode;})[][];
}

interface CellProps {
  cell: ReactNode | { content: React.ReactNode };
}

const TableCell: React.FC<CellProps> = ({ cell }) => {
  if (cell !== null && typeof cell === 'object' && 'content' in cell) {
    return (
      <td style={{ border: '1px solid black', padding: '8px' }}>
        {cell.content}
      </td>
    );
  }

  return <td style={{ border: '1px solid black', padding: '8px' }}>{cell}</td>;
};

const Table: React.FC<TableProps> = ({ content }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', direction: 'rtl' }}>
      <tbody>
        {content.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex} cell={cell} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
