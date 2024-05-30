import React, {createContext, useContext, useEffect, useState} from "react";

export interface VenueContextProps {
     Venue: string
}

export interface EventResume {
  Name: string;
  Id: string;
  Image: string;
  Venue: string;
}

export interface Blueprint {
  Id: string;
  NamePrint: string;
  Venue: string;
  VenueId: string;
  TotalAreas: string[];
  EventsUsages: number;
  TotalEvents: number;
  TotalSections: number;
  Image: string;
  Location: string;
  Type: EnumBlueprintType;
}

export enum EnumBlueprintType {
  Simple,Advanced
}

export interface Venue {
  Id: string;
  Image: string;
  Address: string;
  Name: string;
  Resource: any;
  ViewPort: any;
  Events: EventResume[];
  Blueprints: Blueprint[];
  IsPublic: boolean;
}

//@ts-ignore
export const VenueContext = createContext<VenueContextProps>(null);

export function useVenueContext(){
    const provider = useContext(VenueContext);
    if (!provider) throw new Error();
    else return provider
}

export default function Provider ({children, v}:{children: React.ReactNode, v: string}){
    const [venue, setVenue] = useState<string>("");
    const provider: VenueContextProps = {
        Venue: venue
    };

    useEffect(()=>{
         setTimeout(()=>{
            setVenue(transform(v));
         }, 1000)
    }, [v])

    return <VenueContext.Provider value={provider}>{venue === "" ? <div>Transformando la respuesta</div> : children}</VenueContext.Provider>

    function transform(v: string) {
        return v
    }
}