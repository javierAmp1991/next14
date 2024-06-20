import { HeaderMobile, IHeaderMobile } from "@repo/ui/headerDesktop";
import { NavTabsMobile, NavTabsProps } from "@repo/ui/navTabs";
import {DefaulContainerMobile} from "@repo/ui/mutationContainers";
import { TABS_ENCLOSURE } from "../const";
import { SpinLoading } from "@repo/ui/misc";
import {useVenueContext} from "../provider";
import {
  ScrollMutationContainerMobile,
  IScrollMutationContainerMobile,
} from "@repo/ui/scrollContainerMobile";
import dynamic from "next/dynamic";

const DynamicPrincipal = dynamic(() => import("./principal"), {
  loading: () => <SpinLoading />,
});
const DynamicEvents = dynamic(() => import("./events/events"), {
  loading: () => <SpinLoading />,
});
const DynamicBlueprints = dynamic(() => import("./blueprints/blueprints"), {
  loading: () => <SpinLoading />,
});

export default function Main() {
  const {CreateEditHandler, PositionHandler} = useVenueContext();
  const header: IHeaderMobile = {
    Title: "Editar Recinto",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
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
    },
  ];
  const scrollContainerProps: IScrollMutationContainerMobile = {
    Dependency: PositionHandler.Position,
    UseDefaultGrid: true,
    Buttons: [
      {
        Name: "Aplicar cambios",
        OnClick: handleApplyChanges,
        Position: TABS_ENCLOSURE.Main.Position
      },
      {
        Name: "Crear nuevo plano",
        OnClick: handleCreateBlueprint,
        Position: TABS_ENCLOSURE.Blueprints.Position
      }
    ]
  };

  return (
    <DefaulContainerMobile>
      <HeaderMobile props={header} />
      <NavTabsMobile item={navTabsProps} onClick={PositionHandler.HandlePosition} />
      <ScrollMutationContainerMobile props={scrollContainerProps}>
        {PositionHandler.Position === TABS_ENCLOSURE.Main.Position && <DynamicPrincipal />}
        {PositionHandler.Position === TABS_ENCLOSURE.Events.Position && <DynamicEvents />}
        {PositionHandler.Position === TABS_ENCLOSURE.Blueprints.Position && <DynamicBlueprints />}
      </ScrollMutationContainerMobile>
    </DefaulContainerMobile>
  );

  function handleApplyChanges(){

  }

  function handleCreateBlueprint(){

  }

}
