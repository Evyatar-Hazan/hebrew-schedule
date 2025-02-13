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