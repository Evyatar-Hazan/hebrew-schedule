import type { ReactNode } from "react";

export interface TimeData {
  hour: string;
  minute: string;
}

export interface ScheduleItem {
  title: string;
  time: TimeData;
}

export interface DaySchedule {
  date: string;
  parasha: string;
  haftara: string;
  avot: string;
  times: {
    shemaEnd: TimeData;
    tefillah: TimeData;
    candleLighting: TimeData;
    shabbatEnd: TimeData;
    rtTime: TimeData;
  };
}

export type ContentProps = {
  subTitle: string;
  parasha: string;
  data: string;
  subTable: {
    columns: {
      header: string;
      accessor: string;
    }[];
    rowData: Record<string, string>[];
  };
  subFooter: string;
  selectDate?: string;
};

export type UpdateDataProps = (
  id: string,
  newData: string,
  isSubTable: boolean,
  isContent: boolean,
  index?: number,
  subTableRowIndex?: number,
  subTableKey?: string,
) => void;

export type TableProps = {
  data: {
    header: string;
    content: ContentProps[];
    footer: string;
    [key: string]: string | ContentProps[];
  }[];
};

export type TableComponentProps = {
  data: TableProps["data"];
  updateData: UpdateDataProps;
  onLoadData: (date: string, index?: number) => void;
};

export type RowData = Record<string, string>;

export type SubTableProps = {
  tableIndex: number;
  columns: { accessor: string; header: string }[];
  data: RowData[];
  updateData: UpdateDataProps;
};

export type IsInputProps = {
  component: ReactNode;
  value: string;
  componentStyle: string;
  onSave: (newValue: string) => void;
};
