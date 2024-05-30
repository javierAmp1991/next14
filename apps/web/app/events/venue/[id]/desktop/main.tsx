import {useVenueContext} from "../provider";
import {MainContainerDesktop, IMainContainerDesktop, EnumMainContainerDesktop} from "@repo/ui/mainContainer";
import {HeaderDesktop, IHeaderDesktop} from "@repo/ui/headerDesktop";
import {NavTabs, NavTabsProps} from "@repo/ui/navTabs";
import {SpinLoading} from "@repo/ui/misc";
import { useState } from "react";
import dynamic from 'next/dynamic';
import {TABS_ENCLOSURE} from "../const";

const DynamicPrincipal = dynamic(() => import('./principal'), {loading: () => <SpinLoading/>});
const DynamicResources = dynamic(() => import('./resources/resources'), {loading: () => <SpinLoading/>});
const DynamicEvents = dynamic(() => import('./events/events'), {loading: () => <SpinLoading/>});
const DynamicBlueprints = dynamic(() => import('./blueprints/blueprints'), {loading: () => <SpinLoading/>});


export default function Main (){
    const {Venue} = useVenueContext();
    const [Position, setPosition] = useState<number>(0);
    const containerProps: IMainContainerDesktop = {Type: EnumMainContainerDesktop.Use3};
    const headerProps: IHeaderDesktop = {
      Title: "Edicion de recinto",
      OnClose: ()=>{},
      LinkToReturn: "/events/venue",
      Description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      Button: {
      OnClick: () => {},
      Text: "Aplicar Cambios"
      }
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
            }
    ];

    return (
      <MainContainerDesktop props={containerProps}>
        <HeaderDesktop props={headerProps} />
        <NavTabs item={navTabsProps} onClick={handlePosition} />
          {Position === TABS_ENCLOSURE.Main.Position && <DynamicPrincipal/>} 
          {/* {Position === TABS_ENCLOSURE.Images.Position && <DynamicResources/>} */}
          {Position === TABS_ENCLOSURE.Events.Position && <DynamicEvents/>}
          {Position === TABS_ENCLOSURE.Blueprints.Position && <DynamicBlueprints/>}
      </MainContainerDesktop>
    );

    function handlePosition(num: number) {
        setPosition(num)
    }
}