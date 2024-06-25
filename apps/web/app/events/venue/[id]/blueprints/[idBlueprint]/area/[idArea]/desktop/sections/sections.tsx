import {useAreaContext} from "../../provider";
import {EnumTypeSection, RowSection, TableSection, ObjectSection, FreeSpaceSection, SectionsOptions} from "../../area-interfaces";
import Rows from "./rows/rows";
import Table from "./tables/tables";
import Objects from "./objects/objects";
import FreeSpace from "./free-space/free-space";
import CreateSection from "./create-section/create-section";
import {DesplegableContainer} from "@repo/ui/misc";
import EditSection from "./edit-section/edit-section";
import {MutationContainerGrid, SubmutationContainerLeft, SubmutationContainerRight, EnumMutationContainerGrid} from "@repo/ui/mutationContainers";

export default function Sections() {
    const {Area, SectionForEdit} = useAreaContext();
    const hasSections = Area.Sections.length > 0;
    const showEdit = SectionForEdit !== undefined;

    return (
        <MutationContainerGrid props={{Grid: EnumMutationContainerGrid.Edit}}>
            <SubmutationContainerLeft>
                {
                    hasSections ?
                        Area.Sections.map((s: SectionsOptions) => {
                            if (s.Type === EnumTypeSection.Row) return <Rows section={s as RowSection}/>
                            else if (s.Type === EnumTypeSection.Table) return <Table section={s as TableSection}/> 
                            else if (s.Type === EnumTypeSection.Object) return <Objects section={s as ObjectSection}/>
                            else if (s.Type === EnumTypeSection.FreeSpace) return <FreeSpace section={s as FreeSpaceSection}/>
                        })
                        :
                        <p>Aun no se han creado secciones</p>
                }
            </SubmutationContainerLeft>
            <SubmutationContainerRight>
                <CreateSection/>
                <DesplegableContainer s={showEdit}><EditSection/></DesplegableContainer>
            </SubmutationContainerRight>
        </MutationContainerGrid>
    )
}