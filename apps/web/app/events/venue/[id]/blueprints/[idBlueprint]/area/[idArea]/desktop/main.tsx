'use client'
import {MainContainerDesktop, IMainContainerDesktop, EnumMainContainerDesktop} from "@repo/ui/mainContainer";
import {HeaderDesktop, IHeaderDesktop} from "@repo/ui/headerDesktop";
import {NavTabs, NavTabsProps} from "@repo/ui/navTabs";
import {useAreaContext} from "../provider";
import {TABS_AREA} from "../../const";
import dynamic from "next/dynamic";
import { SpinLoading } from "@repo/ui/misc";

const LazyPrincipal = dynamic(()=>import("./principal/principal"), {loading: SpinLoading});
const LazyReference = dynamic(()=>import("./references/images"), {loading: SpinLoading});
const LazySections = dynamic(()=>import("./sections/sections"), {loading: SpinLoading});

export default function Main(){
    const {PositionHandler, IdVenue, IdBlueprint} = useAreaContext();
    const containerProps: IMainContainerDesktop = {Type: EnumMainContainerDesktop.Use3};
    const headerProps: IHeaderDesktop = {
        Title: "Edicion de area",
        OnClose: ()=>{},
        LinkToReturn: `/events/venue/${IdVenue}/blueprints${IdBlueprint}`,
        Description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        Button: {
        OnClick: () => {},
        Text: "Aplicar Cambios"
        }
    };
    const navTabsProps: NavTabsProps[] = [
        {
          Name: TABS_AREA.Main.Name,
          Position: TABS_AREA.Main.Position,
          State: PositionHandler.Position === TABS_AREA.Main.Position,
          IsAvailable: true,
          Id: TABS_AREA.Main.Id,
        },
        {
          Name: TABS_AREA.Images.Name,
          Position: TABS_AREA.Images.Position,
          State: PositionHandler.Position === TABS_AREA.Images.Position,
          IsAvailable: true,
          Id: TABS_AREA.Images.Id,
        },
        {
          Name: TABS_AREA.Sections.Name,
          Position: TABS_AREA.Sections.Position,
          State: PositionHandler.Position === TABS_AREA.Sections.Position,
          IsAvailable: true,
          Id: TABS_AREA.Sections.Id,
        },
        {
          Name: TABS_AREA.Preview.Name,
          Position: TABS_AREA.Preview.Position,
          State: PositionHandler.Position === TABS_AREA.Preview.Position,
          IsAvailable: true,
          Id: TABS_AREA.Preview.Id,
        }
    ];

    return(
        <MainContainerDesktop props={containerProps}>
            <HeaderDesktop props={headerProps} />
            <NavTabs item={navTabsProps} onClick={PositionHandler.HandlePosition}/>
            {PositionHandler.Position === TABS_AREA.Main.Position && <LazyPrincipal/>}
            {PositionHandler.Position === TABS_AREA.Images.Position && <LazyReference/>}
            {PositionHandler.Position === TABS_AREA.Sections.Position && <LazySections/>}
            {PositionHandler.Position === TABS_AREA.Preview.Position && <div>preview</div>}
        </MainContainerDesktop>
    )
}