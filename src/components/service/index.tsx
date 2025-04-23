import { convertToHebrewDate } from "../../fetchData";
import calculatePrayerEndTime from "../../fetchData/calculatePrayerEndTime";
import { getSunTimes } from "../../fetchData/getSunTimes";
import type { ContentProps } from "../../types/schedule";

const getTime = (date: string | unknown) => {
  if (typeof date !== "string") {
    return { minutes: "00", hours: "00" };
  }
  const d = new Date(date);
  return {
    minutes: d.getMinutes().toString().padStart(2, "0"),
    hours: d.getHours().toString().padStart(2, "0"),
  };
};

const dateFormatConverter = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${parseInt(day)}.${parseInt(month)}.${year.slice(2)}`;
};

const getData = async (date: string): Promise<ContentProps> => {
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

    const scheduleData = [
      {
        schedule: "סוף זמן קריאת שמע של שחרית",
        time: getTime(shacharitEnd.ShacharitEnd),
      },
      { schedule: "נעילת חנויות עש״ק", time: getTime(storeLock) },
      { schedule: "הדלקת נרות בערש״ק", time: getTime(candleLighting) },
      { schedule: "זמן מוצאי שבת", time: getTime(havdala) },
      { schedule: "לפי ר״ת", time: getTime(havdala) },
    ];

    return {
      subTitle: `יום שישי עש"ק פרשת`,
      parasha: parasha ?? "",
      dataDate: formattedDate,
      data: [
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
      ],
      subTable: {
        columns: [
          { header: "schedule", accessor: "לוח זמנים" },
          { header: "minutes", accessor: "דקות" },
          { header: "hours", accessor: "שעות" },
        ],
        rowData: scheduleData.map(({ schedule, time }) => ({
          schedule,
          ...time,
        })),
      },
      subFooter: "",
    };
  } catch (err) {
    return {
      subTitle: "",
      parasha: "",
      dataDate: "",
      data: [],
      subTable: {
        columns: [],
        rowData: [],
      },
      subFooter: "",
    };
  }
};

export default getData;
