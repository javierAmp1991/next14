import { CSSProperties } from "react";
import {HeaderMobile, IHeaderMobile} from "@repo/ui/headerDesktop";
import Table from "./table";
import {ISearchBar, IUseSearch, SearchBarMobile, useSearch} from "@repo/ui/searchBar";

export default function Main(){
    const headerProps: IHeaderMobile = {
      Title: "Administracion de recintos",
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    };
    const s: CSSProperties = {
        width: "100%", height: "100%", overflow: "hidden", gridTemplateRows: "max-content max-content 1fr", display: "grid"
    };
    const searchBarProps: ISearchBar = {
      Name: "searchVenue",
      Placeholder: "Buscar por nombre o direccion",
    };
    const searchProps = useSearch(onSearch, onDeleteSearch);
    
    return(
        <div style={s}>
            <HeaderMobile props={headerProps}/>
            <SearchBarMobile props={searchProps} searchBarProps={searchBarProps}/>
            <Table/>
        </div>
    )

    function onCreateNew() {}
    function onSearch() {}
    function onDeleteSearch() {}
}