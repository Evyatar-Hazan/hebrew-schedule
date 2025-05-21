import React from "react";
import styled from "styled-components";

import DatePickerButton from "../components/datePicker/DatePickerButton";

type NavBarProps = {
  version: string;
  logoSrc: string;
  onScreenshotClick?: () => void;
  dates: string[];
  setDates: (val: string[]) => void;
};

const Container = styled.header`
  height: 64px;
  background: linear-gradient(to right, #f9fafb, #edf0f3);
  border-bottom: 1px solid #d0d7de;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
  position: sticky;
  top: 0;
  z-index: 1000;
  margin-bottom: 16px;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.img`
  height: 36px;
  border-radius: 8px;
`;

const Version = styled.span`
  font-size: 13px;
  color: #4f4f4f;
  background-color: #e0e7ff;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  padding: 8px 20px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const NavBar: React.FC<NavBarProps> = ({
  version,
  logoSrc,
  onScreenshotClick,
  setDates,
  dates,
}) => (
  <Container>
    <LeftSide>
      <Logo src={logoSrc} alt="Logo" />
      <Version>v{version}</Version>
    </LeftSide>
    <RightSide>
      <DatePickerButton
        key="new-date-picker-button"
        onDateSelect={(selectedDate) => setDates([...dates, selectedDate])}
      />
      <NavButton onClick={onScreenshotClick}>צילום מסך</NavButton>
    </RightSide>
  </Container>
);

export default NavBar;
