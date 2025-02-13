import React, { useState } from "react";
import Table from "../Table";
import ParshaTable from "./ParshaTable";
import DatePickerButton from "./DatePickerButton";

const GlobalParshaTable = () => {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [renderKey, setRenderKey] = useState(0); // גורם לרינדור מחדש

    const handleDateSelect = (date: string) => {
        if (selectedDates.length < 6) {
            setSelectedDates([...selectedDates, date]);
            setRenderKey(prev => prev + 1); // מכריח רינדור מחדש
        }
    };

    const handleEditDate = (index: number, newDate: string) => {
        const updatedDates = [...selectedDates];
        updatedDates[index] = newDate;
        setSelectedDates(updatedDates);
        setRenderKey(prev => prev + 1); // מכריח רינדור מחדש
    };

    const title = [
        [<h1>להצלחת הנדיב חפץ בעילום שמו</h1>],
        [
            <div style={{ display: "flex", flexDirection: "row" }}>
                {selectedDates.length === 0 ? (
                    <DatePickerButton onDateSelect={handleDateSelect} />
                ) : (
                    <>
                        {selectedDates.map((date, index) => (
                            <div key={index} style={{ marginRight: "10px", textAlign: "center" }}>
                                <ParshaTable date={date} />
                                {/* כפתור עריכה */}
                                <DatePickerButton 
                                selectedDates={date}
                                    onDateSelect={(newDate) => handleEditDate(index, newDate)} 
                                />
                            </div>
                        ))}
                        {/* כפתור להוספת תאריך נוסף */}
                        {selectedDates.length < 6 && (
                            <DatePickerButton onDateSelect={handleDateSelect} />
                        )}
                    </>
                )}
            </div>
        ],
    ];

    return <Table key={renderKey} content={title} />; // key ייחודי כדי לגרום לרינדור מחדש
};

export default GlobalParshaTable;
