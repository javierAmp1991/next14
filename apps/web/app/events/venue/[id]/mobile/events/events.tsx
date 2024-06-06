import { GridDefaultCardMobile2 } from "@repo/ui/defaultCard";
import Event from "./event";
import { useVenueContext } from "../../provider";

export default function Events() {
  const { Venue } = useVenueContext();
  return (
    <GridDefaultCardMobile2>
      {Venue.Events.map((e) => (
        <Event e={e} />
      ))}
    </GridDefaultCardMobile2>
  );
}
