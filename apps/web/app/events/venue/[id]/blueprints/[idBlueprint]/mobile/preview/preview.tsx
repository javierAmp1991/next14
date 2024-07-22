import {LayoutComponent, ILayoutComponet, EnumTypeSection} from "../../../../../../layout-component/index";
import style from "./style.module.css";

export default function Preview(){
    const props: ILayoutComponet = {
        Layout: {
            Id: "idLayout",
            Areas: [
                {
                    Id: "primera area",
                    Image: "/venue-images/firstPlace.svg",
                    Name: "Primer piso",
                    Sections: [
                        {
                            Id: "Seccion Oeste",
                            Name: "Seccion Oeste",
                            Type: EnumTypeSection.Row,
                            Color: "#af599e",
                            Rows: [
                                {
                                    Id: `1`,
                                    Row: `1`,
                                    Seat: 7,
                                },
                                {
                                    Id: `2`,
                                    Row: `2`,
                                    Seat: 7,
                                }
                            ]
                        },
                        {
                            Id: "Seccion Este",
                            Name: "Seccion Este",
                            Type: EnumTypeSection.Row,
                            Color: "#af599e",
                            Rows: [
                                {
                                    Id: `1`,
                                    Row: `1`,
                                    Seat: 7
                                },
                                {
                                    Id: `2`,
                                    Row: `2`,
                                    Seat: 7
                                }
                            ]
                        },
                        {
                            Id: "Seccion Estandar",
                            Name: "Seccion Estandar",
                            Type: EnumTypeSection.Table,
                            Color: "#009fe3",
                            Tables: [
                                {
                                    Id: `1`,
                                    Table: `1`,
                                    Chair: 4
                                },
                                {
                                    Id: `2`,
                                    Table: `2`,
                                    Chair: 4
                                },
                                {
                                    Id: `3`,
                                    Table: `3`,
                                    Chair: 4
                                },
                                {
                                    Id: `4`,
                                    Table: `4`,
                                    Chair: 4
                                },
                                {
                                    Id: `5`,
                                    Table: `5`,
                                    Chair: 4
                                },
                                {
                                    Id: `6`,
                                    Table: `6`,
                                    Chair: 4
                                }
                            ]
                        },
                        {
                            Id: "Seccion Vip",
                            Name: "Seccion Vip",
                            Type: EnumTypeSection.Object,
                            Color: "#f39200",
                            Objects: [
                                {
                                    Id: `Sillon 1`,
                                    Object: `Sillon 1`,
                                    Capacity: 4,
                                },
                                {
                                    Id: `Sillon 2`,
                                    Object: `Sillon 2`,
                                    Capacity: 4,
                                },
                                {
                                    Id: `Sillon 3`,
                                    Object: `Sillon 3`,
                                    Capacity: 4,
                                },
                                {
                                    Id: `Sillon 4`,
                                    Object: `Sillon 4`,
                                    Capacity: 4,
                                }
                            ]
                        }
                    ],
                },
                {
                    Id: "segunda area",
                    Image: "/venue-images/secondPlace3.svg",
                    Name: "Segundo piso",
                    Sections: [
                        {
                            Id: "Espacio libre",
                            Name: "Espacio libre",
                            Type: EnumTypeSection.FreeSpace,
                            Color: "#af599e",
                            Capacity: 50
                        },
                        {
                            Id: "Seccion posterior",
                            Name: "Seccion posterior",
                            Type: EnumTypeSection.Table,
                            IsShared: true,
                            Color: "#009fe3",
                            Tables: [
                                {
                                    Id: `1`,
                                    Table: `1`,
                                    Chair: 4,
                                },
                                {
                                    Id: `2`,
                                    Table: `2`,
                                    Chair: 4,
                                },
                                {
                                    Id: `3`,
                                    Table: `3`,
                                    Chair: 4,
                                },
                                {
                                    Id: `4`,
                                    Table: `4`,
                                    Chair: 4,
                                },
                                {
                                    Id: `5`,
                                    Table: `5`,
                                    Chair: 4,
                                },
                            ],
                        }
                    ]
                }
            ]
        },
        Event:{
            Banner: "/venue-images/test2.jpg",
            Dates: [
                {
                    Id: "idDate001",
                    Date: new Date(2024, 8, 10, 22,0,0)
                },
                {
                    Id: "idDate001",
                    Date: new Date(2024, 9, 10, 14,0,0)
                }
            ],
            Title: "Musica electronica"
        }
    }
    return (
    <div className={style.main}>
        <LayoutComponent props={props}/>
    </div>
    )
}