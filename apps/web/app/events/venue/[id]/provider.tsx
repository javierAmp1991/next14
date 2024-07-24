"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {useHandlePosition, useCreateEditHook, IUseHandlePositionReturn, ICreateEditReturn, EnumCreateEdit} from "@repo/ui/custom-hook";
import {INITIAL_POSITION_MUTATION} from "../const";
import {ENCLOSURE_OPTIONS} from "../data";
import {Resource} from "@repo/ui/uploadResources";
import {InputTextChangeEvent} from "@repo/ui/customInputs";
import { Address } from "@repo/ui/mapbox";

export interface VenueContextProps {
     Venue: Venue,
     PositionHandler: IUseHandlePositionReturn
     CreateEditHandler: ICreateEditReturn
     VenueHandlers: VenueHandlers
     Id: string
}

export interface EventResume {
  Name: string;
  Id: string;
  Image: string;
  Venue: string;
}

export interface BlueprintResume{
  Name: string,
  Id: string
  Image: string
  Sections: number
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
  Address: Address;
  Name: string;
  Resource: Resource[];
  ViewPort: any;
  Events: EventResume[];
  Blueprints: BlueprintResume[];
  IsPublic: boolean;
}

interface VenueHandlers{
  HandleName: (e: InputTextChangeEvent)=>void
  HandleIsPublic: ()=>void
  HandleAddResource: (resource: Resource)=>void
  HandleDeleteResource: (id: string)=>void
  HandlAddress: (a: Address)=>void
}

const DEFAULT_VENUE: Venue = {
  Id: "",
  Image: "",
  Address: {
    Lat: 0,
    Lng: 0,
    Location: ""
  },
  Name: "",
  Blueprints: [],
  Events: [],
  IsPublic: false,
  Resource: [],
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
      HandleName: handleName,
      HandleAddResource: handleAddResource,
      HandleDeleteResource: handleDeleteResource,
      HandlAddress: handleAddress
    };
    const provider: VenueContextProps = {
        Venue: venue,
        CreateEditHandler: CreateEditHandler,
        PositionHandler: PositionHandler,
        VenueHandlers: venueHandlers,
        Id: id
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
                Events: newLocation.Events,
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

    function handleIsPublic(){
      const newVenue = {...venue, IsPublic: !venue.IsPublic}
      setVenue(newVenue)
    }

    function handleAddResource(r: Resource){
        const newResources: Resource[] = [...venue.Resource, r];
        setVenue({...venue, Resource: newResources})
    }

    function handleDeleteResource(id: string){
      const newResources = venue.Resource.filter(r=>r.Id  !== id);
      setVenue({...venue, Resource: newResources})
    }

    function handleName(e: InputTextChangeEvent){
      setVenue({...venue, Name: e.Event.target.value})
    }

    function handleAddress(a: Address){
      setVenue({...venue, Address: a})
    }
}