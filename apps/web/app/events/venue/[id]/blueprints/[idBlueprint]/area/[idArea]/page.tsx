"use client"
import AreaContex from "./provider";
import Main from "./main";
export default function Page({params}:{params: {id: string, idBlueprint: string, idArea: string}}){
    return (
      <AreaContex idVenue={params.id} idBlueprint={params.idBlueprint} idArea={params.idArea}>
           <Main/>
      </AreaContex>
    );
}