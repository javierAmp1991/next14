import { useEffect, useState } from "react";
import Provider from "./provider"; "./provider";
import Desktop from "./desktop/main";
import Mobile from "./mobile/main";
import { EnumTypeView, useWindowDimensions } from "@repo/ui/windowDimention";
import { SpinLoading } from "@repo/ui/misc";

export default function Request({id}:{id: string}){
    const [venue, setVenue] = useState<string | undefined>(undefined);
    const { RangeView } = useWindowDimensions();    

    useEffect(()=>{
      setTimeout(()=>{setVenue(id)}, 1000)
    }, [id])

    return (
        venue === undefined ? <div>Pidiendo el recinto</div> :
         <Provider v={venue}>
          {RangeView === EnumTypeView.Loading ? <SpinLoading/> : RangeView === EnumTypeView.Desktop ? <Desktop /> : <Mobile/>}
         </Provider>

    )
}