import MainContainerInfo from "./main-container-info";
import MinTickets from "./min-tickets";
import {usePreviewContext} from "../../../";
import {ObjectSection} from "events.model";

const the = " Los ";
const objectsName = "Objetos";
const shared = " son compartidas";
const noShared = " no son compartidas";

export default function ObjectInfo({isShared}: { isShared: boolean }) {
    const {ObjectSelected, SectionSelected} = usePreviewContext();
    const alias = SectionSelected as ObjectSection;
    const name = alias === undefined ? objectsName : alias.Alias;
    const max = ObjectSelected ? ObjectSelected.Capacity : 0;
    const min = getMinTickets();
    return <>
        <MainContainerInfo icon={true}>
            <span>{isShared ? `${the}${name}${shared}` : `${the}${name}${noShared}`}</span>
        </MainContainerInfo>
        {/*{min !== undefined && <MaxTickets max={max}/>}*/}
        {min !== undefined && <MinTickets min={min}/>}
    </>

    function getMinTickets() {
        if (SectionSelected) {
            const castSection = SectionSelected as ObjectSection;
            if (castSection.Objects.length === 0) return undefined;
            const ref = castSection.Objects[0];
            for (let i = 0; i < castSection.Objects.length; i++) {
                if (castSection.Objects[i].Min !== ref.Min) return undefined
            }
            return ref.Min
        } else return undefined
    }

}