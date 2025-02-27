import React, { useEffect, useState } from "react";

import TableComponent from "../../components/newTable/TableComponent";
import DatePickerButton from "../../components/ParshaTable/DatePickerButton";
import getData from "../../components/service";
import type { ContentProps, TableProps } from "../../types/schedule";

const HomeScreen = () => {
  const [data, setData] = useState<TableProps["data"]>([]);
  const [content, setContent] = useState<ContentProps[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const newData: TableProps = {
        data: [
          {
            header: "להצלחת הנדיב החפץ בעילום שמו",
            content: content,
            footer: "",
          },
        ],
      };
      setData(newData.data);
    };
    loadData();
  }, [content]);

  const loadContent = async (date: string) => {
    const result = await getData(date);
    result.selectDate = date;
    setContent([...content, result]);
  };

  return (
    <>
      <TableComponent data={data} />
      {/* <DatePickerButton
        key="new-date-picker-button"
        onDateSelect={(newDates) => {
          setSelectedDates(newDates);
          loadContent(newDates[newDates.length - 1]);
        }}
        selectedDates={selectedDates}
      /> */}
    </>
  );
};

export default HomeScreen;
