import styled from "styled-components";

export const Container = styled.div`
  display: inline-block;
  position: relative;
  flex: 1;
  direction: rtl;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  color: black;
  font-size: 16px;
  border-radius: 0.5rem;
  transition:
    background-color 0.3s,
    transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
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
