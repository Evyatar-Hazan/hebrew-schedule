import React from 'react';
import { InputContainer, Label, Input } from './styles';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const TimeInput: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputContainer>
  );
};