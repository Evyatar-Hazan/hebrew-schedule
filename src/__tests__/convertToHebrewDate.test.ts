import type { Value } from "@prisma/client/runtime/library";

import { convertToHebrewDate } from "../fetchData";
import type { Data_ } from "../types/schedule";
import testData from "./mockData";

const checkProperty = (
  result: Data_,
  property: keyof Data_,
  expectedValue: Value,
) => {
  expect(result).toHaveProperty(property);
  expect(result[property]).toBe(expectedValue);
};

testData.forEach(({ date, expected }) => {
  test(`convertToHebrewDate returns correct data for ${date}`, async () => {
    const result = await convertToHebrewDate(date);
    // console.log("🚀 ~ test ~ result:", result)

    Object.entries(expected).forEach(([property, expectedValue]) => {
      checkProperty(result, property as keyof Data_, expectedValue);
    });
  });
});
