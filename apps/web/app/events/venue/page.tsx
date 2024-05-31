"use client";
import Desktop from "./desktop/main";
import Mobile from "./mobile/main";
import { EnumTypeView, useWindowDimensions } from "@repo/ui/windowDimention";
import { SpinLoading } from "@repo/ui/misc";
import { VenueProvider } from "./provider/index";

export default function Page() {
  const { RangeView } = useWindowDimensions();
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
