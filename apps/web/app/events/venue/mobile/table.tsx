import {CSSProperties} from "react";
import {Row, EmtyRow, Table, TableProps} from "@repo/ui/tableMobile";
import css from "./administration.module.css";
import EnclosureColumns from "./enclosure-columns";
import ServiceExpand from "./service-expand";
import {useState} from "react";
import { useRouter } from "next/navigation";

export interface VenueRowTable {
  Id: string;
  Name: string;
  Image: string;
  Address: string;
  RealizeServices: number;
  PendentServices: number;
  TotalBluePrints: number;
  Events: number;
}

enum EnumTypeResource {
  Image,
  Youtube,
}

export const ENCLOSURE_OPTIONS = [
    {
        Name: "Club Night Valparaiso ",
        Id: "idEnclosure001",
        Address: "12 Nte. 940, Viña del Mar, Valparaíso",
        ServiceRealized: ["idPerformer001", "idPerformer002", "idPerformer003"],
        ServicePendent: ["idService001", "idService002", "idService003"],
        Image: "/venue-images/nightClub.jpg",
        ViewPort: {
        },
        Resource: [
            {
                Type: EnumTypeResource.Image,
                Source: "/venue-images/nightClub1.jpg",
                Id: "idResource001"
            },
            {
                Type: EnumTypeResource.Image,
                Source: "/venue-images/nightClub2.jpg",
                Id: "idResource002"
            }
        ],
        Events: [
        ],
        Blueprints: [],
        IsPublic: true
    },
    {
        Name: "Estadio Sausalito",
        Id: "idEnclosure003",
        Address: "Toro Herrera 177-117, Viña del Mar, Valparaíso",
        ServiceRealized: ["idPerformer003", "idPerformer004"],
        ServicePendent: ["idService003", "idService004"],
        Image: "/venue-images/sausalito.jpg",
        ViewPort: {
        },
        Resource: [
            {
                Type: EnumTypeResource.Image,
                Source: "/venue-images/sausalito1.jpg",
                Id: "idResource003"
            },
            {
                Type: EnumTypeResource.Image,
                Source: "/venue-images/sausalito2.jpg",
                Id: "idResource004"
            }
        ],
        Events: [
        ],
        Blueprints: [],
        IsPublic: false
    }
]

export default function ServiceTable() {
    const [Venue, setVenue] = useState<VenueRowTable[]>(getVenues());
    const total = Venue.length;
    const RowRender = (index: number, key: string, style: CSSProperties, isOpen: boolean) => {
        const item = Venue[index];
        if (item === undefined) return <EmtyRow style={style} index={index} key={key} />;
        else return <Row Expandable={<ServiceExpand item={item}/>} Columns={<EnclosureColumns item={item}/>}
        style={style} key={key} index={index} grid={css.grid!} isOpen={isOpen} onMutation={() => handleMutation(item.Id)}/>
    };
    const props: TableProps = {
        ListHeader: [{Name: "Recinto"}, {Name: "Direccion"}, {Name: "Eventos"}, {Name: "Planos"}, {Name: "Editar"}],
        TotalRows: total,
        FilterSelected: undefined,
        GridHeader: css.grid!,
        Width: 1050,
        OnRowEnd: () => {
        },
        RowRender: RowRender
    };
    const { push } = useRouter();

    return <Table props={props}/>

    function getVenues() {
      let newList: VenueRowTable[] = [];
      for (let i = 0; i <= 1; i++) {
        const newItem: VenueRowTable = {
          Id: ENCLOSURE_OPTIONS[i].Id,
          Name: ENCLOSURE_OPTIONS[i].Name,
          Address: ENCLOSURE_OPTIONS[i].Address,
          PendentServices: ENCLOSURE_OPTIONS[i].ServicePendent.length,
          RealizeServices: ENCLOSURE_OPTIONS[i].ServiceRealized.length,
          Image: ENCLOSURE_OPTIONS[i].Image,
          TotalBluePrints: ENCLOSURE_OPTIONS[i].Blueprints.length,
          Events: ENCLOSURE_OPTIONS[i].Events.length,
        };
        newList = [...newList, newItem];
      }
      return newList;
    }

    function handleMutation(id: string) {
      push(`/events/venue/${id}`);
    }
}