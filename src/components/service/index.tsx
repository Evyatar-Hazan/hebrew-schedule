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
      subTitle: `יום שישי עש"ק פרשת ${parasha}`,
      data: `${hebrewDate} \n${dafyomi} \n מפטירים בנביא ${haftarah}`,
      subTable: {
        columns: [
          { header: "schedule", accessor: "לוח זמנים" },
          { header: "minutes", accessor: "דקות" },
          { header: "hours", accessor: "שעות" },
        ],
        rowData: [
          {
            schedule: "סוף זמן קריאת שמע של שחרית",
            ...getTime(candleLighting),
          },
          { schedule: "נעילת חניות עש״ק", ...getTime(storeLock) },
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
