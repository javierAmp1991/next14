import {
  IMutationContainerGrid,
  MutationContainerGrid
} from "@repo/ui/mutationContainers";
import { GridDefaultCard } from "@repo/ui/defaultCard";
import Event from "./event";
import style from "./style.module.css";
import { useVenueContext } from "../../provider";

export default function Events() {
  const { Venue } = useVenueContext();
  const mutationProps: IMutationContainerGrid = { Style: style.grid };
  return (
    <MutationContainerGrid props={mutationProps}>
      <GridDefaultCard>
        {Venue.Events.map((e) => (
          <Event e={e} />
        ))}
      </GridDefaultCard>
    </MutationContainerGrid>
  );
}
