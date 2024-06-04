import { useState } from "react";

export interface IUseHandlePositionReturn{
  Position: number
  HandlePosition: (p: number)=>void
}

export function useHandlePosition(name?: string) {
  const initialPosition = getInitialPosition(name);
  const [position, setPosition] = useState(initialPosition);

  function handlePosition(num: number) {
    setPosition(num);
  }

  const r: IUseHandlePositionReturn = {
    Position: position, HandlePosition: handlePosition
  }

  return r;
}

function getInitialPosition(name?: string) {
  let p = 0;
  if (name) p = getInitialPositionTabs(name);
  return p;
}

function getInitialPositionTabs(name: string) {
  const initialPosition = window.sessionStorage.getItem(name);
  window.sessionStorage.removeItem(name);
  if (initialPosition) {
    const newPos = parseInt(initialPosition);
    if (isNaN(newPos)) return 0;
    else if (newPos < 0) return 0;
    else return newPos;
  } else return 0;
}
