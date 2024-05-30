'use client'
//@ts-ignore
import style from "./style.module.css";
import Image from "next/image";
import {GLASS_WHITE, CART_ICON_WHITE, MENU_ICON_WHITE} from "../../icons";
import React, { createContext, useContext, useState } from "react";

interface IHeaderPageMobile{
State: boolean
HandleState: ()=>void
}

//@ts-ignore
const HeaderPageMobileContext = createContext<IHeaderPageMobile>(null);

export function useHeaderPageMobile(){
  const provider = useContext(HeaderPageMobileContext)
  if (!provider) throw new Error("")
  else return provider
}

export const HeaderPageMobile = ({children}:{children: React.ReactNode})=>{
    const [state, setState] = useState(false);
    const provider: IHeaderPageMobile = {
        State: state,
        HandleState: handleMenu
    }
    return (
      <HeaderPageMobileContext.Provider value={provider}>
        <div className={style.mainGrid}>
          <div className={style.main}>
            <div onClick={handleMenu} className={style.sizeIconMenu}>
              <Image alt="" layout={"fill"} src={MENU_ICON_WHITE} />
            </div>
            <div className={style.input}>
              <input
                className={style.inputText}
                placeholder={"Buscar evento, servicio o producto"}
                type="text"
              />
              <div className={style.contGlassIcon}>
                <div className={style.glassIcon}>
                  <Image alt="" layout={"fill"} src={GLASS_WHITE} />
                </div>
              </div>
            </div>
            <div className={style.contCart}>
              <div className={style.cartNumber}>0</div>
              <div className={style.sizeIcon}>
                <Image alt="" layout={"fill"} src={CART_ICON_WHITE} />
              </div>
            </div>
          </div>
          <div className={style.childrenContainer}>
            {children}
          </div>
        </div>
      </HeaderPageMobileContext.Provider>
    );

    function handleMenu(){
      setState(!state)
    }
}