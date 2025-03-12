type HaftarahInfo = {
  haftarah?: string;
  haftarah_sephardic?: string;
  haftarah_yemenite?: string;
  haftarah_chabad?: string;
};

const bookNamesMap: Record<string, string> = {
  Isaiah: "ישעיהו",
  Jeremiah: "ירמיהו",
  Ezekiel: "יחזקאל",
  Hosea: "הושע",
  Joel: "יואל",
  Amos: "עמוס",
  Obadiah: "עובדיה",
  Jonah: "יונה",
  Micah: "מיכה",
  Nahum: "נחום",
  Habakkuk: "חבקוק",
  Zephaniah: "צפניה",
  Haggai: "חגי",
  Zechariah: "זכריה",
  Malachi: "מלאכי",
  Psalms: "תהילים",
  Proverbs: "משלי",
  Job: "איוב",
  Kings: "מלכים",
  Samuel: "שמואל",
};

const hebrewNumbers: string[] = [
  "",
  "א",
  "ב",
  "ג",
  "ד",
  "ה",
  "ו",
  "ז",
  "ח",
  "ט",
  "י",
  "יא",
  "יב",
  "יג",
  "יד",
  "טו",
  "טז",
  "יז",
  "יח",
  "יט",
  "כ",
  "כא",
  "כב",
  "כג",
  "כד",
  "כה",
  "כו",
  "כז",
  "כח",
  "כט",
  "ל",
  "לא",
  "לב",
  "לג",
  "לד",
  "לה",
  "לו",
  "לז",
  "לח",
  "לט",
  "מ",
  "מא",
  "מב",
  "מג",
  "מד",
  "מה",
  "מו",
  "מז",
  "מח",
  "מט",
  "נ",
];

function convertNumbersToHebrew(number: string): string {
  const num = parseInt(number, 10);
  return hebrewNumbers[num] || number;
}

function convertToHebrewText(haftarah: string): string {
  return haftarah.replace(
    /(\w+)\s(\d+):(\d+)(?:-?(\d+):?)?(\d+)?/g,
    (match, book, p1, v1, p2, v2) => {
      const bookHebrew =
        bookNamesMap[book as keyof typeof bookNamesMap] || (book as string);
      const chapter1 = convertNumbersToHebrew(p1);
      const verse1 = convertNumbersToHebrew(v1);

      if (Boolean(p2) && Boolean(v2)) {
        // טווח בין שני פרקים שונים
        const chapter2 = convertNumbersToHebrew(p2);
        const verse2 = convertNumbersToHebrew(v2);
        return `${bookHebrew} ${chapter1}:${verse1}–${chapter2}:${verse2}`;
      } else if (typeof p2 === "string" && p2 !== "") {
        // טווח פסוקים בתוך אותו הפרק
        const verse2 = convertNumbersToHebrew(p2);
        return `${bookHebrew} ${chapter1}:${verse1}–${verse2}`;
      }

      return `(${bookHebrew} ${chapter1}:${verse1})`;
    },
  );
}

function convertToHebrewDescription(data: HaftarahInfo): string {
  const sections: string[] = [];

  if (data.haftarah ?? "") {
    // 📖 הפטרה (אשכנז):
    sections.push(`(${convertToHebrewText(data.haftarah ?? "")})`);
  }
  // // 📖 הפטרה (ספרדי):
  // if (data.haftarah_sephardic ?? "") {
  //   sections.push(`${convertToHebrewText(data.haftarah_sephardic ?? "")}`);
  // }
  // // 📖 הפטרה (תימני):
  // if (data.haftarah_yemenite ?? "") {
  //   sections.push(`${convertToHebrewText(data.haftarah_yemenite ?? "")}`);
  // }
  // // 📖 הפטרה (חב"ד):
  // if (data.haftarah_chabad ?? "") {
  //   sections.push(`${convertToHebrewText(data.haftarah_chabad ?? "")}`);
  // }

  return sections.join("\n");
}

export default convertToHebrewDescription;
