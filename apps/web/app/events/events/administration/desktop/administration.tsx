import { MainContainerDesktop,  IMainContainerDesktop,  EnumMainContainerDesktop} from "@repo/ui/mainContainer";
import { HeaderDesktop, IHeaderDesktop } from "@repo/ui/headerDesktop";
import Table from "./table";
import {TITLE_SECTION, DESCRIPTION_SECTION, SEARCHBAR_PROPS} from "../../const";
import {ADD_NEW_O} from "@repo/ui/const";
import {useMainContext} from "../provider";
import {SearchBarGrid, SearchBar} from "@repo/ui/searchBar";
import css from "./administration.module.css";
import Image from "next/image";
import {LOCK_ICON_CIRCLE_BLUE, UNLOCK_ICON_CIRCLE_BLUE} from "@repo/ui/localIcons";

export default function Administration() {
    const {Search, HandleShowIncome, ShowIncome} = useMainContext();
    const containerProps: IMainContainerDesktop = {
        Type: EnumMainContainerDesktop.Use3,
    };
      const headerDesktop: IHeaderDesktop = {
        Title: TITLE_SECTION,
        Description: DESCRIPTION_SECTION,
        Button: {Text: ADD_NEW_O, OnClick:handleCreate }
    };
    const title = ShowIncome ? "Ocultar ingresos" : "Mostrar ingresos";

    return (
        <MainContainerDesktop props={containerProps}>
            <HeaderDesktop props={headerDesktop} />
            <SearchBarGrid>
               <SearchBar props={Search} searchBarProps={SEARCHBAR_PROPS} />
            </SearchBarGrid>
            <Table/>
        </MainContainerDesktop>
    )

    function handleCreate(){

    }

    function handleSwitch() {
        HandleShowIncome(!ShowIncome)
    }
}