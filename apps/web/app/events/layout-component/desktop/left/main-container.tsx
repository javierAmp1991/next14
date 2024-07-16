import {ReactNode} from "react";
import {IDropDownContainer, DropDownContainer} from "@repo/ui/misc";
import style from "./style.module.css";

export type IMainContainer = {
    Title: string,
    IsActive?: boolean | undefined, 
    InitialState?: boolean | undefined
}

export const MainContainer = ({children, props}: {children: ReactNode, props: IMainContainer }) => {
    const {Title, InitialState, IsActive} = props;
    const dropProps: IDropDownContainer = {
        Title: Title,
        UseSpaceArrow: true,
        InitialState: InitialState !== undefined ? InitialState : true,
        IsActive: IsActive !== undefined ? IsActive : true,
        UseChildrenGrid: true
    };
    return (
        <div className={style.padding}>
            <DropDownContainer props={dropProps}>
                {children}
            </DropDownContainer>
        </div>
    )
}