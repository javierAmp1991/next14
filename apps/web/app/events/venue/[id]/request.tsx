import Provider from "./provider"; "./provider";
import Desktop from "./desktop/available";
import Mobile from "./mobile/available";
import { EnumTypeView, useWindowDimensions } from "@repo/ui/windowDimention";
import { SpinLoading } from "@repo/ui/misc";

export default function Request({id}:{id: string}){
    const { RangeView } = useWindowDimensions();

    return (
        id === undefined ? <div>Pidiendo el recinto</div> :
         <Provider id={id}>
            {RangeView === EnumTypeView.Loading ? <SpinLoading/> : RangeView === EnumTypeView.Desktop ? <Desktop /> : <Mobile/>}
         </Provider>
    )
}