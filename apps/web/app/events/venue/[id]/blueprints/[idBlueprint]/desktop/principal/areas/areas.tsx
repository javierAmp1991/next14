import {
  IMutationContainerGrid,
  MutationContainerGrid,
} from "@repo/ui/mutationContainers";
import { GridDefaultCard, GridDefaultCardMobile } from "@repo/ui/defaultCard";
import Area from "./area";
import style from "./style.module.css";
import { useBlueprintContext} from "../../../provider";

export default function Blueprints() {
  const {IdBlueprint, IdVenue} = useBlueprintContext();
  const mutationProps: IMutationContainerGrid = { Style: style.grid };
  const Areas = [
    {
      Name: "Name 1",
      Image: "/venue-images/firstPlace.svg",
      Sections: 4,
      Id: "id001"
    },
    {
      Name: "Name 2",
      Image: "/venue-images/sausalito4.jpg",
      Sections: 3,
      Id: "id002"
    }
  ]
  return (
    <MutationContainerGrid props={mutationProps}>
      <GridDefaultCardMobile>
        {Areas.map((e) => (
          <Area e={e} idBlueprint={IdBlueprint} idVenue={IdVenue} />
        ))}
      </GridDefaultCardMobile>
    </MutationContainerGrid>
  );
}
