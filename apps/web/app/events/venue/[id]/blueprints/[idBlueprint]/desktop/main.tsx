'use client'
import {MainContainerDesktop, IMainContainerDesktop, EnumMainContainerDesktop} from "@repo/ui/mainContainer";
import {HeaderDesktop, IHeaderDesktop} from "@repo/ui/headerDesktop";
import {NavTabs, NavTabsProps} from "@repo/ui/navTabs";
import {useBlueprintContext} from "../provider";
import {TABS_BLUEPRINT} from "../const";
import dynamic from "next/dynamic";
import { SpinLoading } from "@repo/ui/misc";

const LazyPreview = dynamic(() => import("./preview/preview"), {loading: SpinLoading});
const LazyPrincipal = dynamic(() => import("./principal/principal"), {loading: SpinLoading});


export default function Main(){
    const {PositionHandler, IdVenue} = useBlueprintContext();
    const containerProps: IMainContainerDesktop = {Type: EnumMainContainerDesktop.Use3};
    const headerProps: IHeaderDesktop = {
        Title: "Edicion de plano",
        OnClose: ()=>{},
        LinkToReturn: `/events/venue/${IdVenue}`,
        Description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        Button: {
        OnClick: () => {},
        Text: "Aplicar Cambios"
        }
    };
    const navTabsProps: NavTabsProps[] = [
        {
          Name: TABS_BLUEPRINT.Main.Name,
          Position: TABS_BLUEPRINT.Main.Position,
          State: PositionHandler.Position === TABS_BLUEPRINT.Main.Position,
          IsAvailable: true,
          Id: TABS_BLUEPRINT.Main.Id,
        },
        {
          Name: TABS_BLUEPRINT.Preview.Name,
          Position: TABS_BLUEPRINT.Preview.Position,
          State: PositionHandler.Position === TABS_BLUEPRINT.Preview.Position,
          IsAvailable: true,
          Id: TABS_BLUEPRINT.Preview.Id,
        }
    ];

    return(
        <MainContainerDesktop props={containerProps}>
            <HeaderDesktop props={headerProps} />
            <NavTabs item={navTabsProps} onClick={PositionHandler.HandlePosition}/>
            {PositionHandler.Position === TABS_BLUEPRINT.Main.Position && <LazyPrincipal/> }
            {PositionHandler.Position === TABS_BLUEPRINT.Preview.Position && <LazyPreview/> }
        </MainContainerDesktop>
    )
}