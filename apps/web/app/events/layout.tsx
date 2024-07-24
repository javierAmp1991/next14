"use client";
import {usePathname } from "next/navigation";
import {NavProps, NavDesktop} from "@repo/ui/navDesktop";
import {NavMobile} from "@repo/ui/navMobile";
import {ChargingPage} from "@repo/ui/chargingPage";
import {EnumTypeView, useMainContext} from "../layout";

const LINK_BASE = "/events";

export const Url = {
    Enclosure: {
        Link: `${LINK_BASE}/venue`,
        Key: "venue",
        Name: "Mis Recintos",
        Image: "/nav-icons/enclosureIcon2.png",
        Create: "create-enclosure",
        UseEnclosure: "use-enclosure"
    },
    Events: {
        Link: `${LINK_BASE}/events`,
        Key: "events",
        Name: "Eventos",
        Image: "/nav-icons/eventPeopleIcon.png",
        Create: "create-event",
        Courtesy: "courtesy"
    },
    ValidateTickets: {
        Link: `${LINK_BASE}/validatetickets`,
        Key: "validatetickets",
        Name: "Validar tickets",
        Image: "/nav-icons/qrIcon.png"
    },
    Income: {
        Link: `${LINK_BASE}/income`,
        Key: "income",
        Name: "Finanzas",
        Image: "/nav-icons/incomeIcon2.png"
    },
    Webhooks: {
        Link: `${LINK_BASE}/webhooks`,
        Key: "webhooks",
        Name: "WebHooks",
        Image: "/nav-icons/webhooksIcon.png"
    },
    Products:{
        Link: `${LINK_BASE}/products`,
        Key: "products",
        Name: "Productos",
        Image: "/nav-icons/boxIcon.png",
        Create: "create-product"
    },
};
export const TITLE_NAV: string = "Eventos";


export default function RootLayout({children}: { children: React.ReactNode }): JSX.Element {
    const {WindowDimension} = useMainContext();
    const {RangeView} = WindowDimension;
    const props: NavProps = {
    SectionOptions: [
        {
            Id: Url.Enclosure.Link,
            UrlKey: Url.Enclosure.Key,
            Name: Url.Enclosure.Name,
            Icon: Url.Enclosure.Image,
        },
        {
            Id: Url.Events.Link,
            UrlKey: Url.Events.Key,
            Name: Url.Events.Name,
            Icon: Url.Events.Image,
        },
        {
            Id: Url.Products.Link,
            UrlKey: Url.Products.Key,
            Name: Url.Products.Name,
            Icon: Url.Products.Image
        },
        {
            Id: Url.ValidateTickets.Link,
            UrlKey: Url.ValidateTickets.Key,
            Name: Url.ValidateTickets.Name,
            Icon: Url.ValidateTickets.Image,
        },
        {
            Id: Url.Income.Link,
            UrlKey: Url.Income.Key,
            Name: Url.Income.Name,
            Icon: Url.Income.Image,
        },
        {
            Id: Url.Webhooks.Link,
            UrlKey: Url.Webhooks.Key,
            Name: Url.Webhooks.Name,
            Icon: Url.Webhooks.Image,
        }
    ],
    Title: TITLE_NAV
    };

  const pathname = usePathname();
  const actualOption: string | undefined = getActualOption();

  return (
    (pathname === undefined || actualOption === undefined || RangeView === EnumTypeView.Loading ) ? 
        <ChargingPage/>
        :
        RangeView === EnumTypeView.Desktop ?
            <NavDesktop link={actualOption} props={props}>{children}</NavDesktop>
            :
            <NavMobile props={props} link={actualOption}>{children}</NavMobile>
  )
  
  function getActualOption() {
    if (pathname === undefined) return undefined
    else {
       const split = pathname.split('/');
       return split[2]
    }
  }
}
