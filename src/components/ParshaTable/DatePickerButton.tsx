import "react-datepicker/dist/react-datepicker.css";

import { he } from "date-fns/locale"; // ייבוא עברית
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

// רישום עברית כסביבה לשימוש
registerLocale("he", he);

interface DatePickerButtonProps {
  onDateSelect: (date: string) => void;
  selectedDates?: string;
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  onDateSelect,
  selectedDates,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      onDateSelect(date.toISOString().split("T")[0]); // מחזיר תאריך בפורמט YYYY-MM-DD
    }
  };

  return (
    <div className="relative inline-block" dir="rtl" style={{ flex: 1 }}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={
          selectedDates !== undefined ? selectedDates : "📅 בחר תאריך"
        }
        locale="he"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer"
      />
    </div>
  );
};

export default DatePickerButton;
