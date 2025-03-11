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
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      onDateSelect(`${year}-${month}-${day}`);
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
            <styled.StyledDayPicker>
              <DayPicker
                selected={selectedDate ?? new Date()}
                onDayClick={handleDateChange}
                locale={he}
                mode="single"
                dir="rtl"
                captionLayout="dropdown"
                fromYear={new Date().getFullYear()}
                toYear={new Date().getFullYear() + 10}
                showOutsideDays
              />
            </styled.StyledDayPicker>
          </styled.ModalContent>
        </styled.ModalOverlay>
      )}
    </styled.Container>
  );
};

export default DatePickerButton;
