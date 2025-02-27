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

export type TableProps = {
  data: {
    header: string;
    content: ContentProps[];
    footer: string;
  }[];
};
