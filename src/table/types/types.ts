export type SubColumn = { name: string; rows: string[] };
export type Data = {
  textData: string;
  fontSize: string;
  fontWeight: boolean;
  marginTop: string;
  marginBottom: string;
};

export type RowIndex = {
  SubTitle: { title: string; parasha: string };
  Data: Data[];
  SubTable: { subcolumns: SubColumn[] };
  SubFooter: string;
  Date: string;
};

export type RowType = string | { subcolumns: SubColumn[] } | Data[];

export type Column = { column: string; rows: RowType[] };

export type JsonData = { header: string; content: Column[]; footer: string };

export type NestedTableProps = { data: JsonData };

export type handleEditType = (
  value: string,
  colIndex: number,
  rowIndex: number,
  subColIndex?: number,
  subRowIndex?: number,
) => void;

export type handleEditDataType = (
  value: Data[],
  colIndex: number,
  rowIndex: number,
  subColIndex?: number,
  subRowIndex?: number,
) => void;

export type handleHeaderEditType = (value: string, colIndex: number) => void;

export type ChangeType = (value: string) => void;

export type setCellRefType = (key: string, el: HTMLDivElement | null) => void;

export type handleSubHeaderEditType = (
  value: string,
  colIndex: number,
  subColIndex: number,
) => void;

export type subRowHeightsType = Record<string, number>;

export type UseEditableTableReturnType = {
  data: Column[];
  handleEdit: handleEditType;
  handleEditData: handleEditDataType;
  handleHeaderEdit: handleHeaderEditType;
  handleTitleChange: ChangeType;
  handleFooterChange: ChangeType;
  setCellRef: setCellRefType;
  handleSubHeaderEdit: handleSubHeaderEditType;
  title: string;
  footer: string;
  subRowHeights: subRowHeightsType;
  maxRowLength: number;
  fetchDataByDate: (dates: string[]) => Promise<void>;
};
