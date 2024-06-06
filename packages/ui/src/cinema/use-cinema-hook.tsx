import {useState} from "react";
import {Resource} from "../upload-resources";
import {CinemaModeProps} from "./cinema-mode-props";

export interface IUseCinemaHookReturn{
    CinemaProps: CinemaModeProps
    HandleShowCinema: (l: Resource[], r?: string)=>void
    HandleCloseCinema: ()=>void
    CinemaState: boolean
}

export function UseCinemaHook(name: string){
    const [listResource, setListResource] = useState<Resource[]>([]);
    const [resourceSelected, setResourceSelected] = useState<Resource | undefined>(undefined);
    const [cinema, setCinema] = useState(false);

    function handleShowCinema(l: Resource[], id?: string){
     const findSelected = l.find(i=>i.Id === id);
     setListResource(l)
     setResourceSelected(findSelected)
     setCinema(true)
    }

    function handleCloseCinema(){
        setListResource([])
        setResourceSelected(undefined)
        setCinema(false)
    }

    const cinemaHookReturn: IUseCinemaHookReturn = {
        CinemaState: cinema,
        CinemaProps: {
            Resources: listResource,
            ResourceSelected: resourceSelected,
            Name: name
        },
        HandleShowCinema: handleShowCinema,
        HandleCloseCinema: handleCloseCinema
    };

    return cinemaHookReturn
}