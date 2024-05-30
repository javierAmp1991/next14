import {GridDefaultCardMobile} from "@repo/ui/defaultCard";
import Event from "./event";

export default function Events() {
    const Enclosure = {
      Events: [
        {
          Id: "idEvent001",
          Name: "Elektro Panic",
          Enclosure: "Club Night Valpo",
          CoverImage: "/venue-images/nightClub3.jpg",
        },
        {
          Id: "idEvent002",
          Name: "Wanderers vs Everton",
          Enclosure: "Estadio Sausalito",
          CoverImage: "/venue-images/sausalito3.jpg",
        }
      ],
    };
    return <GridDefaultCardMobile>{Enclosure.Events.map(e => <Event e={e}/>)}</GridDefaultCardMobile>

}