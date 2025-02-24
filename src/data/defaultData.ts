import type { DaySchedule } from "../types/schedule";

export const defaultSchedule: DaySchedule[] = [
  {
    date: "10.5.24",
    parasha: "קדושים",
    haftara: "ויהי דבר",
    avot: "פרק ב",
    times: {
      shemaEnd: { hour: "8", minute: "32" },
      tefillah: { hour: "6", minute: "48" },
      candleLighting: { hour: "6", minute: "58" },
      shabbatEnd: { hour: "8", minute: "10" },
      rtTime: { hour: "8", minute: "48" },
    },
  },
  // Add other weeks similarly...
];
