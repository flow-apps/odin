import React from "react";
import { Container, RadioButtonWrapper, RadioLabel } from "./styles";
import { useTheme } from "styled-components";

interface RadioProps {
  buttons: {
    label: string;
    value: any;
  }[];
  onChangeValue: (value: any) => void;
  currentValue: any;
}

const Radio: React.FC<RadioProps> = ({
  buttons,
  onChangeValue,
  currentValue,
}) => {
  const { colors } = useTheme();

  return (
    <Container>
      {buttons.map((button, index) => (
        <RadioButtonWrapper
          key={index}
          onPress={() => onChangeValue(button.value)}
          style={{
            borderTopLeftRadius: index === 0 ? 8 : 0,
            borderBottomLeftRadius: index === 0 ? 8 : 0,
            borderTopRightRadius: index === buttons.length - 1 ? 8 : 0,
            borderBottomRightRadius: index === buttons.length - 1 ? 8 : 0,
            backgroundColor:
              currentValue === button.value ? colors.primary : colors.shape,
          }}
        >
          <RadioLabel>{button.label}</RadioLabel>
        </RadioButtonWrapper>
      ))}
    </Container>
  );
};

export default Radio;
