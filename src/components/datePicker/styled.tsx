import styled from "styled-components";

export const Container = styled.div``;

export const Button = styled.button`
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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StyledDayPicker = styled.div`
  .rdp-day {
    cursor: pointer;
  }

  .rdp-day_selected {
    font-weight: bold;
  }

  .rdp-day_outside {
    font-weight: bold;
  }

  .rdp-day_today {
    font-weight: bold;
  }

  .rdp-day button {
    font-size: 1.2rem;
    font-weight: initial;
  }
`;
