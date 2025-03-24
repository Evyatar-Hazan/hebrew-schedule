const testData = [
  {
    date: "2025-01-24",
    expected: {
      hebrewDate: "כ״ד בְּטֵבֵת תשפ״ה",
      isShabbat: false,
      holiday: null,
      parasha: "וָאֵרָא",
      candleLighting: "2025-01-24T16:35:00+02:00",
      havdala: "2025-01-25T17:45:00+02:00",
      dafyomi: "סנהדרין דף ל״ח",
      storeLock: "2025-01-24T14:25:00.000Z",
      haftarah: "(יחזקאל כח:כה–כט:כא)",
      omerCount: null,
    },
  },
  {
    date: "2025-01-31",
    expected: {
      hebrewDate: "ב׳ בִּשְׁבָט תשפ״ה",
      isShabbat: false,
      holiday: null,
      parasha: "בֹּא",
      candleLighting: "2025-01-31T16:42:00+02:00",
      havdala: "2025-02-01T17:51:00+02:00",
      dafyomi: "סנהדרין דף מ״ה",
      storeLock: "2025-01-31T14:32:00.000Z",
      haftarah: "(ירמיהו מו:יג–כח)",
      omerCount: null,
    },
  },
  // הוספת נתונים נוספים במידת הצורך
];

export default testData;

test("mock test", () => {
  expect(true).toBe(true);
});
