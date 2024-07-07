"use client";

import { CareerMateStoreProps } from "@/config/TypeScriptTypes";
import { createContext, useContext, useState } from "react";

const CareerMateStore = createContext<CareerMateStoreProps | undefined>(
  undefined
);

const CareerMateProvider = ({ children }: { children: React.ReactNode }) => {
  const [renderKey, setRenderKey] = useState(0);
  const [user_profile_db, setUserProfileDB] = useState(
    {} as CareerMateStoreProps["user_profile_db"]
  );
  const [user_profile_active, setUserProfileActive] = useState(
    {} as CareerMateStoreProps["user_profile_active"]
  );
  const [localUser, setLocalUser] = useState(
    {} as CareerMateStoreProps["localUser"]
  );

  const updateUserProfileDb = (
    user_profile: CareerMateStoreProps["user_profile_db"]
  ) => {
    setUserProfileDB(user_profile);
    setUserProfileActive(user_profile);
    updateRenderKey();
  };
  const updateRenderKey = () => {
    setRenderKey(renderKey + 1);
  };

  return (
    <CareerMateStore.Provider
      value={{
        renderKey,
        updateRenderKey,
        user_profile_db,
        user_profile_active,
        setUserProfileDB,
        updateUserProfileDb,
        setUserProfileActive,

        localUser,
        setLocalUser,
      }}
    >
      {children}
    </CareerMateStore.Provider>
  );
};

export const useCareerMateStore = () => {
  const context = useContext(CareerMateStore);
  if (context === undefined) {
    throw new Error(
      "useCareerMateStore must be used within a CareerMateProvider"
    );
  }
  return context;
};

export default CareerMateProvider;
