import React, { useEffect, useState } from "react";

import DatePickerButton from "../../components/datePicker/DatePickerButton";
import getData from "../../components/service";
import TableComponent from "../../components/Table/TableComponent";
import type {
  ContentProps,
  TableProps,
  UpdateDataProps,
} from "../../types/schedule";

const HomeScreen = () => {
  const [data, setData] = useState<TableProps["data"]>([]);
  const [content, setContent] = useState<ContentProps[]>([]);

  const updateData: UpdateDataProps = (
    id,
    newData,
    isSubTable = false,
    isContent = false,
    index,
    subTableRowIndex,
    subTableKey,
  ) => {
    if (isContent) {
      setContent((prevContent) =>
        prevContent.map((item, i) => {
          if (i !== index) {
            return item;
          }
          if (
            isSubTable &&
            subTableRowIndex !== undefined &&
            subTableKey !== undefined &&
            subTableKey !== ""
          ) {
            if (id === "headerSubTable") {
              item.subTable.columns[subTableRowIndex].accessor =
                item.subTable.columns[subTableRowIndex].header === subTableKey
                  ? newData
                  : item.subTable.columns[subTableRowIndex].accessor;
            } else {
              item.subTable.rowData[subTableRowIndex][subTableKey] = newData;
            }
          } else {
            (item as Record<string, unknown>)[id] = newData;
          }
          return item;
        }),
      );
    } else {
      setData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [id]: newData } : item,
        ),
      );
    }
  };

  const loadData = async (date: string, index?: number) => {
    const result = await getData(date);
    result.selectDate = date;
    setContent((prevContent) =>
      index !== undefined
        ? prevContent.map((item, i) => (i === index ? result : item))
        : [...prevContent, result],
    );
  };

  useEffect(() => {
    const initializeData = () => {
      setData([
        {
          header: "להצלחת הנדיב החפץ בעילום שמו",
          content: content,
          footer: "",
        },
      ]);
    };
    initializeData();
  }, [content]);

  return (
    <>
      {content.length > 0 && (
        <TableComponent
          data={data}
          updateData={updateData}
          onLoadData={loadData}
        />
      )}
      <DatePickerButton
        key="new-date-picker-button"
        onDateSelect={(newDates) => loadData(newDates)}
      />
    </>
  );
};

export default HomeScreen;
