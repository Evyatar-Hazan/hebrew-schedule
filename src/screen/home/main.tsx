import React, { useEffect, useState } from "react";

import DatePickerButton from "../../components/datePicker/DatePickerButton";
import getData from "../../components/service";
import TableComponent from "../../components/Table/TableComponent";
import type {
  ContentProps,
  TableProps,
  UpdateDataProps,
} from "../../types/schedule";
import { updateContent } from "../../utils/updateContent";
import { datePickerButtonStyles } from "./styles";

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
        updateContent(
          prevContent,
          id,
          newData,
          index !== undefined ? index : -1,
          isSubTable,
          subTableRowIndex,
          subTableKey,
        ),
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
    try {
      const result = await getData(date);
      result.selectDate = date;
      setContent((prevContent) =>
        index !== undefined
          ? prevContent.map((item, i) => (i === index ? result : item))
          : [...prevContent, result],
      );
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    setData([{ header: "להצלחת הנדיב החפץ בעילום שמו", content, footer: "" }]);
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
      <div
        style={
          content.length > 0
            ? (datePickerButtonStyles.withContent as React.CSSProperties)
            : (datePickerButtonStyles.default as React.CSSProperties)
        }
      >
        <DatePickerButton
          key="new-date-picker-button"
          onDateSelect={loadData}
        />
      </div>
    </>
  );
};

export default HomeScreen;
