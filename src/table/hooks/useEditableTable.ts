import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import getData from "../service/";
import type {
  ChangeType,
  handleEditDataType,
  handleEditType,
  handleHeaderEditType,
  handleSubHeaderEditType,
  JsonData,
  setCellRefType,
  SubColumn,
  subRowHeightsType,
  UseEditableTableReturnType,
} from "../types/types";

export const useEditableTable = (): UseEditableTableReturnType => {
  const [editableData, setEditableData] = useState<JsonData | null>(null);
  const subRowRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [subRowHeights, setSubRowHeights] = useState<subRowHeightsType>({});

  const fetchDataByDate = useCallback(async (dates: string[]) => {
    const fetchedContent = await Promise.all(dates.map(getData));
    const formattedData = {
      header: "להצלחת הנדיב החפץ בעילום שמו",
      content: fetchedContent,
      footer: "",
    };
    if (fetchedContent.length > 0) {
      setEditableData(formattedData as JsonData);
    }
  }, []);

  //for debugging purposes
  // useEffect(() => {
  //   fetchDataByDate(["2025-05-23", "2025-06-23"]);
  // }, [fetchDataByDate]);

  const updateContent = useCallback((updatedData: JsonData) => {
    setEditableData(updatedData);
  }, []);

  const handleEdit: handleEditType = useCallback(
    (value, colIndex, rowIndex, subColIndex, subRowIndex) => {
      if (!editableData) {
        return;
      }
      const updatedData = { ...editableData };
      const column = updatedData.content[colIndex];
      const row = column.rows[rowIndex];
      if (typeof row === "string") {
        column.rows[rowIndex] = value;
      } else if (subColIndex !== undefined && subRowIndex !== undefined) {
        if ("subcolumns" in row && Array.isArray(row.subcolumns)) {
          const subColumn = row.subcolumns[subColIndex as number];
          if (Array.isArray(subColumn.rows)) {
            subColumn.rows[subRowIndex as number] = value;
          }
        }
      }
      updateContent(updatedData);
    },
    [editableData, updateContent],
  );

  const handleEditData: handleEditDataType = useCallback(
    (value, colIndex, rowIndex) => {
      if (!editableData) {
        return;
      }
      const updatedData = { ...editableData };
      updatedData.content[colIndex].rows[rowIndex] = value;
      updateContent(updatedData);
    },
    [editableData, updateContent],
  );

  const handleSubHeaderEdit: handleSubHeaderEditType = useCallback(
    (value, colIndex, subColIndex) => {
      if (!editableData) {
        return;
      }
      const updatedData = { ...editableData };
      const subRow = updatedData.content[colIndex].rows.find(
        (row) => typeof row !== "string" && "subcolumns" in row,
      ) as { subcolumns: SubColumn[] } | undefined;
      if (subRow) {
        subRow.subcolumns[subColIndex].name = value;
      }
      updateContent(updatedData);
    },
    [editableData, updateContent],
  );

  const handleHeaderEdit: handleHeaderEditType = useCallback(
    (value, colIndex) => {
      if (!editableData) {
        return;
      }
      const updatedData = { ...editableData };
      updatedData.content[colIndex].column = value;
      updateContent(updatedData);
    },
    [editableData, updateContent],
  );

  const handleTitleChange: ChangeType = useCallback(
    (value) => {
      if (!editableData) {
        return;
      }
      const updatedData = { ...editableData };
      updatedData.header = value;
      updateContent(updatedData);
    },
    [editableData, updateContent],
  );

  const handleFooterChange: ChangeType = useCallback(
    (value) => {
      if (!editableData) {
        return;
      }
      const updatedData = { ...editableData };
      updatedData.footer = value;
      updateContent(updatedData);
    },
    [editableData, updateContent],
  );

  const maxRowLength = useMemo(
    () =>
      editableData
        ? Math.max(...editableData.content.map((c) => c.rows.length))
        : 0,
    [editableData],
  );

  useEffect(() => {
    const groupedHeights: Record<string, number[]> = {};
    subRowRefs.current.forEach((div, key) => {
      const [, rowIndex, subRowIndex] = key.split("-").map(Number);
      const groupKey = `${rowIndex}-${subRowIndex}`;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
      if (!groupedHeights[groupKey]) {
        groupedHeights[groupKey] = [];
      }
      groupedHeights[groupKey].push(div.offsetHeight);
    });
    const maxHeights: Record<string, number> = {};
    Object.entries(groupedHeights).forEach(([groupKey, heights]) => {
      maxHeights[groupKey] = Math.max(...heights);
    });

    setSubRowHeights(maxHeights);
  }, [editableData]);

  const setCellRef: setCellRefType = useCallback((key, el) => {
    if (el) {
      subRowRefs.current.set(key, el);
    }
  }, []);

  return {
    data: editableData ? editableData.content : [],
    handleEdit,
    handleEditData,
    handleHeaderEdit,
    handleTitleChange,
    handleFooterChange,
    setCellRef,
    handleSubHeaderEdit,
    title: editableData ? editableData.header : "",
    footer: editableData ? editableData.footer : "",
    subRowHeights,
    maxRowLength,
    fetchDataByDate,
  };
};
