'use client'
import { createContext, useContext, useEffect, useState } from "react";
import {useHandlePosition, useCreateEditHook, IUseHandlePositionReturn, ICreateEditReturn} from "@repo/ui/custom-hook";
import {EnumTypeArea, EnumTypeSection, Area, SectionsOptions, RowSection, TableSection, ObjectSection, FreeSpaceSection} from "./area-interfaces";
import { Resource } from "@repo/ui/uploadResources";
import {InputTextChangeEvent} from "@repo/ui/customInputs";

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
    AreaHandlers: IAreaHandlers
}

export interface ISectionHandlers{
    SelectSectionForEdit: (s?: SectionsOptions | undefined)=>void
    DeleteSection: (id: string)=>void
    DeleteResource: (idSection: string, idReource: string)=>void
    AddResource: (idSection: string, resource: Resource)=>void
    DeleteSectionItem: (idSection: string, idItem: string)=>void
    EditCapacityFromSectionItem: (idSection: string, idItem: string, value: number)=>void
    EditNameSectionItem:(id: string, idItem: string, newValue: string)=>void
    HandleAddNewItemToSection: (section: SectionsOptions)=>void
    EditSection: (section: SectionsOptions)=>void
    AddSection: (section: SectionsOptions)=>void
}

export interface IAreaHandlers{
    EditName: (e: InputTextChangeEvent) =>void
    AddResource: (r: Resource)=>void
    DeleteResource: (id: string)=>void
    AddLayout: (r: Resource)=>void
    DeleteLayout: ()=>void
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
    const defaultArea: Area =   {
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
                        Id: `Fila 1`,
                        Row: `Fila 1`,
                        Seat: 7,
                        SeatsDisable: []
                    },
                    {
                        Id: `Fila 2`,
                        Row: `Fila 2`,
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
                        Id: `Fila 1`,
                        Row: `Fila 1`,
                        Seat: 7,
                        SeatsDisable: []
                    },
                    {
                        Id: `Fila 2`,
                        Row: `Fila 2`,
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
                        Id: `Mesa 1`,
                        Table: `Mesa 1`,
                        Chair: 4,
                    },
                    {
                        Id: `Mesa 2`,
                        Table: `Mesa 2`,
                        Chair: 4,
                    },
                    {
                        Id: `Mesa 3`,
                        Table: `Mesa 3`,
                        Chair: 4,
                    },
                    {
                        Id: `Mesa 4`,
                        Table: `Mesa 4`,
                        Chair: 4,
                    },
                    {
                        Id: `Mesa 5`,
                        Table: `Mesa 5`,
                        Chair: 4,
                    },
                    {
                        Id: `Mesa 6`,
                        Table: `Mesa 6`,
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
        ],
        Resources: []
    };
    const [area, setArea] = useState<Area>(defaultArea);
    const [secForEdit, setSecForEdit] = useState<SectionsOptions | undefined>(undefined);

    const provider: IAreaContext = {
        IdVenue: idVenue,
        IdBlueprint: idBlueprint,
        IdArea: idArea,
        CreateEditHandler: CreateEditHandler,
        PositionHandler: PositionHandler,
        Area: area,
        IsSimple: true,
        HaveEventActive: false,
        SectionForEdit: secForEdit,
        AreaHandlers:{
            EditName: handleEditNameArea,
            AddResource: handleAddAreaResource,
            DeleteResource: handleDeleteAreaResource,
            AddLayout: handleAddLayout,
            DeleteLayout: handleDeleteLayout
        },
        SectionHandlers:{
            SelectSectionForEdit: handleSelectSectionForEdit,
            DeleteSection: handleDeleteSection,
            DeleteResource: handleDeleteResource,
            DeleteSectionItem: handleDeleteSectionItem,
            EditCapacityFromSectionItem: handleEditCapacityFromSectionItem,
            EditNameSectionItem: handleEditNameSectionItem,
            HandleAddNewItemToSection: handleAddNewItemToSections,
            AddResource: handleAddResource,
            EditSection: handleEditSection,
            AddSection: handleAddNewSection
        }
    };

    useEffect(()=>{
    }, [idArea, idBlueprint, idVenue])

    return(
        <AreaContext.Provider value={provider}>
            {children}
        </AreaContext.Provider>
    )

    function handleEditNameArea(e: InputTextChangeEvent){
        setArea({...area, Name: e.Event.target.value})
    }

    function handleAddLayout(r: Resource){
        setArea({...area, Blueprint: r.Source})
    }

    function handleDeleteLayout(){
        setArea({...area, Blueprint: ""})
    }

    function handleAddAreaResource(r: Resource){
        const newResources = [...area.Resources, r];
        setArea({...area, Resources: newResources})
    }

    function handleDeleteAreaResource(id: string){
        const newResources = area.Resources.filter(r=>r.Id !== id);
        setArea({...area, Resources: newResources})
    }

    function handleSelectSectionForEdit(s?: SectionsOptions | undefined){
        setSecForEdit(s)
    }

    function handleDeleteSection(id: string){
        const newSections = area.Sections.filter(s=>s.Id !== id)
        setArea({...area, Sections: newSections})
    }

    function handleDeleteResource(idSection: string, idReource: string){
        const newSections = area.Sections.map(s=>{
            if(s.Id === idSection){
                const newImages = s.Images?.filter(i=>i!== idReource)
                return {...s, Images: newImages}
            } else return {...s}
        })
        setArea({...area, Sections: newSections})
    }

    function handleAddResource(idSection: string, resource: Resource){
        const newSections = area.Sections.map(s=>{
            if(s.Id === idSection){
                if(s.Images){
                    const newImages = [...s.Images, resource.Source];
                    return {...s, Images: newImages}
                } else return {...s, Images: [resource.Source]}
            } else return {...s}
        })
        setArea({...area, Sections: newSections})
    }

    function handleDeleteSectionItem(idSection: string, idItem: string){
        const newSections = area.Sections.map(s=>{
            if(s.Id === idSection){
                if(s.Type === EnumTypeSection.Row){
                    const castSection: RowSection = s as RowSection;
                    const newRows = castSection.Rows.filter(r=> r.Id !== idItem);
                    return({...castSection, Rows: newRows})
                }
                else if(s.Type === EnumTypeSection.Table){
                    const castSection: TableSection = s as TableSection;
                    const newTables = castSection.Tables.filter(r=> r.Id !== idItem);
                    return({...castSection, Tables: newTables})
                }
                else if(s.Type === EnumTypeSection.Object){
                    const castSection: ObjectSection = s as ObjectSection;
                    const newObjects = castSection.Objects.filter(r=> r.Id !== idItem);
                    return({...castSection, Objects: newObjects})
                }
                else return {...s}
            } else return {...s}
        })
        setArea({...area, Sections: newSections})

    }

    function handleEditCapacityFromSectionItem(idSection: string, idItem: string, value: number) {
        const newSections = area.Sections.map(e => {
            if (e.Id === idSection) {
                if (e.Type === EnumTypeSection.Row) {
                    const newSection = e as RowSection;
                    const newRows = newSection.Rows.map(f => {
                        if (f.Id === idItem) return {...f, Seat: value}
                        else return {...f}
                    })
                    return {...newSection, Rows: newRows}
                } else if (e.Type === EnumTypeSection.Table) {
                    const newSection = e as TableSection;
                    const newTables = newSection.Tables.map(f => {
                        if (f.Id === idItem) return {...f, Chair: value}
                        else return {...f}
                    })
                    return {...newSection, Tables: newTables}
                } else if (e.Type === EnumTypeSection.Object) {
                    const newSection = e as ObjectSection;
                    const newObjects = newSection.Objects.map(f => {
                        if (f.Id === idItem) return {...f, Capacity: value}
                        else return {...f}
                    })
                    return {...newSection, Objects: newObjects}
                } else {
                    const newSection = e as FreeSpaceSection;
                    return {...newSection, Capacity: value}
                }
            } else return {...e}
        });
        setArea({...area, Sections: newSections})
    }

    function handleEditNameSectionItem(id: string, idItem: string, newValue: string) {
        const newSections = area.Sections.map(s => {
            if (s.Id === id) {
                if (s.Type === EnumTypeSection.Row) {
                    const castSection = s as RowSection;
                    const newFiles = castSection.Rows.map(f => {
                        if (f.Id === idItem) return {...f, Row: newValue}
                        else return {...f}
                    });
                    return {...castSection, Rows: newFiles}
                } else if (s.Type === EnumTypeSection.Table) {
                    const castSection = s as TableSection;
                    const newFiles = castSection.Tables.map(f => {
                        if (f.Id === idItem) return {...f, Table: newValue}
                        else return {...f}
                    });
                    return {...castSection, Tables: newFiles}
                } else {
                    const castSection = s as ObjectSection;
                    const newFiles = castSection.Objects.map(f => {
                        if (f.Id === idItem) return {...f, Object: newValue}
                        else return {...f}
                    });
                    return {...castSection, Objects: newFiles}
                }
            } else return {...s}
        });
        setArea({...area, Sections: newSections})
    }

    function handleAddNewItemToSections(section: SectionsOptions) {
        const newSections = area.Sections.map(s => {return s.Id === section.Id ? {...section} : {...s}});
        setArea({...area, Sections: newSections})
    }

    function handleEditSection(section: SectionsOptions){
        const newSections = area.Sections.map(s=>{return s.Id === section.Id ? {...section} : {...s}});
        setArea({...area, Sections: newSections})
        setSecForEdit(undefined)
        
    }

    function handleAddNewSection(section: SectionsOptions){
        const newSections = [...area.Sections, section];
        setArea({...area, Sections: newSections})
    }
}