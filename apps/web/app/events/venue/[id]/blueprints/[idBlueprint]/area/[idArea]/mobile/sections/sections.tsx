import {useAreaContext} from "../../provider";
import {EnumTypeSection, RowSection, TableSection, ObjectSection, FreeSpaceSection} from "../../area-interfaces";
import Rows from "./rows/rows";
import Table from "./tables/tables";
import Objects from "./objects/objects";
import FreeSpace from "./free-space/free-space";
import style from "./section.module.css";
import Image from "next/image";
import {RIGHT_ARROW_BLU} from "@repo/ui/localIcons";

export default function Sections({displayCreate}:{displayCreate: Function}) {
    const {Area, SectionForEdit} = useAreaContext();
    const hasSections = Area.Sections.length > 0;
    const showEdit = SectionForEdit !== undefined;
    const keyEdit = SectionForEdit? SectionForEdit.Id : "";

    return (
        <>
            <div onClick={handleDisplay} className={style.create}>
                Crear nueva seccion
                <div className={style.arrow}><Image alt="" layout={"fill"} src={RIGHT_ARROW_BLU}/></div>
            </div>
            {
                hasSections ?
                    Area.Sections.map((s: any) => {
                        if (s.Type === EnumTypeSection.Row) return <Rows onOpen={handleDisplay} section={s as RowSection}/>
                        else if (s.Type === EnumTypeSection.Table) return <Table onOpen={handleDisplay} section={s as TableSection}/> 
                        else if (s.Type === EnumTypeSection.Object) return <Objects onOpen={handleDisplay} section={s as ObjectSection}/>
                        else if (s.Type === EnumTypeSection.FreeSpace) return <FreeSpace onOpen={handleDisplay} section={s as FreeSpaceSection}/> 
                    })
                    :
                    <p>Aun no se han creado secciones</p>
            }
        </>
    )

    function handleDisplay() {
        displayCreate()
    }
}