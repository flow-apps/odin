import React, { useContext, createContext, useEffect, useState } from "react";
import { SpeedConfigUnit, TemperatureConfigUnit, UserConfigs } from "./types";
import { usePersistedState } from "../../hooks/usePersistedState";
import { StorageService } from "../../services/storage";

interface ConfigsControllerContext {
  userConfigs?: UserConfigs;
  toggleConfig: (key: string, value: any) => void;
}

const ConfigsControllerContext = createContext<ConfigsControllerContext>(
  {} as ConfigsControllerContext
);

const ConfigsControllerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storage = new StorageService();
  const [userConfigs, setUserConfigs] = useState<UserConfigs>(null);

  useEffect(() => {
    handleGetUserConfigs();
  }, []);

  const handleGetUserConfigs = async () => {
    const savedUserConfigs = await storage.getItem("@Odin:UserConfigs");

    if (savedUserConfigs) {
      setUserConfigs(JSON.parse(savedUserConfigs));
    }
  };

  const toggleConfig = async (configKey: string, value: any) => {
    await storage.saveItem(
      "@Odin:UserConfigs",
      JSON.stringify({ ...userConfigs, [configKey]: value })
    );
    setUserConfigs((old) => ({
      ...old,
      [configKey]: value,
    }));
  };

  return (
    <ConfigsControllerContext.Provider value={{ userConfigs, toggleConfig }}>
      {children}
    </ConfigsControllerContext.Provider>
  );
};

const useConfigs = () => {
  const configsControllerContext = useContext(ConfigsControllerContext);

  return configsControllerContext;
};

export { ConfigsControllerProvider, useConfigs };
