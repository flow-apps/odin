import React, { useContext, createContext, useState, useEffect } from "react";
import {
  SpeedConfigMetrics,
  TemperatureConfigMetrics,
  UserConfigs,
} from "./types";
import { usePersistedState } from "../../hooks/usePersistedState";

interface ConfigsControllerContext {
  userConfigs: UserConfigs;
}

const ConfigsControllerContext = createContext<ConfigsControllerContext>(
  {} as ConfigsControllerContext
);

const ConfigsControllerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userConfigs, setUserConfigs] = usePersistedState<UserConfigs>(
    "@Odin:UserConfigs",
    {
      speedMetric: SpeedConfigMetrics.AUTO,
      temperatureMetric: TemperatureConfigMetrics.AUTO,
    }
  );

  const toggleConfig = (configKey: string, value: any) => {
    setUserConfigs((old) => ({
      ...old,
      [configKey]: value,
    }));
  };

  return (
    <ConfigsControllerContext.Provider value={{ userConfigs }}>
      {children}
    </ConfigsControllerContext.Provider>
  );
};

const useConfigs = () => {
  const configsControllerContext = useContext(ConfigsControllerContext);

  return configsControllerContext;
};

export { ConfigsControllerProvider, useConfigs };
