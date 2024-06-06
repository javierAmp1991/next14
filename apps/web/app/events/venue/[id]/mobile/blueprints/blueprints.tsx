import { IMutationContainerGrid } from "@repo/ui/mutationContainers";
import { GridDefaultCardMobile2 } from "@repo/ui/defaultCard";
import Blueprint from "./blueprint";
import style from "./style.module.css";
import { useVenueContext } from "../../provider";

export default function Blueprints() {
  const { Venue } = useVenueContext();
  const mutationProps: IMutationContainerGrid = { Style: style.grid };
  return (
    <GridDefaultCardMobile2>
      {Venue.Blueprints.map((e) => (
        <Blueprint e={e} />
      ))}
    </GridDefaultCardMobile2>
  );
}
