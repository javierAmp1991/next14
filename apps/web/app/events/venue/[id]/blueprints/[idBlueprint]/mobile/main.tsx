'use client'
import {DefaulContainerMobile} from "@repo/ui/mutationContainers";
import {HeaderMobile, IHeaderMobile} from "@repo/ui/headerDesktop";
import {IScrollMutationContainerMobile, ScrollMutationContainerMobile} from "@repo/ui/scrollContainerMobile";
import {NavTabsMobile, NavTabsProps} from "@repo/ui/navTabs";
import {useBlueprintContext} from "../provider";
import {TABS_BLUEPRINT} from "../const";
import dynamic from "next/dynamic";
import { SpinLoading } from "@repo/ui/misc";

const LazyPreview = dynamic(() => import("./preview/preview"), {loading: SpinLoading});
const LazyPrincipal = dynamic(() => import("./principal/principal"), {loading: SpinLoading});


export default function Main(){
    const {PositionHandler} = useBlueprintContext();
    const {Position} = PositionHandler;
    const headerProps: IHeaderMobile = {
        Title: "Edicion de plano",
        Description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
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
    const scrollCont: IScrollMutationContainerMobile = {
        Dependency: Position,
        UseDefaultGrid: Position === TABS_BLUEPRINT.Main.Position,
        Buttons: [
            {
                Name: "Aplicar cambios",
                OnClick: handleApplyChanges,
                Position: TABS_BLUEPRINT.Main.Position
            },
            {
                Name: "Crear nueva area",
                OnClick: handleCreateArea,
                Position: TABS_BLUEPRINT.Preview.Position
            }
        ],
        OverFlowHidden: Position === TABS_BLUEPRINT.Preview.Position
    };

    return(
        <DefaulContainerMobile>
            <HeaderMobile props={headerProps} />
            <NavTabsMobile item={navTabsProps} onClick={PositionHandler.HandlePosition}/>
            <ScrollMutationContainerMobile props={scrollCont}>
                {PositionHandler.Position === TABS_BLUEPRINT.Main.Position && <LazyPrincipal/> }
                {PositionHandler.Position === TABS_BLUEPRINT.Preview.Position && <LazyPreview/> }
            </ScrollMutationContainerMobile>
        </DefaulContainerMobile>
    )

    function handleApplyChanges(){
        prompt("alicar cambios")
    }

    function handleCreateArea(){
        prompt("crear area")
    }
}