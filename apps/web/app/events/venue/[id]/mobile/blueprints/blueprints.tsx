import { GridDefaultCardMobile2, IDefaultCard, CreateCardMobile } from "@repo/ui/defaultCard";
import Blueprint from "./blueprint";
import { useVenueContext } from "../../provider";

export default function Blueprints() {
  const { Venue, Id } = useVenueContext();
  const create: IDefaultCard = {
    First: "Crear nueva",
    Second: "Area del plano",
    Image: "",
    Href: `/events/venue/${Id}/blueprints/createNewBlueprint`
  };
  return (
    <GridDefaultCardMobile2>
      <CreateCardMobile props={create}/>
      {Venue.Blueprints.map((e) => (
        <Blueprint e={e} id={Id} />
      ))}
    </GridDefaultCardMobile2>
  );
}
