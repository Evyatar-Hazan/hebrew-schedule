import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 100%;
  text-align: center;
`;

const Emoji = styled.div`
  font-size: 4rem;
  animation: ${bounce} 1.5s infinite;
`;

const Message = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #555;
  font-weight: 500;
  transition: opacity 0.3s ease;
`;

const messages = [
  "ממתין לקסם...",
  "טוען חיוך...",
  "האם מישהו שם?",
  "הלב פועם בציפייה...",
  "רק תלחץ על משהו 😊",
];

const PlayfulLoader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoaderContainer>
      <Emoji>🧸</Emoji>
      <Message>{messages[messageIndex]}</Message>
    </LoaderContainer>
  );
};

export default PlayfulLoader;
