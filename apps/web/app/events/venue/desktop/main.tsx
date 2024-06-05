"use client";
import {  MainContainerDesktop,  IMainContainerDesktop,  EnumMainContainerDesktop} from "@repo/ui/mainContainer";
import { HeaderDesktop, IHeaderDesktop } from "@repo/ui/headerDesktop";
import { CSSProperties } from "react";
import { VenueTable } from "./table";
import { useVenueProvider } from "../provider";
import {SEARCHBAR_PROPS, TITLE, DESCRIPTION} from "../const";
import {  SearchBar,  SearchBarGrid} from "@repo/ui/searchBar";
import {ADD_NEW_O} from "@repo/ui/const";

export default function Page() {
  const { HandleMutation, Search } = useVenueProvider();
  const containerProps: IMainContainerDesktop = {
    Type: EnumMainContainerDesktop.Use3,
  };
  const headerProps: IHeaderDesktop = {
    Title: TITLE,
    Description: DESCRIPTION,
    Button: { Text: ADD_NEW_O, OnClick: onCreateNew },
  };
  const s: CSSProperties = {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  };
  return (
    <MainContainerDesktop props={containerProps}>
      <HeaderDesktop props={headerProps} />
      <SearchBarGrid>
        <SearchBar props={Search} searchBarProps={SEARCHBAR_PROPS} />
      </SearchBarGrid>
      <div style={s}>
        <VenueTable />
      </div>
    </MainContainerDesktop>
  );

  function onCreateNew() {
    HandleMutation();
  }
}
