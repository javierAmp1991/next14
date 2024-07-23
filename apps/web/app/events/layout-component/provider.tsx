import { createContext, ReactNode, useContext, useEffect, useState, useRef } from "react";
import {ILayoutProvider, ILayoutComponet, Areas, Ticket, EnumTypeSection, 
    RowSection, TableSection, ObjectSection, FreeSpaceSection,
EnumStateSeat, EnumTypeTicket} from "./index";
import style from "./style.module.css";
export const ID_CONTAINER_SVG: string = "idContainerSvg";

//@ts-ignore
const LayoutProviderContext = createContext<ILayoutProvider>(null);

const sectionName = "section-name";
const isBackground = "is-background"

const sectionType = "section-type";

const rowsType = "rows";
const tablesType = "tables";
const openSpaceType = "open-space";
const objectsType = "objects";

const tableName = "table-name";
const rowName = "row-name";
const objectName = "object-name";

export function useLayoutContext(){
    const provider = useContext(LayoutProviderContext);
    if (provider) return provider
    else throw new Error("")
}

export const LayoutProvider = ({children, props}:{children: ReactNode, props: ILayoutComponet })=>{
    const {Event, Layout} = props;
    const initialArea = Layout.Areas[0];
    const [areaSelected, setAreaSelected] = useState<Areas>(initialArea!);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const ticketsRef = useRef<Ticket[]>(tickets);
    const [numberTickets, setNumberTickets] = useState<number>(1);
    const numberTicketsRef = useRef<number>(numberTickets);
    const provider: ILayoutProvider = {
        Tickets: tickets,
        Event: Event,
        Layout: Layout,
        AreaSelected: areaSelected,
        IsPublic: Event !== undefined,
        AreaHandlers: {
            SelectArea: handleSelectArea
        },
        SvgHandlers: {
            OnFirstLoad: onFirstLoad
        },
        TicketHandlers: {
            DeleteTicket: handleDeleteTicket,
            SelectTicket: handleSelectTicket
        }
    };

    useEffect(()=>{
        const defaultTickets = getTickets();
        setTickets(defaultTickets)
    }, [])

    useEffect(() => {
        ticketsRef.current = tickets;
        handleAddClassToDetails()
    }, [tickets])

    return(
        <LayoutProviderContext.Provider value={provider}>
            {children}
        </LayoutProviderContext.Provider>
    )

    function handleDeleteTicket(t: Ticket) {
        const newList = tickets.map(e => {
            if (e.File === t.File && e.SectionName === t.SectionName && e.Seat === t.Seat)
                return {...e, State: !e.State}
            else return {...e}
        })
        setTickets(newList)
    }

    function handleSelectTicket(){

    }

    function handleSelectArea(id: string){
        const findArea = Layout.Areas.find(a=>a.Id === id);
        if(findArea) setAreaSelected(findArea)
    }

    function getTickets() {
        let newList: Ticket[] = [];
        props.Layout.Areas.forEach(a => {
            a.Sections.forEach(s => {
                if (s.Type === EnumTypeSection.Row) {
                    const castSection = s as RowSection;
                    castSection.Rows.forEach(cs => {
                        for (let j = 1; j <= cs.Seat; j++) {
                            newList.push({
                                SectionName: castSection.Name,
                                TypeSection: castSection.Type,
                                File: cs.Row,
                                Seat: j,
                                Type: EnumTypeTicket.Standard,
                                StateSeat: EnumStateSeat.Available,
                                State: false
                            });
                        }
                    });
                } 
                else if (s.Type === EnumTypeSection.Table) {
                    const castSection = s as TableSection;
                    castSection.Tables.forEach(cs => {
                            for (let j = 1; j <= cs.Chair; j++) {
                                newList.push({
                                    SectionName: castSection.Name,
                                    TypeSection: castSection.Type,
                                    File: cs.Table,
                                    Seat: j,
                                    Type: EnumTypeTicket.Standard,
                                    StateSeat: EnumStateSeat.Available,
                                    State: false
                                });
                            }
                    });
                } 
                else if (s.Type === EnumTypeSection.Object) {
                    const castSection = s as ObjectSection;
                    castSection.Objects.forEach(cs => {
                        for (let j = 1; j <= cs.Capacity; j++) {
                            newList.push({
                                SectionName: castSection.Name,
                                TypeSection: castSection.Type,
                                Alias: "",
                                File: cs.Object,
                                Seat: j,
                                Type: EnumTypeTicket.Standard,
                                StateSeat: EnumStateSeat.Available,
                                State: false,
                            });
                        }
                    });
                } 
                else {
                    const castSection = s as FreeSpaceSection;
                    for (let j = 1; j <= castSection.Capacity; j++) {
                        newList.push({
                            SectionName: castSection.Name,
                            TypeSection: castSection.Type,
                            File: `1`,
                            Seat: j,
                            Type: EnumTypeTicket.Standard,
                            StateSeat: EnumStateSeat.Available,
                            State: false
                        });
                    }
                }
            })
        })
        return newList
    }

    function onFirstLoad() {
        if(props.Event !== undefined){
        const sections = document.querySelectorAll(`[${sectionName}]`);
        handleAddClassToDetails(true)
        handleAddEventListenersToDetails(sections)
    }
    }

    function handleAddClassToDetails(addListener?: boolean) {
        const sections = document.querySelectorAll(`[${sectionName}]`);
        console.log(sections)
        const parentContainer = document.getElementById(ID_CONTAINER_SVG);
        if (sections) {
            sections.forEach(s => {
                const sectionNameAtr = s.getAttribute(sectionName);
                const sectionTypeAtr = s.getAttribute(sectionType);
                if (sectionTypeAtr === rowsType && sectionNameAtr) Array.from(s.children).forEach(child => {
                    const rowNameAtr = child.getAttribute(rowName);
                    if (rowNameAtr) {
                        const listSeats = Array.from(child.children).filter(e => e.tagName === "circle");
                        const listText = Array.from(child.children).filter(e => e.tagName === "text");
                        listSeats.forEach((s, index) => {
                            listText.forEach(t => {
                                //if (isTextInside(t, s)) t.classList.add(style.cursor)
                            })
                            addClassToDetails(s, sectionNameAtr, rowNameAtr, (index + 1))
                        })
                    }
                })

                else if (sectionTypeAtr === tablesType && sectionNameAtr) Array.from(s.children).forEach(child => {
                    const tableNameAtr = child.getAttribute(tableName);
                    if (tableNameAtr) {
                        const isShared = getIsSharedTable(sectionNameAtr);
                        if (isShared) {
                            const listChairs = Array.from(child.children).filter(e => e.tagName === "circle");
                            listChairs.forEach((s, index) => {
                                addClassToDetails(s, sectionNameAtr, tableNameAtr, (index + 1))
                            })
                        } else {
                            const listRect = Array.from(child.children).filter(e => e.tagName === "rect" || e.tagName === "text");
                            listRect.forEach(r => {
                                const listChairs = Array.from(child.children).filter(e => e.tagName === "circle");
                                //listChairs.forEach(chair => chair.classList.add(style.selected))
                                addClassToDetailsTable(r, sectionNameAtr, tableNameAtr, listChairs)
                            })

                        }
                    }
                })

                else if (sectionTypeAtr === objectsType && sectionNameAtr) Array.from(s.children).forEach(child => {
                    if (child.tagName !== "rect") {
                        const objectNameAtr = child.getAttribute(objectName);
                        if (objectNameAtr) addClassToObjectItem(child, sectionNameAtr, objectNameAtr)
                    }
                })
                else if (sectionTypeAtr === openSpaceType && sectionNameAtr) Array.from(s.children).forEach(child => {
                    const openSpaceIsBg = child.getAttribute(isBackground);
                    if (openSpaceIsBg) {
                        addClassToDetailsOpenSpace(child, sectionNameAtr)
                        child.classList.add(style.cursor!)
                    }
                })

            })
        }
    }

    function handleAddEventListenersToDetails(sections: NodeListOf<Element>) {
        sections.forEach((sec) => {
            const sectionTypeAtr = sec.getAttribute(sectionType);
            const sectionNameAtr = sec.getAttribute(sectionName);
            const sectionChildren = Array.from(sec.children);
            if (sectionTypeAtr === rowsType && sectionNameAtr) {
                const listRows = sectionChildren.filter(e => e.getAttribute(rowName));
                listRows.forEach(r => {
                    const rowNameAtr = r.getAttribute(rowName);
                    if (rowNameAtr) {
                        const listRect = Array.from(r.children).filter(e => e.tagName === "circle");
                        const listText = Array.from(r.children).filter(e => e.tagName === "text");
                        listRect.map((s, index) => {
                            if (s.tagName === "circle") {
                                listText.forEach(l => {
                                    if (isTextInside(l, s)) {
                                        l.addEventListener("click", () => handleTicket(sectionNameAtr, rowNameAtr, (index + 1)))
                                    }
                                })
                                s.addEventListener("click", () => handleTicket(sectionNameAtr, rowNameAtr, (index + 1)))
                            }
                        })
                    }
                })
            } 
            else if (sectionTypeAtr === tablesType && sectionNameAtr) {
                const listTables = sectionChildren.filter(e => e.getAttribute(tableName));
                listTables.forEach(r => {
                    const tableNameAtr = r.getAttribute(tableName);
                    if (tableNameAtr) {
                        const isShared = getIsSharedTable(sectionNameAtr);
                        if (isShared) {
                            const listCircles = Array.from(r.children).filter(e => e.tagName === "circle");
                            listCircles.map((s, index) => {
                                s.addEventListener("click", () => handleSpace(sectionNameAtr, tableNameAtr, (index + 1)))
                            })
                        } else {
                            const listRect = Array.from(r.children).filter(e => e.tagName === "text" || e.tagName === "rect");
                            listRect.map((s, index) => {
                                s.addEventListener("click", () => handleTableDetail(sectionNameAtr, tableNameAtr))
                            })
                        }
                    }
                })
            } 
            else if (sectionTypeAtr === objectsType && sectionNameAtr) {
                const listObjects = sectionChildren.filter(e => e.getAttribute(objectName));
                   listObjects.forEach(r => {
                       const objectNameAtr = r.getAttribute(objectName);
                       if (objectNameAtr) {
                           const isObjectDisable = isSectionItemDisable(sectionNameAtr, objectNameAtr);
                           if (!isObjectDisable) {
                               const isShared = getIsSharedObject(sectionNameAtr);
                               r.addEventListener("click", () => handleObject(sectionNameAtr, objectNameAtr, isShared))
                           }
                       }
                   })
            }
            else if (sectionTypeAtr === openSpaceType && sectionNameAtr) {
                sectionChildren.forEach(s => {
                    if (s.getAttribute(isBackground)) {
                        s.addEventListener("click", () => handleOpenSpace(sectionNameAtr))
                    }
                })
                
            }
        })
    }

    function handleOpenSpace(sectionName: string) {
        const findOne = ticketsRef.current.filter(e => e.SectionName === sectionName && e.State);

        if (findOne.length === 0) {
            let isFirst = true;
            const newList = ticketsRef.current.map(e => {
                if (e.SectionName === sectionName && !e.State && isFirst) {
                    isFirst = false;
                    return {...e, State: true}
                } else return {...e}
            })
            setTickets(newList)
        } else {
            const newList = ticketsRef.current.map(e => {
                if (e.SectionName === sectionName) return {...e, State: false}
                else
                    return {...e, State: false}
            })
            setTickets(newList)
        }
    }

    function isSectionItemDisable(secName: string, itemName: string) {
        let isSecDisable = false;
        const findSection = areaSelected.Sections.find(s => s.Id === secName)
        if (findSection) {
            const castSection = findSection as ObjectSection;
            //const findItem = castSection.DisableAndReservedSeat?.find(o => o.Row === itemName);
            const findItem = undefined;
            if (findItem) isSecDisable = true
        }
        return isSecDisable
    }

    function handleObject(sN: string, o: string, isShared: boolean) {
        const findOne = ticketsRef.current.filter(e => e.SectionName === sN && e.File === o && e.State);
        if (findOne.length === 0) {
            if (isShared) {
                let isFirst = numberTicketsRef.current;
                const newList = ticketsRef.current.map(e => {
                    if (e.SectionName === sN && e.File === o && !e.State && isFirst > 0) {
                        isFirst -= 1;
                        return {...e, State: true}
                    } else return {...e}
                })
                setTickets(newList)
            } else {
                const findMinimum = findMinimumObject(sN, o);
                if (findMinimum === undefined) {
                    let isFirst = numberTicketsRef.current;
                    const newList = ticketsRef.current.map(e => {
                        if (e.SectionName === sN && e.File === o && isFirst > 0) {
                            isFirst -= 1;
                            return {...e, State: !e.State}
                        } else return {...e}
                    })
                    setTickets(newList)
                } else {
                    if (numberTicketsRef.current < findMinimum) {
                    } else {
                        let isFirst = numberTicketsRef.current;
                        const newList = ticketsRef.current.map(e => {
                            if (e.SectionName === sN && e.File === o && isFirst > 0) {
                                isFirst -= 1;
                                return {...e, State: !e.State}
                            } else return {...e}
                        })
                        setTickets(newList)
                    }
                }
            }
        } else {
            const newList = ticketsRef.current.map(e => {
                if (e.SectionName === sN && e.File === o) return {...e, State: false}
                else return {...e}
            })
            setTickets(newList)
        }
    }

    function getIsSharedObject(name: string) {
        let isShared = false;
        props.Layout.Areas.forEach(a => {
            a.Sections.forEach(s => {
                if (s.Name === name && s.Type === EnumTypeSection.Object) {
                    const table = s as ObjectSection;
                    isShared = table.IsShared ? table.IsShared : false
                }
            })
        })
        return isShared
    }

    function findMinimumObject(sN: string, obj: string): number | undefined {
        const section = areaSelected.Sections.find(e => e.Name === sN && e.Type === EnumTypeSection.Object);
        if (section) {
            const castSection = section as ObjectSection;
            const findObj = castSection.Objects.find(e => e.Object === obj);
            if (findObj) {
                return findObj.Min
            } else return undefined
        } else return undefined
    }


    function getIsSharedTable(name: string) {
        let isShared = false;
        props.Layout.Areas.forEach(a => {
            a.Sections.forEach(s => {
                if (s.Name === name && s.Type === EnumTypeSection.Table) {
                    const table = s as TableSection;
                    isShared = table.IsShared ? table.IsShared : false
                }
            })
        })
        return isShared
    }

    function handleTableDetail(sN: string, t: string) {
        const findSelected = ticketsRef.current.filter(e => e.SectionName === sN && e.File === t && e.State);

        if (findSelected.length === 0) {
            const findMinimum = findMinimumTable(sN, t);
            if (findMinimum === undefined) {
                getNewListTickets(sN, t)
            } else {
                if (numberTicketsRef.current < findMinimum) {

                } else getNewListTickets(sN, t)
            }

        } else {
            const newList = ticketsRef.current.map(e => {
                if (e.SectionName === sN && e.File === t) return {...e, State: false}
                else return {...e}
            })
            setTickets(newList)
        }
    }

    function findMinimumTable(sN: string, table: string): number | undefined {
        const section = areaSelected.Sections.find(e => e.Name === sN && e.Type === EnumTypeSection.Table);
        if (section) {
            const castSection = section as TableSection;
            const findTable = castSection.Tables.find(e => e.Table === table);
            if (findTable) {
                return findTable.Min
            } else return undefined
        } else return undefined
    }

    function getNewListTickets(sN: string, sel?: string | undefined) {
        if (sel !== undefined) {
            let control = numberTicketsRef.current;
            const newList = ticketsRef.current.map(e => {
                if (e.SectionName === sN && e.File === sel && control > 0) {
                    control -= 1;
                    return {...e, State: true}
                } else return {...e}
            })
            setTickets(newList)
        } else {
            let control = numberTicketsRef.current;
            const newList = ticketsRef.current.map(e => {
                if (e.SectionName === sN && control > 0) {
                    control -= 1;
                    return {...e, State: true}
                } else return {...e}
            })
            setTickets(newList)
        }
    }


    function handleSpace(sectionName: string, name: string, space: number) {
        const newList = ticketsRef.current.map(i => {
            if (i.SectionName === sectionName && i.File === name && i.Seat === space) return {...i, State: !i.State}
            else return {...i}
        })
        setTickets(newList)
    }

    function addClassToDetails(e: Element, section: string, name: string, space: number) {
        const isPublic = true;
        if (isPublic) {
            const findState = ticketsRef.current.find(z => (z.SectionName === section && z.File === name && z.Seat === space));
            if (findState && findState.StateSeat === EnumStateSeat.Available) {
                if (findState.State) {
                    e.classList.remove(style.availableResale!, style.disable!, style.reserved!, style.available!)
                    e.classList.add(style.selected!)
                } else {
                    if (findState.Type === EnumTypeTicket.Standard) {
                        e.classList.remove(style.availableResale!, style.disable!, style.reserved!, style.selected!)
                        e.classList.add(style.available!)
                    } else {
                        e.classList.remove(style.available!, style.disable!, style.reserved!, style.selected!)
                        e.classList.add(style.availableResale!)
                    }
                }
            } else if (findState && findState.StateSeat === EnumStateSeat.Reserved) {
                e.classList.remove(style.availableResale!, style.disable!, style.available!, style.selected!)
                e.classList.add(style.reserved!)
            } else {
                e.classList.remove(style.availableResale!, style.available!, style.reserved!, style.selected!)
                e.classList.add(style.disable!)
            }
        } else {
            e.classList.remove(style.availableResale!, style.reserved!, style.selected!, style.disable!)
            e.classList.add(style.available!)
        }
    }

    function addClassToObjectItem(el: Element, section: string, name: string) {
        const findItemsObject = ticketsRef.current.filter(e => e.SectionName === section && e.File === name);
        const isOneDisable = findItemsObject.filter(e => e.StateSeat === EnumStateSeat.Disable);
        if (isOneDisable.length >= 1) updateElementClasses(el, style.disable!);
        else {
            const findItemsSelected = ticketsRef.current.filter(e => e.SectionName === section && e.File === name && e.State);
            if (findItemsSelected.length >= 1) updateElementClasses(el, style.selected!);
            else updateElementClasses(el, style.available!);
            el.classList.add(style.cursor!);
        }
    }

    function addClassToDetailsOpenSpace(e: Element, section: string) {
        const findItemsObject = ticketsRef.current.filter(e => e.SectionName === section && e.State);
        if (findItemsObject.length >= 1) {
            e.classList.remove(style.availableResale!, style.disable!, style.reserved!, style.available!)
            e.classList.add(style.selected!)
        } else e.classList.remove(style.availableResale!, style.disable!, style.reserved!, style.selected!, style.available!)
    }
    
    function addClassToDetailsTable(e: Element, section: string, name: string, listChair: any[]) {
        const findItemsObject = ticketsRef.current.filter(e => e.SectionName === section && e.File === name && e.State);
        if (e.tagName === "text") e.classList.add(style.cursor!)
        else {
            if (findItemsObject.length >= 1) {
                listChair.forEach(c => {
                    c.classList.remove(style.availableResale, style.disable, style.reserved, style.available)
                    c.classList.add(style.selected)
                })
                e.classList.remove(style.availableResale!, style.disable!, style.reserved!, style.available!)
                e.classList.add(style.selected!)
            } else {
                listChair.forEach(c => {
                    c.classList.remove(style.availableResale, style.disable, style.reserved, style.selected)
                    c.classList.add(style.available)
                })
                e.classList.remove(style.availableResale!, style.disable!, style.reserved!, style.selected!)
                e.classList.add(style.available!)
            }
        }
    }


    function isTextInside(tElement: Element, bElement: Element) {
        const bD = bElement.getBoundingClientRect();
        const tD = tElement.getBoundingClientRect();
        return (tD.top >= bD.top && tD.bottom <= bD.bottom && tD.left >= bD.left && tD.right <= bD.right)
    }

    function handleTicket(sectionName: string, name: string, space: number) {
        const newList = ticketsRef.current.map(i => {
            if (i.SectionName === sectionName && i.File === name && i.Seat === space) return {...i, State: !i.State}
            else return {...i}
        })
        setTickets(newList)
    }

    function updateElementClasses(el: Element, mainClass: string) {
        Array.from(el.children).forEach(c => {
            if (c.tagName !== "text") {
                const classesToRemove = [style.availableResale, style.disable, style.reserved, style.selected, style.available];
                classesToRemove.forEach(cls => c.classList.remove(cls!));
                c.classList.add(mainClass);
            } else {
                c.classList.add(style.colorText!)
                /*c.classList.remove(style.colorText);
                if (mainClass === style.disable) c.classList.add(style.colorText);*/
            }
        });
    }
}