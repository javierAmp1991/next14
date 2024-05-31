import React, { createContext, useContext } from "react";

export interface IVenueProvider {}

//@ts-ignore
export const VenueProviderContext = createContext<IVenueProvider>(null);

export function useVenueProvider() {
  const provider = useContext(VenueProviderContext);
  if (provider) return provider;
  else throw new Error("Error");
}

export const VenueProvider = ({ children }: { children: React.ReactNode }) => {
  const provider: IVenueProvider = {};
  return (
    <VenueProviderContext.Provider value={provider}>
      {children}
    </VenueProviderContext.Provider>
  );
};
