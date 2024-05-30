'use client'
import Desktop from "./desktop/main";
import Mobile from "./mobile/main";
import {EnumTypeView, useWindowDimensions} from "@repo/ui/windowDimention";
import {SpinLoading} from "@repo/ui/misc";

export default function Page() {
    const { RangeView } = useWindowDimensions();
    return RangeView === EnumTypeView.Loading ? <SpinLoading/> : RangeView === EnumTypeView.Desktop ? <Desktop /> : <Mobile/>
}  
 
  
 
 

 

 