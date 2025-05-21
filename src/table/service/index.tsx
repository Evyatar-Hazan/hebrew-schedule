import { convertToHebrewDate } from "../../fetchData";
import calculatePrayerEndTime from "../../fetchData/calculatePrayerEndTime";
import { getSunTimes } from "../../fetchData/getSunTimes";
import type { Column, SubColumn } from "../types/types";

const getTime = (date: string | unknown): string[] => {
  if (typeof date !== "string") {
    return ["00", "00"];
  }
  const d = new Date(date);
  let hours = d.getHours() % 12;
  hours = hours === 0 ? 12 : hours;
  return [d.getMinutes().toString().padStart(2, "0"), hours.toString()];
};

const dateFormatConverter = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${parseInt(day)}.${parseInt(month)}.${year.slice(2)}`;
};

const getData = async (date: string): Promise<Column> => {
  try {
    const result = await convertToHebrewDate(date);
    const {
      parasha = "",
      hebrewDate,
      storeLock,
      candleLighting,
      havdala,
      dafyomi,
      haftarah,
    } = result;

    const formattedDate = `${hebrewDate} ${dateFormatConverter(date)}`;
    const latitude = 32.7951;
    const longitude = 35.0867;

    const shacharitEnd = await getSunTimes(date, latitude, longitude).then(
      ({ sunrise, sunset }) => calculatePrayerEndTime(sunrise, sunset),
    );

    const scheduleData: SubColumn[] = [
      {
        name: "סוף זמן קריאת שמע של שחרית",
        rows: getTime(shacharitEnd.ShacharitEnd),
      },
      { name: "נעילת חנויות עש״ק", rows: getTime(storeLock) },
      { name: "הדלקת נרות בערש״ק", rows: getTime(candleLighting) },
      { name: "זמן מוצאי שבת", rows: getTime(havdala) },
      { name: "לפי ר״ת", rows: getTime(havdala) },
    ];

    const createSubcolumns = () => [
      {
        name: "לוח זמנים",
        rows: scheduleData.map(({ name }) => name),
      },
      {
        name: "דקות",
        rows: scheduleData.map(({ rows }) => rows[0]),
      },
      {
        name: "שעות",
        rows: scheduleData.map(({ rows }) => rows[1]),
      },
    ];

    const data = [
      {
        textData: formattedDate,
        fontSize: "1.0",
        fontWeight: false,
        marginTop: "0",
        marginBottom: "0",
      },
      {
        textData: `דף היומי ${dafyomi}`,
        fontSize: "1.0",
        fontWeight: false,
        marginTop: "0",
        marginBottom: "0",
      },
      {
        textData: "מפטירים בנביא",
        fontSize: "1.2",
        fontWeight: false,
        marginTop: "50",
        marginBottom: "0",
      },
      {
        textData: `${haftarah}`,
        fontSize: "1.2",
        fontWeight: false,
        marginTop: "0",
        marginBottom: "0",
      },
    ];

    return {
      column: `יום שישי עש"ק פרשת \n${parasha}`,
      rows: [
        data,
        {
          subcolumns: createSubcolumns(),
        },
        "",
        date,
      ],
    };
  } catch (err) {
    return ["שגיאה בטעינת הנתונים"] as unknown as Column;
  }
};

export default getData;
