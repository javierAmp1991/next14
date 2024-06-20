'use client'
import { createContext, useContext, useEffect } from "react";
import {useHandlePosition, useCreateEditHook, IUseHandlePositionReturn, ICreateEditReturn, EnumCreateEdit} from "@repo/ui/custom-hook";
import {INITIAL_POSITION_MUTATION} from "./const";


export interface IBlueprintContext {
  IdVenue: string
  IdBlueprint: string
  PositionHandler: IUseHandlePositionReturn
  CreateEditHandler: ICreateEditReturn
}

//@ts-ignore
export const BlueprintContext = createContext<IBlueprintContext>(null);

export function useBlueprintContext(){
    const provider = useContext(BlueprintContext);
    if (provider) return provider
    else throw new Error("")
}

export default function Provider({children,idVenue, idBlueprint}: {children: React.ReactNode, idVenue: string, idBlueprint: string}) {
  const CreateEditHandler = useCreateEditHook();
  const PositionHandler = useHandlePosition(INITIAL_POSITION_MUTATION);
  const provider: IBlueprintContext = {
    IdVenue: idVenue,
    IdBlueprint: idBlueprint,
    CreateEditHandler: CreateEditHandler,
    PositionHandler: PositionHandler
  };
  useEffect(()=>{
  
  }, [idBlueprint, idVenue])
  
  return (
    <BlueprintContext.Provider value={provider}>
      {children}
    </BlueprintContext.Provider>
  );
}
