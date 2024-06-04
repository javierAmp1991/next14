import {useVenueContext} from "../provider";
import {MainContainerDesktop, IMainContainerDesktop, EnumMainContainerDesktop} from "@repo/ui/mainContainer";
import {HeaderDesktop, IHeaderDesktop} from "@repo/ui/headerDesktop";
import {NavTabs, NavTabsProps} from "@repo/ui/navTabs";
import {SpinLoading} from "@repo/ui/misc";
import dynamic from 'next/dynamic';
import {TABS_ENCLOSURE} from "../const";

const DynamicPrincipal = dynamic(() => import('./principal'), {loading: () => <SpinLoading/>});
const DynamicEvents = dynamic(() => import('./events/events'), {loading: () => <SpinLoading/>});
const DynamicBlueprints = dynamic(() => import('./blueprints/blueprints'), {loading: () => <SpinLoading/>});


export default function Main (){
    const {PositionHandler} = useVenueContext();
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
              State: PositionHandler.Position === TABS_ENCLOSURE.Main.Position,
              IsAvailable: true,
              Id: TABS_ENCLOSURE.Main.Id,
            },
            {
              Name: TABS_ENCLOSURE.Events.Name,
              Position: TABS_ENCLOSURE.Events.Position,
              State: PositionHandler.Position === TABS_ENCLOSURE.Events.Position,
              IsAvailable: true,
              Id: TABS_ENCLOSURE.Events.Id,
            },
            {
              Name: TABS_ENCLOSURE.Blueprints.Name,
              Position: TABS_ENCLOSURE.Blueprints.Position,
              State: PositionHandler.Position === TABS_ENCLOSURE.Blueprints.Position,
              IsAvailable: true,
              Id: TABS_ENCLOSURE.Blueprints.Id,
            }
    ];

    return (
      <MainContainerDesktop props={containerProps}>
        <HeaderDesktop props={headerProps} />
        <NavTabs item={navTabsProps} onClick={PositionHandler.HandlePosition} />
          {PositionHandler.Position === TABS_ENCLOSURE.Main.Position && <DynamicPrincipal/>}
          {PositionHandler.Position === TABS_ENCLOSURE.Events.Position && <DynamicEvents/>}
          {PositionHandler.Position === TABS_ENCLOSURE.Blueprints.Position && <DynamicBlueprints/>}
      </MainContainerDesktop>
    );
}