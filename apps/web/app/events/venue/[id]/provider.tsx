import React, {createContext, useContext, useEffect, useState} from "react";
import {useHandlePosition, useCreateEditHook, IUseHandlePositionReturn, ICreateEditReturn, EnumCreateEdit} from "@repo/ui/custom-hook";
import {INITIAL_POSITION_MUTATION} from "./const";
import {ENCLOSURE_OPTIONS} from "../data";

export interface VenueContextProps {
     Venue: Venue,
     PositionHandler: IUseHandlePositionReturn
     CreateEditHandler: ICreateEditReturn
     VenueHandlers: VenueHandlers
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

interface VenueHandlers{
  HandleName: (name: string)=>void
  HandleIsPublic: ()=>void
}

const DEFAULT_VENUE: Venue = {
  Id: "",
  Image: "",
  Address: "",
  Name: "",
  Blueprints: [],
  Events: [],
  IsPublic: false,
  Resource: undefined,
  ViewPort: undefined
}

//@ts-ignore
export const VenueContext = createContext<VenueContextProps>(null);

export function useVenueContext(){
    const provider = useContext(VenueContext);
    if (!provider) throw new Error();
    else return provider
}

export default function Provider ({children, id}:{children: React.ReactNode, id: string}){
    const [venue, setVenue] = useState<Venue>(DEFAULT_VENUE);
    const PositionHandler = useHandlePosition(INITIAL_POSITION_MUTATION);
    const CreateEditHandler = useCreateEditHook();
    const venueHandlers: VenueHandlers = {
      HandleIsPublic: handleIsPublic,
      HandleName: handleName
    }
    const provider: VenueContextProps = {
        Venue: venue,
        CreateEditHandler: CreateEditHandler,
        PositionHandler: PositionHandler,
        VenueHandlers: venueHandlers
    };

    useEffect(()=>{

    if (id === "create-venue") {
        CreateEditHandler.HandleCreateEdit(EnumCreateEdit.Create)
    }
     else {
        const newLocation = ENCLOSURE_OPTIONS.find(e => e.Id === id);
        if (newLocation) {
            const newItem: Venue = {
                Name: newLocation.Name,
                Address: newLocation.Address,
                Image: newLocation.Image,
                Id: newLocation.Id,
                Resource: newLocation.Resource,
                ViewPort: newLocation.ViewPort,
                Events: [],
                Blueprints: newLocation.Blueprints,
                IsPublic: newLocation.IsPublic
            };
            setVenue(newItem)
            CreateEditHandler.HandleCreateEdit(EnumCreateEdit.Edit)
        }
        else {
          CreateEditHandler.HandleCreateEdit(EnumCreateEdit.Error)
          setVenue(DEFAULT_VENUE)
        }
    }
    }, [id])

    return <VenueContext.Provider value={provider}>{children}</VenueContext.Provider> 

    function handleName(){

    }

    function handleIsPublic(){
      const newVenue = {...venue, IsPublic: !venue.IsPublic}
      setVenue(newVenue)
    }
}