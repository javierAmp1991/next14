import CSS from "./administration.module.css";
import { TableDesktop, Row, EmptyRow, TableProps } from "@repo/ui/tableDesktop";
import EnclosureColumns from "./enclosure-columns";
import { CSSProperties, useState } from "react";
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
      Lng: -71.546162,
      Lat: -33.011784,
      Zoom: 15,
    },
    Resource: [
      {
        Type: EnumTypeResource.Image,
        Source: "/venue-images/nightClub1.jpg",
        Id: "idResource001",
      },
      {
        Type: EnumTypeResource.Image,
        Source: "/venue-images/nightClub2.jpg",
        Id: "idResource002",
      },
    ],
    Events: [
      {
        Id: "idEvent001",
        Name: "Elektro Panic",
        Enclosure: "Club Night Valpo",
        Image: "/nightClub3.jpg",
      },
    ],
    Blueprints: [],
    IsPublic: true,
  },
  {
    Name: "Estadio Sausalito",
    Id: "idEnclosure003",
    Address: "Toro Herrera 177-117, Viña del Mar, Valparaíso",
    ServiceRealized: ["idPerformer003", "idPerformer004"],
    ServicePendent: ["idService003", "idService004"],
    Image: "/venue-images/sausalito.jpg",
    ViewPort: {
      Lng: -71.564977,
      Lat: -33.025337,
      Zoom: 9,
    },
    Resource: [
      {
        Type: EnumTypeResource.Image,
        Source: "/venue-images/sausalito1.jpg",
        Id: "idResource003",
      },
      {
        Type: EnumTypeResource.Image,
        Source: "/venue-images/sausalito2.jpg",
        Id: "idResource004",
      },
    ],
    Events: [
      {
        Id: "idEvent002",
        Name: "Wanderers vs Everton",
        Enclosure: "Estadio Sausalito",
        Image: "/sausalito3.jpg",
      },
    ],
    Blueprints: [],
    IsPublic: false,
  },
];

export const VenueTable = () => {
  const [Venue, setVenue] = useState<VenueRowTable[]>(getVenues());

  const total = Venue.length;

  const rowRender = (index: number, key: string, style: CSSProperties) => {
    const item = Venue[index];
    if (item === undefined)
      return <EmptyRow key={key} style={style} index={index} />;
    else
      return (
        <Row
          key={key}
          Columns={<EnclosureColumns item={item} />}
          style={style}
          index={index}
          grid={CSS.grid!}
          onMutation={() => handleMutation(item.Id)}
        />
      );
  };
  const props: TableProps = {
    TotalRows: total,
    ListHeader: [
      { Name: "Recinto" },
      { Name: "Direccion" },
      { Name: "Eventos" },
      { Name: "Planos" },
      { Name: "Editar" },
    ],
    FilterSelected: undefined,
    GridHeader: CSS.grid!,
    OnRowEnd: () => {},
    RowRender: rowRender,
  };
  const { push } = useRouter();

  return <TableDesktop props={props} />;

  function getVenues() {
    let newList: VenueRowTable[] = [];
    for (let i = 0; i <= 1; i++) {
      const newItem: VenueRowTable = {
        Id: ENCLOSURE_OPTIONS[i]!.Id,
        Name: ENCLOSURE_OPTIONS[i]!.Name,
        Address: ENCLOSURE_OPTIONS[i]!.Address,
        PendentServices: ENCLOSURE_OPTIONS[i]!.ServicePendent.length,
        RealizeServices: ENCLOSURE_OPTIONS[i]!.ServiceRealized.length,
        Image: ENCLOSURE_OPTIONS[i]!.Image,
        TotalBluePrints: ENCLOSURE_OPTIONS[i]!.Blueprints.length,
        Events: ENCLOSURE_OPTIONS[i]!.Events.length,
      };
      newList = [...newList, newItem];
    }
    return newList;
  }

  function handleMutation(id: string) {
    push(`/events/venue/${id}`);
  }
};
