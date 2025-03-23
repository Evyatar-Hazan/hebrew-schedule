import type { ReactNode } from "react";

export type StringNull = string | null;
export interface Data_ {
  hebrewDate: StringNull;
  isShabbat: boolean;
  holiday: StringNull;
  parasha: StringNull;
  candleLighting: string | { [key: string]: string } | null;
  havdala: string | { [key: string]: string } | null;
  dafyomi: string | { [key: string]: string } | null;
  storeLock: string | { [key: string]: string } | null;
  haftarah: string | { [key: string]: string } | null;
  omerCount: StringNull;
}

export interface TimeItem {
  hebrew: string;
  category: string;
  date: string;
  leyning: { [key: string]: string | { [key: string]: string } };
}

export interface TimeData {
  hour: string;
  minute: string;
}

export interface ScheduleItem {
  title: string;
  time: TimeData;
}

export interface Data {
  textData: string;
  fontSize: string;
  fontWeight: boolean;
  marginTop: string;
  marginBottom: string;
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
  dataDate: string;
  data: Data[];
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
  newData: string | Data[],
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
