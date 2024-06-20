import { useWindowDimensions, EnumTypeView } from "@repo/ui/windowDimention";
import Desktop from "./desktop/main";
import Mobile from "./mobile/main";

export default function Main(){
    const {RangeView} = useWindowDimensions();
    return(
        RangeView === EnumTypeView.Desktop ? <Desktop/> : RangeView === EnumTypeView.Mobile ? <Mobile/> : <></>
    )
}