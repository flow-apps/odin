import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import storage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";
import { Title } from "../../components/Custom/Custom";
import {
  Button,
  ButtonText,
  Container,
  FormContainer,
  Input,
  InputContainer,
  Label,
  SearchContainer,
} from "./styles";

import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { GetAdId, AdTypes } from "../../utils/ads";
import { translate } from "../../translations/index";
import { fonts } from "../../styles/fonts";

const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const [city, setCity] = useState("");

  useEffect(() => {
    storage.getItem("@Odin:City", (err, result) => {
      if (err) return;
      return setCity(result);
    });
  }, []);

  const handleForecastNavigate = async () => {
    if (!city)
      return Alert.alert(
        translate("home.alerts.tellACity.title"),
        translate("home.alerts.tellACity.content")
      );

    await storage.setItem("@Odin:City", city);
    return navigation.navigate("Forecast", { city });
  }

  return (
    <>
      {/* <BannerAd
        unitId={GetAdId(AdTypes.BANNER)}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      /> */}
      <Container>
        <SearchContainer>
          <Title
            align="center"
            margin="20px 0px 0px 0px"
            fontSize="20px"
            fontFamily={fonts.text}
          >
            <Feather name="cloud-rain" size={25} />{" "}
            {translate("home.mainTitle")}
          </Title>
          <FormContainer>
            <InputContainer>
              <Label>{translate("home.inputLabel")}</Label>
              <Input
                placeholder={translate("home.placeholders.inputCity")}
                placeholderTextColor="#666"
                value={city}
                onChangeText={setCity}
              />
              <Button onPress={handleForecastNavigate}>
                <ButtonText>
                  <Feather name="search" size={20} />{" "}
                  {translate("home.buttons.searchButton")}
                </ButtonText>
              </Button>
            </InputContainer>
          </FormContainer>
        </SearchContainer>
      </Container>
    </>
  );
};

export default Home;
