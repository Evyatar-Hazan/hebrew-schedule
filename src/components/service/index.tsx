import { convertToHebrewDate } from "../../fetchData";
import type { ContentProps } from "../../types/schedule";

const getTime = (date: string | unknown) => {
  if (typeof date !== "string") {
    return {
      minutes: "00",
      hours: "00",
    };
  }
  const d = new Date(date);
  return {
    minutes: d.getMinutes().toString(),
    hours: d.getHours().toString(),
  };
};

const dateFormatConverter = (date: string) => {
  const [year, month, day] = date.split("-");
  const formattedDate = `${year.slice(2)}.${parseInt(month)}.${parseInt(day)}`;
  return formattedDate;
};

const getData = async (date: string): Promise<ContentProps> => {
  let data = {} as ContentProps;
  try {
    const result = await convertToHebrewDate(date);
    const {
      parasha,
      hebrewDate,
      storeLock,
      candleLighting,
      havdala,
      dafyomi,
      haftarah,
    } = result;
    data = {
      subTitle: `יום שישי עש"ק פרשת`,
      parasha: parasha ?? "",
      dataDate: `${hebrewDate} ${dateFormatConverter(date)}`,
      data: [
        {
          textData: `${hebrewDate} ${dateFormatConverter(date)}`,
          fontSize: "1.0",
          fontWeight: false,
          marginTop: "0",
          marginButton: "0",
        },
        {
          textData: `דף היומי ${dafyomi}`,
          fontSize: "1.0",
          fontWeight: false,
          marginTop: "0",
          marginButton: "0",
        },
        {
          textData: `מפטירים בנביא`,
          fontSize: "1.2",
          fontWeight: false,
          marginTop: "50",
          marginButton: "0",
        },
        {
          textData: `${haftarah}`,
          fontSize: "1.2",
          fontWeight: false,
          marginTop: "0",
          marginButton: "0",
        },
      ],
      subTable: {
        columns: [
          { header: "schedule", accessor: "לוח זמנים" },
          { header: "minutes", accessor: "דקות" },
          { header: "hours", accessor: "שעות" },
        ],
        rowData: [
          {
            schedule: "סוף זמן קריאת  \n שמע של שחרית",
            ...getTime(candleLighting),
          },
          { schedule: "נעילת חנויות עש״ק", ...getTime(storeLock) },
          {
            schedule: "הדלקת נרות בערש״ק",
            ...getTime(candleLighting),
          },
          { schedule: "זמן מוצאי שבת", ...getTime(havdala) },
          { schedule: "לפי ר״ת", ...getTime(havdala) },
        ],
      },
      subFooter: "",
    };
  } catch (err) {
    /* empty */
  }
  return data;
};

export default getData;
