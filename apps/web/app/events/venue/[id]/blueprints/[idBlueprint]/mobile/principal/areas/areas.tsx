import {
  IMutationContainerGrid,
  MutationContainerGrid,
} from "@repo/ui/mutationContainers";
import { GridDefaultCard} from "@repo/ui/defaultCard";
import Area from "./area";
import style from "./style.module.css";
import { useBlueprintContext} from "../../../provider";

export default function Blueprints() {
  const {IdBlueprint, IdVenue, Blueprint} = useBlueprintContext();
  return (
    <>
        {Blueprint.Areas.map((e) => (<Area e={e} idBlueprint={IdBlueprint} idVenue={IdVenue} />))}
    </>
  );
}
