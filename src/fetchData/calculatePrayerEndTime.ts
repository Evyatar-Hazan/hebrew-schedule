const calculatePrayerEndTime = (sunriseStr: string, sunsetStr: string) => {
  const toDate = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const sunrise = toDate(sunriseStr);
  const sunset = toDate(sunsetStr);

  const duration = sunset.getTime() - sunrise.getTime();

  const timePerUnit = duration / 12;

  const shacharitEnd = new Date(sunrise.getTime() + timePerUnit * 4);

  const minchaEnd = sunset;

  const midnight = new Date(sunrise.getTime() + duration / 2);

  return {
    ShacharitEnd: shacharitEnd.toString(),
    MinchaEnd: minchaEnd.toString(),
    ArvitEnd: midnight.toString(),
  };
};

export default calculatePrayerEndTime;
