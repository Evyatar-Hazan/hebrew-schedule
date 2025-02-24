import axios from "axios";

import convertToHebrewDescription from "./convertToHebrewDescription";

const API_URL = "https://www.hebcal.com/converter";
const API_TIMES_URL = "https://www.hebcal.com/shabbat";

interface TimeItem {
  hebrew: string;
  category: string;
  date: string;
  leyning: { [key: string]: string | { [key: string]: string } };
}
type StringNull = string | null;

const dateSplit = (date: string) => date.split("-").map(Number);

const dateConverter = async (
  year: number,
  month: number,
  day: number,
): Promise<{ data: { hebrew: string; events: string[] } }> => {
  try {
    const response: { data: { hebrew: string; events: string[] } } =
      await axios.get(API_URL, {
        params: {
          gy: year,
          gm: month,
          gd: day,
          g2h: 1,
          cfg: "json",
          lg: "he",
          F: "on",
        },
      });

    if (!response.data.hebrew) {
      throw new Error("❌ Failed to retrieve Hebrew date");
    }
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("❌ Error converting date:", error);
    throw error;
  }
};

const fetchTimesResponse = async (
  year: number,
  month: number,
  day: number,
): Promise<{ data: { items: TimeItem[] } }> => {
  try {
    return await axios.get(API_TIMES_URL, {
      params: {
        cfg: "json",
        geo: "pos",
        latitude: "32.7951",
        longitude: "35.0867",
        tzid: "Asia/Jerusalem",
        lg: "he",
        F: "on",
        elev: 50,
        ue: "on",
        b: 30,
        gy: year,
        gm: month,
        gd: day,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("❌ Error timesResponse:", error);
    throw error;
  }
};

const getEvent = (responseDateConverter: {
  data: {
    hebrew: string;
    events: string[];
  };
}) => {
  const hebrewDate = responseDateConverter.data.hebrew;

  if (Array.isArray(responseDateConverter.data.events)) {
    const { holidays, parashot, omersCount } =
      responseDateConverter.data.events.reduce(
        (
          acc: { holidays: string[]; parashot: string[]; omersCount: string[] },
          event: string,
        ) => {
          if (event.startsWith("פָּרָשַׁת")) {
            acc.parashot.push(event.replace("פָּרָשַׁת ", ""));
          } else if (event.endsWith("בָּעוֹמֶר")) {
            acc.omersCount.push(event);
          } else {
            acc.holidays.push(event);
          }
          return acc;
        },
        { holidays: [], parashot: [], omersCount: [] },
      );

    const holiday = holidays.length > 0 ? holidays.join(", ") : null;
    const parasha = parashot.length > 0 ? parashot[0] : null;
    const omerCount = omersCount.length > 0 ? omersCount.join(", ") : null;

    return [hebrewDate, holiday, parasha, omerCount];
  }
  return [null, null, null, null];
};

const isShabbat = (date: string): boolean => {
  const dateObj = new Date(date);
  return dateObj.getDay() === 6; // 6 = שבת
};

const getTimesResponse = (
  date: string,
  timesResponse: { data: { items: TimeItem[] } },
) => {
  const candleItem = timesResponse.data.items.find(
    (item: TimeItem) => item.category === "candles",
  );
  const havdalaItem = timesResponse.data.items.find(
    (item: TimeItem) => item.category === "havdalah",
  );
  const dafyomiItem = timesResponse.data.items.find(
    (item: TimeItem) => item.category === "dafyomi" && item.date === date,
  );
  const haftarahItem = timesResponse.data.items.find(
    (item: TimeItem) => item.category === "parashat" && item.date === date,
  );

  const candleLighting = candleItem ? candleItem.date : null;
  const havdala = havdalaItem ? havdalaItem.date : null;
  const dafyomi = dafyomiItem ? dafyomiItem.hebrew : null;
  const haftarah = haftarahItem ? haftarahItem.leyning.haftarah : null;
  const haftarah_sephardic = haftarahItem
    ? haftarahItem.leyning.haftarah_sephardic
    : null;
  const haftarahot = convertToHebrewDescription({
    haftarah: haftarah?.toString(),
    haftarah_sephardic: haftarah_sephardic?.toString(),
  });
  let storeLock = null;
  if (candleLighting !== null && candleLighting !== "") {
    const candleLightingDate = new Date(candleLighting);
    candleLightingDate.setMinutes(candleLightingDate.getMinutes() - 10);
    storeLock = candleLightingDate.toISOString() || null;
  }
  return [candleLighting, havdala, dafyomi, haftarahot, storeLock];
};

export interface Data {
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

/**
 * ממיר תאריך לועזי לתאריך עברי ומחזיר מידע על שבת, חגים, פרשות השבוע, ואירועים מיוחדים אחרים
 * @param {string} date - תאריך בפורמט YYYY-MM-DD
 * @returns {Promise<{ hebrewDate: string, isShabbat: boolean, holiday: StringNull, parasha: StringNull, candleLighting: StringNull, havdala: StringNull, dafyomi: StringNull, storeLock: StringNull, haftarah: StringNull, omerCount: StringNull }>}
 */
export async function convertToHebrewDate(date: string): Promise<Data> {
  const [year, month, day] = dateSplit(date);
  const responseDateConverter = await dateConverter(year, month, day);
  const [hebrewDate, holiday, parasha, omerCount] = getEvent(
    responseDateConverter,
  );
  const shabbatStatus = isShabbat(date);
  const timesResponse: { data: { items: TimeItem[] } } =
    await fetchTimesResponse(year, month, day);
  const [candleLighting, havdala, dafyomi, haftarahot, storeLock] =
    getTimesResponse(date, timesResponse);
  return {
    hebrewDate,
    isShabbat: shabbatStatus,
    holiday,
    parasha,
    candleLighting,
    havdala,
    dafyomi,
    storeLock,
    haftarah: haftarahot,
    omerCount,
  };
}
