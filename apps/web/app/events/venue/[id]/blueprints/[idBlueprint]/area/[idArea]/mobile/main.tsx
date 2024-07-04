'use client'
import {HeaderMobile, IHeaderMobile} from "@repo/ui/headerDesktop";
import {NavTabsProps, NavTabsMobile,} from "@repo/ui/navTabs";
import {useAreaContext} from "../provider";
import {TABS_AREA} from "../../const";
import {DefaulContainerMobile, } from "@repo/ui/mutationContainers";
import { DesplegableContainer, SpinLoading } from "@repo/ui/misc";
import {
  ScrollMutationContainerMobile,
  IScrollMutationContainerMobile
} from "@repo/ui/scrollContainerMobile";
import dynamic from "next/dynamic";
import CreateSection from "./sections/create-section/create-section";
import EditSection from "./sections/edit-section/edit-section";
import { useState } from "react";

const LazyPrincipal = dynamic(()=>import("./principal/principal"), {loading: SpinLoading});
const LazyReference = dynamic(()=>import("./references/images"), {loading: SpinLoading});
const LazySections = dynamic(()=>import("./sections/sections"), {loading: SpinLoading});

export default function Main(){
    const {PositionHandler, SectionForEdit} = useAreaContext();
    const [showCreate, setShowCreate] = useState(false);
    const showEdit = SectionForEdit !== undefined;
    const {Position} = PositionHandler;
    const cont: IScrollMutationContainerMobile = {
      Dependency: Position,
      UseDefaultGrid: Position !== TABS_AREA.Images.Position,
      Buttons: [
        {
            Name: "Aplicar cambios",
            OnClick: handleApplyChanges,
            Position: TABS_AREA.Main.Position
        },
        {
            Name: "Crear nueva seccion",
            OnClick: handleCreateSection,
            Position: TABS_AREA.Sections.Position
        }
    ]
    };
    const headerProps: IHeaderMobile = {
        Title: "Edicion de area",
        Description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
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
        <DefaulContainerMobile>
            <HeaderMobile props={headerProps} />
            <NavTabsMobile item={navTabsProps} onClick={PositionHandler.HandlePosition}/>
            <ScrollMutationContainerMobile props={cont}>
                {PositionHandler.Position === TABS_AREA.Main.Position && <LazyPrincipal/>}
                {PositionHandler.Position === TABS_AREA.Images.Position && <LazyReference/>}
                {PositionHandler.Position === TABS_AREA.Sections.Position && <LazySections displayCreate={handleCreateSection}/>}
                {PositionHandler.Position === TABS_AREA.Preview.Position && <div>preview</div>}
            </ScrollMutationContainerMobile>
            <DesplegableContainer s={showCreate}>
              <CreateSection onReturn={handleReturn}/>
            </DesplegableContainer>
            <DesplegableContainer s={showEdit}>
              <EditSection/>
            </DesplegableContainer>
        </DefaulContainerMobile>
    )

    function handleReturn(){
      setShowCreate(false)
    }

    function handleCreateSection(){
      setShowCreate(true)
    }

    function handleApplyChanges(){

    }
}