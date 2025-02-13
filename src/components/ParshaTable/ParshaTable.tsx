import React, { useEffect, useState } from 'react';
import { DataDey, Note, times, WeekParsha } from '../Table/WeekParsha';
import Table from '../Table';
import { convertToHebrewDate } from '../../fetchData';

interface ParshaTableProps {
  date: string;
}

const ParshaTable: React.FC<ParshaTableProps> = ({ date }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
      const loadData = async () => {
    try {
        const result = await convertToHebrewDate(date);
        console.log('result', result);
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [date]);

  if (loading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה: {error}</p>;

  if (!data) return null;

  
  const { parasha, hebrewDate, dafyomi, haftarah, candleLighting, storeLock, havdala } = data;
  
  const timesData = [
          { title: "סוף זמן קריאת שמע של שחרית", minutes: new Date(candleLighting).getMinutes(), hours: new Date(candleLighting).getHours() },
          { title: 'נעילת חניות עש״ק', minutes: new Date(storeLock).getMinutes(), hours: new Date(storeLock).getHours() },
          { title: "זמן מוצאי שבת", minutes: new Date(havdala).getMinutes(), hours: new Date(havdala).getHours() },
          { title: "לפי רבינו ת״ם", minutes: new Date(havdala).getMinutes(), hours: new Date(havdala).getHours() },
        ];
  const time = [
    ["לוח זמנים", "דקות", "שעות"],
    ...timesData.map((t: any) => times(t.title, t.minutes, t.hours)),
  ];

  const tableContent = [
    [<WeekParsha title='יום שישי עש"ק פרשת' parsha={parasha} />,],
    [<DataDey date={hebrewDate} dailyPage={dafyomi} haftara={haftarah} />, ],
    [{ content: <Table content={time} /> }],
    [<Note />],
  ];

  

  return <Table content={tableContent} />;
};

export default ParshaTable;

