
import {HeaderMobile, IHeaderMobile} from "@repo/ui/headerDesktop";
import {NavTabsMobile, NavTabsProps} from "@repo/ui/navTabs";
import { TABS_ENCLOSURE } from "../const";
import { SpinLoading } from "@repo/ui/misc";
import {ScrollMutationContainerMobile, IScrollMutationContainerMobile} from "@repo/ui/scrollContainerMobile";
import { CSSProperties, useState } from "react";
import dynamic from "next/dynamic";
import style from "./style.module.css";

const DynamicPrincipal = dynamic(() => import('./principal'), {loading: () => <SpinLoading/>});
const DynamicEvents = dynamic(() => import('./events/events'), {loading: () => <SpinLoading/>});
const DynamicBlueprints = dynamic(() => import('./blueprints/blueprints'), {loading: () => <SpinLoading/>});

export default function Main(){
     const [Position, setPosition] = useState<number>(0);
    const header: IHeaderMobile = {
        Title: "Editar Recinto",
        Description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    };
    const navTabsProps: NavTabsProps[] = [
      {
        Name: TABS_ENCLOSURE.Main.Name,
        Position: TABS_ENCLOSURE.Main.Position,
        State: Position === TABS_ENCLOSURE.Main.Position,
        IsAvailable: true,
        Id: TABS_ENCLOSURE.Main.Id,
      },
      {
        Name: TABS_ENCLOSURE.Events.Name,
        Position: TABS_ENCLOSURE.Events.Position,
        State: Position === TABS_ENCLOSURE.Events.Position,
        IsAvailable: true,
        Id: TABS_ENCLOSURE.Events.Id,
      },
      {
        Name: TABS_ENCLOSURE.Blueprints.Name,
        Position: TABS_ENCLOSURE.Blueprints.Position,
        State: Position === TABS_ENCLOSURE.Blueprints.Position,
        IsAvailable: true,
        Id: TABS_ENCLOSURE.Blueprints.Id,
      },
    ];
    const scrollContainerProps: IScrollMutationContainerMobile = {
      Dependency: Position,
      OnApply: ()=>{},
      OnReturn: ()=>{},
      Style: style.grid
    };
    const s: CSSProperties = {
      display: "grid",
      gridTemplateRows: "max-content max-content 1fr",
      width: "100%",
      height: "100%",
      overflow: "hidden"
    };

    return (
      <div style={s}>
        <HeaderMobile props={header} />
        <NavTabsMobile item={navTabsProps} onClick={handlePosition} />
        <ScrollMutationContainerMobile props={scrollContainerProps}>
           {Position === TABS_ENCLOSURE.Main.Position && <DynamicPrincipal />}
           {Position === TABS_ENCLOSURE.Events.Position && <DynamicEvents />}
           {Position === TABS_ENCLOSURE.Blueprints.Position && <DynamicBlueprints />}
        </ScrollMutationContainerMobile>

      </div>
    );

     function handlePosition(num: number) {
       setPosition(num);
     }
}