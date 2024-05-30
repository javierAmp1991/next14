'use client'
import {MainContainerDesktop, IMainContainerDesktop, EnumMainContainerDesktop} from "@repo/ui/mainContainer";
import {HeaderDesktop, IHeaderDesktop} from "@repo/ui/headerDesktop";
import {ISearchBar, SearchBar, useSearch, SearchBarGrid} from "@repo/ui/searchBar";
import { CSSProperties } from "react";
import {VenueTable} from "./table";

export default function Page(){
    const containerProps: IMainContainerDesktop = {Type: EnumMainContainerDesktop.Use3};
    const headerProps: IHeaderDesktop = {
      Title: "Administracion de recintos",
      Description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      Button: {Text: "Crear nuevo",OnClick: onCreateNew}

    };
    const searchBarProps: ISearchBar = {
      Name: "searchVenue",Placeholder: "Buscar por nombre o direccion",
    };
    const searchProps = useSearch(onSearch, onDeleteSearch)
    const s: CSSProperties = {
        width: "100%",
        height: "100%",
        overflow: "hidden"
    };
    return (
      <MainContainerDesktop props={containerProps}>
        <HeaderDesktop props={headerProps} />
        <SearchBarGrid><SearchBar props={searchProps} searchBarProps={searchBarProps} /></SearchBarGrid>
        <div style={s}><VenueTable /></div>
      </MainContainerDesktop>
    );
    function onCreateNew(){}

    function onSearch(){}

    function onDeleteSearch(){}
}