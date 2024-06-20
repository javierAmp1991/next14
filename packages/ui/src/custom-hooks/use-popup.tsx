import {useState} from "react";

export interface IUsePopUpHook {
    State: boolean
    HandleToggle: Function
    HandleTrue: Function
    HandleFalse: Function
}

export function usePopUpHook(initialState?: boolean): IUsePopUpHook {
    let [display, setDisplay] = useState<boolean>(!!initialState)
    const handleToggle = () => setDisplay(!display)
    const handleTrue = () => setDisplay(true)
    const handleFalse = () => setDisplay(false)

    const displayHookProps: IUsePopUpHook = {
        State: display,
        HandleToggle: handleToggle,
        HandleTrue: handleTrue,
        HandleFalse: handleFalse
    }
    return (displayHookProps)
}
