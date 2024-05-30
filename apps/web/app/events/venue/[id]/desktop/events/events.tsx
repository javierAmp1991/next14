import {IMutationContainerGrid, MutationContainerGrid} from "@repo/ui/mutationContainers";
import {GridDefaultCard} from "@repo/ui/defaultCard";
import Event from "./event";
import style from "./style.module.css";

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
    const mutationProps: IMutationContainerGrid = { Style: style.grid };
    return (
        <MutationContainerGrid props={mutationProps}>
            <GridDefaultCard>{Enclosure.Events.map(e => <Event e={e}/>)}</GridDefaultCard>
        </MutationContainerGrid>
    )
}