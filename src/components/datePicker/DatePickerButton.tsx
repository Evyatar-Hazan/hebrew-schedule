import "react-day-picker/dist/style.css";

import { he } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

import * as styled from "./styled";

interface DatePickerButtonProps {
  onDateSelect: (date: string) => void;
  selectedDates?: string;
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  onDateSelect,
  selectedDates,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedDates) {
      setSelectedDate(new Date(selectedDates));
    } else {
      setSelectedDate(new Date());
    }
  }, [selectedDates]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsOpen(false);
      onDateSelect(date.toISOString().split("T")[0]);
    } else {
      setSelectedDate(undefined);
    }
  };

  const closeModal = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <styled.Container>
      <styled.Button onClick={() => setIsOpen(true)}>
        {selectedDates !== undefined ? selectedDates : "📅 בחר תאריך"}
      </styled.Button>

      {isOpen && (
        <styled.ModalOverlay onClick={closeModal}>
          <styled.ModalContent onClick={(e) => e.stopPropagation()}>
            <DayPicker
              selected={selectedDate}
              onDayClick={handleDateChange}
              locale={he}
              mode="single"
              dir="rtl"
              captionLayout="dropdown"
              fromYear={new Date().getFullYear()}
              toYear={new Date().getFullYear() + 10}
              showOutsideDays
            />
          </styled.ModalContent>
        </styled.ModalOverlay>
      )}
    </styled.Container>
  );
};

export default DatePickerButton;
