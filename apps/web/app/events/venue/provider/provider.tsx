import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ENCLOSURE_OPTIONS } from "../data";
import {  IUseSearch,  useSearch} from "@repo/ui/searchBar";
import {addInitialPositionTabs} from "@repo/ui/navTabs";
import {INITIAL_POSITION_MUTATION} from "../const";

export interface IVenueProvider {
  Venues: VenueRowTable[];
  HandleMutation: (id?: string, index?: number) => void;
  Search: IUseSearch
}

//@ts-ignore
export const VenueProviderContext = createContext<IVenueProvider>(null);

export interface VenueRowTable {
  Id: string;
  Name: string;
  Image: string;
  Address: string;
  RealizeServices: number;
  PendentServices: number;
  TotalBluePrints: number;
  Events: number;
}

export function useVenueProvider() {
  const provider = useContext(VenueProviderContext);
  if (provider) return provider;
  else throw new Error("Error");
}

export const VenueProvider = ({ children }: { children: React.ReactNode }) => {
  const [venues, setVenues] = useState<VenueRowTable[]>(getVenues());
  const { push } = useRouter();
  const searchProps = useSearch(onSearch, onDeleteSearch);

  const provider: IVenueProvider = {
    Venues: venues,
    HandleMutation: handleMutation,
    Search: searchProps
  };

  return (
    <VenueProviderContext.Provider value={provider}>
      {children}
    </VenueProviderContext.Provider>
  );

  function getVenues() {
    let newList: VenueRowTable[] = [];
    for (let i = 0; i <= 1; i++) {
      const newItem: VenueRowTable = {
        Id: ENCLOSURE_OPTIONS[i]!.Id,
        Name: ENCLOSURE_OPTIONS[i]!.Name,
        Address: ENCLOSURE_OPTIONS[i]!.Address.Location,
        PendentServices: ENCLOSURE_OPTIONS[i]!.ServicePendent.length,
        RealizeServices: ENCLOSURE_OPTIONS[i]!.ServiceRealized.length,
        Image: ENCLOSURE_OPTIONS[i]!.Image,
        TotalBluePrints: ENCLOSURE_OPTIONS[i]!.Blueprints.length,
        Events: ENCLOSURE_OPTIONS[i]!.Events.length,
      };
      newList = [...newList, newItem];
    }
    return newList;
  }

  function handleMutation(id?: string, index?: number) {
    if (id) {
      if(index) addInitialPositionTabs(INITIAL_POSITION_MUTATION, index)
      push(`/events/venue/${id}`);
    }
    else push(`/events/venue/create-venue`);
  }

  function onSearch() {}
  function onDeleteSearch() {}  
};
