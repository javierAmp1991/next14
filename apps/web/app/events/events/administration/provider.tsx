import {createContext, ReactNode, useContext, useState} from "react";
import {EventsRowTable} from "./props";
import {DEFAULT_EVENTS_TABLE} from "./data";
import {LIST_HEADER_TABLE, INITIAL_POSITION_MUTATION} from "../const";
import {addInitialPositionTabs} from "@repo/ui/navTabs";
import {IUseSearch,  useSearch} from "@repo/ui/searchBar";

export interface IEventsProvider {
    Events: EventsRowTable[]
    HandleCloseMutation: ()=>void
    HandleLocationMutation: (index: number, id?: string)=>void
    IsTableReady: boolean
    ShowIncome: boolean
    HandleShowIncome: (action: boolean) => void
    HandleOpenMutation: ()=>void
    Search: IUseSearch
    Filters: any[]
}

// @ts-ignore
export const EventsContext = createContext<IEventsProvider>(null);

export function useMainContext() {
    const provider = useContext(EventsContext);
    if (!provider) throw new Error("")
    else return provider
}

export const EventsProvider = ({children}: { children: ReactNode }) => {
    const ListFilterColumn = [
        {Name: LIST_HEADER_TABLE.Name},
        {Name: LIST_HEADER_TABLE.Rating},
        {Name: LIST_HEADER_TABLE.Dates},
        {Name: LIST_HEADER_TABLE.From},
        {Name: LIST_HEADER_TABLE.To},
        {Name: LIST_HEADER_TABLE.Income},
        {Name: LIST_HEADER_TABLE.Edit}
    ];
    const [events, setEvents] = useState<EventsRowTable[]>(DEFAULT_EVENTS_TABLE);
    const [isTableReady, setIsTableReady] = useState(true);
    const [showIncome, setShowIncome] = useState(false);
    const searchProps = useSearch(onSearch, onDeleteSearch);

    const provider: IEventsProvider = {
        Events: events,
        IsTableReady: isTableReady,
        ShowIncome: showIncome,
        HandleShowIncome: handleShowIncome,
        HandleCloseMutation: handleCloseMutation,
        HandleOpenMutation: handleOpenMutation,
        HandleLocationMutation: handleLocationMutation,
        Search: searchProps,
        Filters: ListFilterColumn
    }

    return (
        <EventsContext.Provider value={provider}>
            {children}
        </EventsContext.Provider>
    )

    function handleOpenMutation(id?: string, position?: number) {
        if (position) addInitialPositionTabs(INITIAL_POSITION_MUTATION, position);
        //if (id) push(`/events/events/${id}`).then()
        //else push(`/events/events/create-venue`).then()
    }

    function handleCloseMutation() {
    }

    function handleLocationMutation(index: number, id?: string) {
    }

    function onSearch() {

    }

    function onDeleteSearch() {

    }

    function handleShowIncome(action: boolean){
        setShowIncome(action)
    }

}