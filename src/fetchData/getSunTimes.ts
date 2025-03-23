import axios from "axios";
import type { Moment } from "moment-timezone";
import moment from "moment-timezone";

const SUN_API_URL = "https://api.sunrise-sunset.org/json";

interface SunTimes {
  sunrise: string;
  sunset: string;
}

export async function getSunTimes(
  date: string,
  latitude: number,
  longitude: number,
): Promise<SunTimes> {
  const response = await axios.get<{
    results?: { sunrise: string; sunset: string };
  }>(SUN_API_URL, {
    params: {
      lat: latitude,
      lng: longitude,
      date: moment(date).format("YYYY-MM-DD"),
      formatted: 0,
    },
  });

  if (!response.data.results) {
    throw new Error("❌ Failed to retrieve sun times");
  }

  const sunriseUtc: string = response.data.results.sunrise;
  const sunsetUtc: string = response.data.results.sunset;

  // Convert from UTC to "Asia/Jerusalem" timezone
  const sunriseJerusalem: string = (moment.utc(sunriseUtc) as Moment)
    .tz("Asia/Jerusalem")
    .format("HH:mm:ss");

  const sunsetJerusalem: string = (moment.utc(sunsetUtc) as Moment)
    .tz("Asia/Jerusalem")
    .format("HH:mm:ss");

  return {
    sunrise: sunriseJerusalem,
    sunset: sunsetJerusalem,
  };
}
