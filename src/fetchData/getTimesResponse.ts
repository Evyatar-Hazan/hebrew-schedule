import type { TimeItem } from "../types/schedule";
import convertToHebrewDescription from "./convertToHebrewDescription";

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

export default getTimesResponse;
