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

export default getEvent;
