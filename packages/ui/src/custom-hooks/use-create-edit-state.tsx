import {useState} from "react";

export interface ICreateEditState {
    IsSuccess: boolean
    IsAvailable: boolean
    IsEdit: boolean
}

const defaultCreateEditState: ICreateEditState = {
    IsAvailable: false,
    IsSuccess: false,
    IsEdit: false
};

export enum EnumCreateEdit{
    Create, Edit, Error
}

export interface ICreateEditReturn{
    CreateEdit: ICreateEditState
    HandleCreateEdit: (action: EnumCreateEdit)=>void
}

export function useCreateEditHook() {
    const [createEdit, setCreateEdit] = useState<ICreateEditState>(defaultCreateEditState);

    function handleState(action: EnumCreateEdit){
       if(action === EnumCreateEdit.Create) setCreateEdit({IsAvailable: true, IsEdit: false, IsSuccess: true})
       else if (action === EnumCreateEdit.Edit) setCreateEdit({IsAvailable: true, IsEdit: true, IsSuccess: true})
       else if(action === EnumCreateEdit.Error) setCreateEdit({IsAvailable: false, IsEdit: false, IsSuccess: true})
    }

    const r: ICreateEditReturn = {
        CreateEdit: createEdit, HandleCreateEdit: handleState
    }

    return r
}