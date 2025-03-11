import type { ContentProps } from "../types/schedule";

export const updateContent = (
  content: ContentProps[],
  id: string,
  newData: unknown,
  index: number,
  isSubTable = false,
  subTableRowIndex?: number,
  subTableKey?: string,
): ContentProps[] =>
  content.map((item, i) => {
    if (i !== index) {
      return item;
    }
    if (
      isSubTable &&
      subTableRowIndex !== undefined &&
      subTableKey !== undefined
    ) {
      if (id === "headerSubTable") {
        item.subTable.columns[subTableRowIndex].accessor =
          item.subTable.columns[subTableRowIndex].header === subTableKey
            ? (newData as string)
            : item.subTable.columns[subTableRowIndex].accessor;
      } else {
        item.subTable.rowData[subTableRowIndex][subTableKey] =
          newData as string;
      }
    } else {
      (item as Record<string, unknown>)[id] = newData;
    }
    return item;
  });
