"use client";
import Desktop from "./administration/desktop/administration";
import Mobile from "./administration/mobile/administration";
import {EventsProvider} from "./administration/provider";
import { useMainContext, EnumTypeView } from "../../layout";
import { SpinLoading } from "@repo/ui/misc";

export default function Page(){
  const {WindowDimension} = useMainContext();
  const {RangeView} = WindowDimension;
    return(
        <EventsProvider>
            {
                RangeView === EnumTypeView.Loading ? 
                    <SpinLoading /> : RangeView === EnumTypeView.Desktop ?
                        <Desktop />
                        :
                        <Mobile />
            }
        </EventsProvider>
    )
}