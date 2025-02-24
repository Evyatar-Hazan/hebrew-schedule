import React, { useState } from "react";

import Table from "../Table";
import DatePickerButton from "./DatePickerButton";
import ParshaTable from "./ParshaTable";

const GlobalParshaTable = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [renderKey, setRenderKey] = useState(0); // גורם לרינדור מחדש

  const handleDateSelect = (date: string) => {
    if (selectedDates.length < 6) {
      setSelectedDates([...selectedDates, date]);
      setRenderKey((prev) => prev + 1); // מכריח רינדור מחדש
    }
  };

  const handleEditDate = (index: number, newDate: string) => {
    const updatedDates = [...selectedDates];
    updatedDates[index] = newDate;
    setSelectedDates(updatedDates);
    setRenderKey((prev) => prev + 1); // מכריח רינדור מחדש
  };

  const title = [
    [<h1 key="title">להצלחת הנדיב חפץ בעילום שמו</h1>],
    [
      <div
        key="title"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {selectedDates.length === 0 ? (
          <DatePickerButton
            key="date-picker-button"
            onDateSelect={handleDateSelect}
          />
        ) : (
          <>
            {selectedDates.map((date) => (
              <div
                key={date}
                style={{ marginRight: "10px", textAlign: "center" }}
              >
                <ParshaTable date={date} />
                <DatePickerButton
                  key={`date-picker-button-${date}`}
                  selectedDates={date}
                  onDateSelect={(newDate) =>
                    handleEditDate(selectedDates.indexOf(date), newDate)
                  }
                />
              </div>
            ))}
            {selectedDates.length < 6 && (
              <DatePickerButton
                key="new-date-picker-button"
                onDateSelect={handleDateSelect}
              />
            )}
          </>
        )}
      </div>,
    ],
  ];

  return <Table key={renderKey} content={title} />; // key ייחודי כדי לגרום לרינדור מחדש
};

export default GlobalParshaTable;
