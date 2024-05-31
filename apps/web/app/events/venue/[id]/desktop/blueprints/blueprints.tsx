import {IMutationContainerGrid, MutationContainerGrid} from "@repo/ui/mutationContainers";
import {GridDefaultCard} from "@repo/ui/defaultCard";
import Blueprint from "./blueprint";
import style from "./style.module.css";

export default function Blueprints() {
    const Enclosure = {
      Blueprints: [
        {
          Id:  "idNightClub",
          Name: "Night House",
          CoverImage: "/venue-images/nightClub5.jpg",
          Sections:4
        },
        {
          Id: "idEstadioSausalito",
          Name: "Estadio Sausalito",
          CoverImage: "/venue-images/sausalito4.jpg",
          Sections: 6
        },
      ],
    };
    const mutationProps: IMutationContainerGrid = { Style: style.grid };
    return (
        <MutationContainerGrid props={mutationProps}>
            <GridDefaultCard>{Enclosure.Blueprints.map(e => <Blueprint e={e}/>)}</GridDefaultCard>
        </MutationContainerGrid>
    )
}