import axios from "axios";

import type { TimeItem } from "../types/schedule";

const fetchTimesResponse = async (
  year: number,
  month: number,
  day: number,
  API_TIMES_URL: string,
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

export default fetchTimesResponse;
