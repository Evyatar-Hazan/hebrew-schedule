import React, { useEffect, useState } from "react";


interface WeekParshaProps {
  title: string;
  parsha: string;
}
interface NoteProps {
  text?: string;
}
interface DataDeyProps {
  date: string;
  dailyPage: string;
  haftara: string;
}
  
export const WeekParsha: React.FC<WeekParshaProps> = ({ title, parsha }) => {
  return (
    <div>
      <p>{title}</p>
      <h1>{parsha}</h1>
    </div>
  );
};
 
export const DataDey: React.FC<DataDeyProps> = ({ date, dailyPage, haftara }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      width: `${windowWidth / 6}px`,
      height: '250px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word',
      }}>
      <div>
        <p>{date}</p>
        <p>{dailyPage}</p>
      </div>
      <div>
        <p>{"מפטירים בנביא"}</p>
        <p>{haftara}</p>
      </div>
    </div>
  );
};
 
export const times= (text: string, minutes: string, hours: string ) => {
  return [
    <p>{text}</p>,
    <p>{minutes}</p>,
    <p>{hours}</p>,]
};
 
export const Note: React.FC<NoteProps> = ({ text=""}) => {
  return (
    <div>
        <p>{text}</p>
    </div>
  );
};
