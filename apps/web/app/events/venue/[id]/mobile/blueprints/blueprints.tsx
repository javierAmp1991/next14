import {IDefaultCard, CreateCardMobile } from "@repo/ui/defaultCard";
import Blueprint from "./blueprint";
import { useVenueContext } from "../../provider";

export default function Blueprints() {
  const { Venue, Id } = useVenueContext();
  const create: IDefaultCard = {
    First: "Crear nuevo",
    Second: "Plano del recinto",
    Image: "",
    Href: `/events/venue/${Id}/blueprints/createNewBlueprint`
  };
  return (
    <>
      <CreateCardMobile props={create}/>
      {Venue.Blueprints.map((e) => (<Blueprint e={e} id={Id} />))}
    </>
  );
}
