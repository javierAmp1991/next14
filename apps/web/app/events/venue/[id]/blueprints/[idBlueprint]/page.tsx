"use client"
import BlueprintContext from "./provider";
import Main from "./main";
export default function Page({params}:{params: {id: string, idBlueprint: string}}){
    return (
      <BlueprintContext idVenue={params.id} idBlueprint={params.idBlueprint}>
           <Main/>
      </BlueprintContext>
    );
}