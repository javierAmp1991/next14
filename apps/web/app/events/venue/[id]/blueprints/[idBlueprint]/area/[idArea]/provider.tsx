'use client'
import { createContext, useContext, useEffect, useState } from "react";
import {useHandlePosition, useCreateEditHook, IUseHandlePositionReturn, ICreateEditReturn} from "@repo/ui/custom-hook";
import {EnumTypeArea, EnumTypeSection, Area, SectionsOptions} from "./area-interfaces";

export interface IAreaContext {
    IdVenue: string
    IdBlueprint: string
    IdArea: string
    PositionHandler: IUseHandlePositionReturn
    CreateEditHandler: ICreateEditReturn
    Area: Area
    IsSimple: boolean
    HaveEventActive: boolean
    SectionForEdit: SectionsOptions | undefined
    SectionHandlers: ISectionHandlers
}

export interface ISectionHandlers{
    SelectSectionForEdit: (s?: SectionsOptions | undefined)=>void
}

  
//@ts-ignore
export const AreaContext = createContext<IAreaContext>(null);

export function useAreaContext(){
    const provider = useContext(AreaContext);
    if (provider) return provider
    else throw new Error("")
}
  

export default function Provider({children,idVenue, idBlueprint, idArea}:
     {children: React.ReactNode, idVenue: string, idBlueprint: string, idArea: string}){
    const CreateEditHandler = useCreateEditHook();
    const PositionHandler = useHandlePosition();
    const [secForEdit, setSecForEdit] = useState<SectionsOptions | undefined>(undefined);

    const Area: Area =   {
        Id: "idFirstPlace",
        Name: "Primer piso",
        Blueprint: "/venue-images/firstPlace.svg",
        Type: EnumTypeArea.Simple,
        Sections: [
            {
                Id: "Seccion Oeste",
                Name: "Seccion Oeste",
                Type: EnumTypeSection.Row,
                Color: "#af599e",
                Rows: [
                    {
                        Id: `1`,
                        Row: `1`,
                        Seat: 7,
                        SeatsDisable: []
                    },
                    {
                        Id: `2`,
                        Row: `2`,
                        Seat: 7,
                        SeatsDisable: []
                    },
                ],
                Images: ["/venue-images/test1.jpg", "/venue-images/test2.jpg"]
            },
            {
                Id: "Seccion Este",
                Name: "Seccion Este",
                Type: EnumTypeSection.Row,
                Color: "#af599e",
                Rows: [
                    {
                        Id: `1`,
                        Row: `1`,
                        Seat: 7,
                        SeatsDisable: []
                    },
                    {
                        Id: `2`,
                        Row: `2`,
                        Seat: 7,
                        SeatsDisable: []
                    },
                ],
            },
            {
                Id: "Seccion Estandar",
                Name: "Seccion Estandar",
                Type: EnumTypeSection.Table,
                Color: "#009fe3",
                IsShared: false,
                Tables: [
                    {
                        Id: `1`,
                        Table: `1`,
                        Chair: 4,
                    },
                    {
                        Id: `2`,
                        Table: `2`,
                        Chair: 4,
                    },
                    {
                        Id: `3`,
                        Table: `3`,
                        Chair: 4,
                    },
                    {
                        Id: `4`,
                        Table: `4`,
                        Chair: 4,
                    },
                    {
                        Id: `5`,
                        Table: `5`,
                        Chair: 4,
                    },
                    {
                        Id: `6`,
                        Table: `6`,
                        Chair: 4,
                    }
                ],
            },
            {
                Id: "Seccion Vip",
                Name: "Seccion Vip",
                Type: EnumTypeSection.Object,
                Alias: "Sillones",
                Color: "#f39200",
                Objects: [
                    {
                        Id: `Sillon 1`,
                        Object: `Sillon 1`,
                        Capacity: 4,
                        Min: 3
                    },
                    {
                        Id: `Sillon 2`,
                        Object: `Sillon 2`,
                        Capacity: 4,
                        Min: 3
                    },
                    {
                        Id: `Sillon 3`,
                        Object: `Sillon 3`,
                        Capacity: 4,
                        Min: 3
                    },
                    {
                        Id: `Sillon 4`,
                        Object: `Sillon 4`,
                        Capacity: 4,
                        Min: 3
                    }
                ],
                IsShared: false
            },
            {
                Id: "Seccion Free",
                Name: "Seccion Free",
                Type: EnumTypeSection.FreeSpace,
                Color: "#f37600",
                Capacity: 10
            }
        ]
    };


    const provider: IAreaContext = {
        IdVenue: idVenue,
        IdBlueprint: idBlueprint,
        IdArea: idArea,
        CreateEditHandler: CreateEditHandler,
        PositionHandler: PositionHandler,
        Area: Area,
        IsSimple: true,
        HaveEventActive: false,
        SectionForEdit: secForEdit,
        SectionHandlers:{
            SelectSectionForEdit: handleSelectSectionForEdit
        }
    };

    useEffect(()=>{

    }, [idArea, idBlueprint, idVenue])

    return(
        <AreaContext.Provider value={provider}>
            {children}
        </AreaContext.Provider>
    )

    function handleSelectSectionForEdit(s?: SectionsOptions | undefined){
        setSecForEdit(s)
    }
}