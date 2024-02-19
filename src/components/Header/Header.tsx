import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { Button, Container, HeaderContent, HeaderTitle } from "./styles";
import { useNavigation } from "@react-navigation/core";
import { useTheme } from "styled-components";

interface IHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header = ({ title, showBackButton }: IHeaderProps) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <Container>
      <HeaderContent>
        <HeaderTitle>{title}</HeaderTitle>
        {showBackButton && (
          <Button onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={25} color={colors.black} />
          </Button>
        )}
      </HeaderContent>
    </Container>
  );
};

export default Header;
