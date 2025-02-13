import React, { ReactNode } from 'react';

interface TableProps {
  className?: string;
  content: (React.ReactNode | { content: React.ReactNode;})[][];
}

interface CellProps {
  cell: ReactNode | { content: React.ReactNode };
}

const TableCell: React.FC<CellProps> = ({ cell }) => {
  if (cell !== null && typeof cell === 'object' && 'content' in cell) {
    return (
      <td style={{ 
        border: '1px solid black', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minWidth: '200px',  /* גודל מינימום */
        minHeight: '100px', /* גובה מינימום */
        overflow: 'hidden', /* מונע יציאה מעבר לגבולות התא */
        textOverflow: 'ellipsis', /* חותך את הטקסט אם הוא ארוך מדי */
        whiteSpace: 'nowrap', /* מונע מעבר שורות */
        wordBreak: 'break-word', /* מוודא שהמילים לא יפוצלו אם הן ארוכות מדי */
      }}>
        {cell.content}
      </td>
    );
  }

  return <td style={{ border: '1px solid black', padding: '8px' }}>{cell}</td>;
};

const Table: React.FC<TableProps> = ({ content, className }) => {
  return (
    <table className={className} style={{ width: '100%', borderCollapse: 'collapse', direction: 'rtl' }}>
      <tbody >
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
