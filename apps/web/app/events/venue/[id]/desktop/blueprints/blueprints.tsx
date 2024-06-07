import {
  IMutationContainerGrid,
  MutationContainerGrid,
} from "@repo/ui/mutationContainers";
import { GridDefaultCard } from "@repo/ui/defaultCard";
import Blueprint from "./blueprint";
import style from "./style.module.css";
import { useVenueContext } from "../../provider";

export default function Blueprints() {
  const { Venue, Id } = useVenueContext();
  const mutationProps: IMutationContainerGrid = { Style: style.grid };
  return (
    <MutationContainerGrid props={mutationProps}>
      <GridDefaultCard>
        {Venue.Blueprints.map((e) => (
          <Blueprint e={e} id={Id} />
        ))}
      </GridDefaultCard>
    </MutationContainerGrid>
  );
}
