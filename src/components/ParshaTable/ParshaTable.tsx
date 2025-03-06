import React, { useEffect, useState } from "react";

import type { Data } from "../../fetchData";
import { convertToHebrewDate } from "../../fetchData";
import Table from "../Table";
import { DataDey, Note, times, WeekParsha } from "../Table/WeekParsha";

interface ParshaTableProps {
  date: string;
}

const ParshaTable: React.FC<ParshaTableProps> = ({ date }) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await convertToHebrewDate(date);
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [date]);

  if (loading) {
    return <p>טוען נתונים...</p>;
  }
  if (error !== null && error !== "") {
    return <p>שגיאה: {error}</p>;
  }

  if (!data) {
    return null;
  }

  const {
    parasha: parashaData,
    dafyomi,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    haftarah,
    candleLighting,
    storeLock,
    havdala,
  } = data;

  const timesData = [
    {
      title: "סוף זמן קריאת שמע של שחרית",
      minutes:
        typeof candleLighting === "string"
          ? new Date(candleLighting).getMinutes()
          : 0,
      hours:
        candleLighting !== null && typeof candleLighting === "string"
          ? new Date(candleLighting).getHours()
          : 0,
    },
    {
      title: "נעילת חניות עש״ק",
      minutes:
        storeLock !== null && typeof storeLock === "string"
          ? new Date(storeLock).getMinutes()
          : 0,
      hours:
        storeLock !== null && typeof storeLock === "string"
          ? new Date(storeLock).getHours()
          : 0,
    },
    {
      title: "הדלקת נרות בערש״ק",
      minutes:
        candleLighting !== null && typeof candleLighting === "string"
          ? new Date(candleLighting).getMinutes()
          : 0,
      hours:
        candleLighting !== null && typeof candleLighting === "string"
          ? new Date(candleLighting).getHours()
          : 0,
    },
    {
      title: "זמן מוצאי שבת",
      minutes:
        havdala !== null && typeof havdala === "string"
          ? new Date(havdala).getMinutes()
          : 0,
      hours:
        havdala !== null && typeof havdala === "string"
          ? new Date(havdala).getHours()
          : 0,
    },
    {
      title: "לפי ר״ת",
      minutes:
        havdala !== null && typeof havdala === "string"
          ? new Date(havdala).getMinutes()
          : 0,
      hours:
        havdala !== null && typeof havdala === "string"
          ? new Date(havdala).getHours()
          : 0,
    },
  ];

  const time = [
    ["לוח זמנים", "דקות", "שעות"],
    ...timesData.map((t: { title: string; minutes: number; hours: number }) =>
      times(t.title, t.minutes.toString(), t.hours.toString()),
    ),
  ];

  const tableContent = [
    [
      <WeekParsha
        key="week-parsha"
        title='יום שישי עש"ק פרשת'
        parsha={
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          parashaData && typeof parashaData === "object"
            ? parashaData["name"]
            : ""
        }
      />,
    ],
    [
      <DataDey
        key="data-dey"
        date={
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          typeof hebrewDate === "object" && hebrewDate !== null
            ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              (hebrewDate["date"] ?? "")
            : ""
        }
        dailyPage={
          typeof dafyomi === "string" ? dafyomi : (dafyomi?.["page"] ?? "")
        }
        haftara={typeof haftarah === "string" ? haftarah : ""}
      />,
    ],
    [{ content: <Table content={time} className="inner-table-wrapper" /> }],
    [<Note key="note" />],
  ];

  return <Table content={tableContent} />;
};

export default ParshaTable;
