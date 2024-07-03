'use client'
import { createContext, useContext, useEffect, useState } from "react";
import {useHandlePosition, useCreateEditHook, IUseHandlePositionReturn, ICreateEditReturn} from "@repo/ui/custom-hook";
import {INITIAL_POSITION_MUTATION} from "./const";
import { InputTextChangeEvent } from "@repo/ui/customInputs";

export interface Blueprint{
  Id: string
  Name: string
  Areas: Areas[]
}

export interface Areas {
  Id: string
  Name: string
  Sections: number
  Image: string
}


export interface IBlueprintContext {
  Blueprint: Blueprint
  IdVenue: string
  IdBlueprint: string
  PositionHandler: IUseHandlePositionReturn
  CreateEditHandler: ICreateEditReturn
  HandleName: (e: InputTextChangeEvent) => void
}

//@ts-ignore
export const BlueprintContext = createContext<IBlueprintContext>(null);

export function useBlueprintContext(){
    const provider = useContext(BlueprintContext);
    if (provider) return provider
    else throw new Error("")
}

const DEFAULT_BLUEPRINT: Blueprint = {
  Name: "",
  Id: "defaultBlueprint",
  Areas: [
    {
      Name: "Primer piso",
      Image: "/venue-images/firstPlace.svg",
      Sections: 4,
      Id: "id001"
    },
    {
      Name: "Segundo Piso",
      Image: "/venue-images/sausalito4.jpg",
      Sections: 3,
      Id: "id002"
    }
  ]
}

export default function Provider({children,idVenue, idBlueprint}: {children: React.ReactNode, idVenue: string, idBlueprint: string}) {
  const CreateEditHandler = useCreateEditHook();
  const PositionHandler = useHandlePosition(INITIAL_POSITION_MUTATION);
  const [blueprint, setBlueprint] = useState<Blueprint>(DEFAULT_BLUEPRINT)
  const provider: IBlueprintContext = {
    Blueprint: blueprint,
    IdVenue: idVenue,
    IdBlueprint: idBlueprint,
    CreateEditHandler: CreateEditHandler,
    PositionHandler: PositionHandler,
    HandleName: handleName
  };
  useEffect(()=>{
  
  }, [idBlueprint, idVenue])
  
  return (
    <BlueprintContext.Provider value={provider}>
      {children}
    </BlueprintContext.Provider>
  );

  function handleName(e: InputTextChangeEvent){
      setBlueprint({...blueprint, Name:e.Event.target.value})
  }
}
