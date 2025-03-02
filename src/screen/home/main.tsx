import React, { useEffect, useState } from "react";

import TableComponent from "../../components/newTable/TableComponent";
import DatePickerButton from "../../components/ParshaTable/DatePickerButton";
import getData from "../../components/service";
import type {
  ContentProps,
  TableProps,
  UpdateDataProps,
} from "../../types/schedule";

const HomeScreen = () => {
  const [data, setData] = useState<TableProps["data"]>([]);
  const [content, setContent] = useState<ContentProps[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

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
      setContent((prevContent) => {
        const updatedContent = [...prevContent];
        if (
          isSubTable &&
          index !== undefined &&
          subTableRowIndex !== undefined &&
          subTableKey
        ) {
          if (id === "headerSubTable") {
            updatedContent[index].subTable.columns[subTableRowIndex].accessor =
              updatedContent[index].subTable.columns[subTableRowIndex]
                .header === subTableKey
                ? newData
                : updatedContent[index].subTable.columns[subTableRowIndex]
                    .accessor;
          } else {

            updatedContent[index].subTable.rowData[subTableRowIndex][
              subTableKey
            ] = newData;
          }
        } else if (index !== undefined) {
          if (id in updatedContent[index]) {
            (updatedContent[index] as Record<string, unknown>)[id] = newData;
          }
        }
        return updatedContent;
      });
    } else {
      setData((prevData) => {
        const updatedData = [...prevData];

        if (index !== undefined && id in updatedData[index]) {
          const key = id as keyof (typeof updatedData)[number];

          if (typeof updatedData[index][key] === "string") {
            (updatedData[index][key] as string) = newData;
          }
        }

        return updatedData;
      });
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    const loadContent = async (date: string) => {
      const result = await getData(date);
      result.selectDate = date;
      const result1 = await getData("2021-10-11");
      result1.selectDate = date;
      const result2 = await getData("2021-10-12");
      result2.selectDate = date;
      setContent([...content, result, result1, result2]);
    };
    loadContent("2021-09-10");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableComponent data={data} updateData={updateData} />
      <button
        onClick={() =>
          updateData(
            "header",
            Math.random().toString(),
            false,
            false,
            0,
            undefined,
            undefined,
          )
        }
      >
        1111
      </button>
      <button
        onClick={() =>
          updateData(
            "subTitle",
            Math.random().toString(),
            false,
            true,
            0,
            undefined,
            undefined,
          )
        }
      >
        2222
      </button>
      <button
        onClick={() =>
          updateData(
            "value",
            Math.random().toString(),
            true,
            true,
            2,
            1,
            "schedule",
          )
        }
      >
        3333
      </button>
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
