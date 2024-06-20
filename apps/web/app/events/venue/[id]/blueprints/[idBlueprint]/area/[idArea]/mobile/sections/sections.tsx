import {useAreaContext} from "../../provider";
import {EnumTypeSection, RowSection, TableSection, ObjectSection, FreeSpaceSection} from "../../area-interfaces";
import Rows from "./rows/rows";
import Table from "./tables/tables";
import Objects from "./objects/objects";
import FreeSpace from "./free-space/free-space";
import {useState} from "react";
import CreateSection from "./create-section/create-section";
import {DesplegableContainer} from "@repo/ui/misc";
import EditSection from "./edit-section/edit-section";

export default function Sections() {
    const {Area, SectionForEdit} = useAreaContext();
    const [displayCreate, setDisplayCreate] = useState(false);
    const hasSections = Area.Sections.length > 0;
    const showEdit = SectionForEdit !== undefined;
    const keyEdit = SectionForEdit? SectionForEdit.Id : "";

    return (
        <>
            {
                hasSections ?
                    Area.Sections.map((s: any) => {
                        if (s.Type === EnumTypeSection.Row) {
                            return <Rows onOpen={handleDisplay} section={s as RowSection}/>
                        }
                        else if (s.Type === EnumTypeSection.Table) {
                            return <Table onOpen={handleDisplay} section={s as TableSection}/>
                        } 
                        else if (s.Type === EnumTypeSection.Object) {
                            return <Objects onOpen={handleDisplay} section={s as ObjectSection}/>
                        }
                        else if (s.Type === EnumTypeSection.FreeSpace) {
                            return <FreeSpace onOpen={handleDisplay} section={s as FreeSpaceSection}/>
                        } 
                    })
                    :
                    <p>Aun no se han creado secciones</p>
            }
        </>
    )

    function handleDisplay() {
        setDisplayCreate(!displayCreate)
    }
}