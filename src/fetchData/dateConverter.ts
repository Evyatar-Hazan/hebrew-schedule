import axios from "axios";

const dateConverter = async (
  year: number,
  month: number,
  day: number,
  API_URL: string,
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

export default dateConverter;
