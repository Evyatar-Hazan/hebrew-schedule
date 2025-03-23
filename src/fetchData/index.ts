import type { Data_, TimeItem } from "../types/schedule";
import dateConverter from "./dateConverter";
import fetchTimesResponse from "./fetchTimesResponse";
import getEvent from "./getEvent";
import getTimesResponse from "./getTimesResponse";

const API_URL = "https://www.hebcal.com/converter";
const API_TIMES_URL = "https://www.hebcal.com/shabbat";

const dateSplit = (date: string) => date.split("-").map(Number);

const isShabbat = (date: string): boolean => {
  const dateObj = new Date(date);
  return dateObj.getDay() === 6;
};

export const convertToHebrewDate = async (date: string): Promise<Data_> => {
  const [year, month, day] = dateSplit(date);
  const responseDateConverter = await dateConverter(year, month, day, API_URL);
  const [hebrewDate, holiday, parasha, omerCount] = getEvent(
    responseDateConverter,
  );
  const shabbatStatus = isShabbat(date);
  const timesResponse: { data: { items: TimeItem[] } } =
    await fetchTimesResponse(year, month, day, API_TIMES_URL);
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
};
