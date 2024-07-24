"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { HeaderPage, HeaderPageMobile } from "@repo/ui/mainHeader";
import { ID_PORTAL } from "@repo/ui/const";
import Script from "next/script";
import { useEffect, useState, createContext, useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

//@ts-ignore
const MainContext = createContext<IMainContext>(null);

export function useMainContext(){
  const provider = useContext(MainContext);
  if(provider) return provider
  else throw new Error("")
}

export interface IMainContext {
  WindowDimension: WindowDimensionProps
}

export interface WindowDimensionProps {
  Height?: number
  Width?: number
  RangeView: EnumTypeView
}

export enum EnumTypeView {
  Mobile, Desktop, Loading
}

const DEFAULT_WINDOW_DIMENSION = {
  Width: undefined,
  Height: undefined,
  RangeView: EnumTypeView.Loading
};

export default function RootLayout({children,}: {children: React.ReactNode;}): JSX.Element {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensionProps>(DEFAULT_WINDOW_DIMENSION);
  const {RangeView} = windowDimensions;
  const provider: IMainContext = {
     WindowDimension: windowDimensions
  };

  useEffect(() => {
    const handleResize = () => {
        setWindowDimensions({
            Width: window.innerWidth,
            Height: window.innerHeight,
            RangeView: window.innerWidth > 1280 ? EnumTypeView.Desktop : EnumTypeView.Mobile
        });
    };
    setTimeout(()=>handleResize(), 1000);
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
        <Script src="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"rel="stylesheet"/>
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css"/>
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.0/mapbox-gl-draw.css" type="text/css"/>
      </head>

      <body className={inter.className}>
        <MainContext.Provider value={provider}>
        {
            RangeView === EnumTypeView.Loading ?
                (<></>) : RangeView === EnumTypeView.Desktop ?
                    (<HeaderPage>{children}</HeaderPage>)
                    :
                    (<HeaderPageMobile>{children}</HeaderPageMobile>)
        }
        <div id={ID_PORTAL} />
        </MainContext.Provider>
      </body>
    </html>
  );
}
