'use client'
import React, {createContext, useContext, ReactNode} from "react";
import {WindowDimensionProps} from "./window-dimention-props";
import {useWindowDimensions} from "./use-window-dimension";

// @ts-ignore
export const WindowDimensionContext = createContext<WindowDimensionProps>(null);

export function useWindowDimensionProvider() {
    const provider = useContext(WindowDimensionContext)
    if (!provider) throw new Error("erro")
    else return provider
}

export const WindowDimensionProvider = ({children}: { children: React.ReactNode }) => {
    const dimension: WindowDimensionProps = useWindowDimensions();

    return <WindowDimensionContext.Provider value={dimension}>{children}</WindowDimensionContext.Provider>
}