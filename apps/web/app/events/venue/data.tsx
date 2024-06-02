import { EnumTypeResource } from "@repo/ui/globalEnums";
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
