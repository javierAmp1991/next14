import {EnumTypeSection} from "./area-interfaces";
import {ROW_SECTION, TABLE_SECTION, FREE_SPACE_SECTION, OBJECT_SECTION} from "@repo/ui/localIcons";

export function GetNameAndIconTypeSection(type: EnumTypeSection) {
    if (type === EnumTypeSection.Object) return {Name: "Objetos", Icon: OBJECT_SECTION}
    else if (type === EnumTypeSection.Row) return {Name: "Filas y asientos", Icon: ROW_SECTION}
    else if (type === EnumTypeSection.Table) return {Name: "Mesas y sillas", Icon: TABLE_SECTION}
    else return {Name: "Espacio libre", Icon: FREE_SPACE_SECTION}
}