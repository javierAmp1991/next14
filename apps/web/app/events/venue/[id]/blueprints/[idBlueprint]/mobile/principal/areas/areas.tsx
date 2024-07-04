
import Area from "./area";
import { useBlueprintContext} from "../../../provider";

export default function Blueprints() {
  const {IdBlueprint, IdVenue, Blueprint} = useBlueprintContext();
  return <>{Blueprint.Areas.map((e) => (<Area e={e} idBlueprint={IdBlueprint} idVenue={IdVenue} />))}</>
}
