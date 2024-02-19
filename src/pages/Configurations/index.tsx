import React from "react";

import {
  ConfigInputContainer,
  ConfigLabel,
  ConfigWrapper,
  ConfigsContainer,
  ConfigsTitle,
  Container,
} from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Radio from "../../components/Inputs/Radio";
import {
  SpeedConfigUnit,
  TemperatureConfigUnit,
} from "../../contexts/configs/types";
import { useConfigs } from "../../contexts/configs";

const Configurations: React.FC = () => {
  const { userConfigs, toggleConfig } = useConfigs();

  return (
    <Container>
      <ConfigsTitle>Configurações</ConfigsTitle>
      <ConfigsContainer>
        <ConfigWrapper>
          <ConfigLabel>
            <Feather name="thermometer" size={18} /> Unidade de temperatura
          </ConfigLabel>
          <ConfigInputContainer>
            <Radio
              currentValue={userConfigs.temperatureUnit}
              onChangeValue={async (value) =>
                await toggleConfig("temperatureUnit", value)
              }
              buttons={[
                { label: "°C", value: TemperatureConfigUnit.CELSIUS },
                {
                  label: "Auto",
                  value: TemperatureConfigUnit.AUTO,
                },
                { label: "°F", value: TemperatureConfigUnit.FAHRENHEIT },
              ]}
            />
          </ConfigInputContainer>
        </ConfigWrapper>
        <ConfigWrapper>
          <ConfigLabel>
            <Ionicons name="speedometer-outline" size={18} /> Unidade de
            velocidade
          </ConfigLabel>
          <ConfigInputContainer>
            <Radio
              onChangeValue={async (value) =>
                await toggleConfig("speedUnit", value)
              }
              currentValue={userConfigs.speedUnit}
              buttons={[
                { label: "Kmh", value: SpeedConfigUnit.KM },
                {
                  label: "Auto",
                  value: SpeedConfigUnit.AUTO,
                },
                { label: "Mph", value: SpeedConfigUnit.MILE },
              ]}
            />
          </ConfigInputContainer>
        </ConfigWrapper>
      </ConfigsContainer>
    </Container>
  );
};

export default Configurations;
