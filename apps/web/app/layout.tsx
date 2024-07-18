"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { HeaderPage, HeaderPageMobile } from "@repo/ui/mainHeader";
import { ID_PORTAL } from "@repo/ui/const";
import Script from "next/script";
import { EnumTypeView, useWindowDimensions } from "@repo/ui/windowDimention";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { RangeView } = useWindowDimensions();
  return (
    <html lang="en">
      <head content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <Script src="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.0/mapbox-gl-draw.css"
          type="text/css"
        />
      </head>

      <body className={inter.className}>
        {RangeView === EnumTypeView.Loading ? (
          <></>
        ) : RangeView === EnumTypeView.Desktop ? (
          <HeaderPage>{children}</HeaderPage>
        ) : (
          <HeaderPageMobile>{children}</HeaderPageMobile>
        )}
        <div id={ID_PORTAL} />
      </body>
    </html>
  );
}
