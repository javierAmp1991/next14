"use client";
import Desktop from "./desktop/main";
import Mobile from "./mobile/main";
import { SpinLoading } from "@repo/ui/misc";
import { VenueProvider } from "./provider/index";
import { useMainContext, EnumTypeView } from "../../layout";

export default function Page() {
  const {WindowDimension} = useMainContext();
  const {RangeView} = WindowDimension;
  return (
    <VenueProvider>
      {RangeView === EnumTypeView.Loading ? (
        <SpinLoading />
      ) : RangeView === EnumTypeView.Desktop ? (
        <Desktop />
      ) : (
        <Mobile />
      )}
    </VenueProvider>
  );
}
