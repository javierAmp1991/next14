import {  IMutationContainerGrid,  MutationContainerGrid} from "@repo/ui/mutationContainers";
import { GridDefaultCard, IDefaultCard, CreateCardDesktop } from "@repo/ui/defaultCard";
import Blueprint from "./blueprint";
import style from "./style.module.css";
import { useVenueContext } from "../../provider";

export default function Blueprints() {
  const { Venue, Id } = useVenueContext();
  const mutationProps: IMutationContainerGrid = { Style: style.grid };
  const create: IDefaultCard = {
    First: "Crear nueva",
    Second: "Area del plano",
    Image: "",
    Href: `/events/venue/${Id}/blueprints/createNewBlueprint`
};
  return (
    <MutationContainerGrid props={mutationProps}>
      <GridDefaultCard>
        <CreateCardDesktop props={create}/>
        {Venue.Blueprints.map((e) => (<Blueprint e={e} id={Id} />))}
      </GridDefaultCard>
    </MutationContainerGrid>
  );
}
