import { ColumnEdit, ColumnClick, Column, NumberTable, FirstColum} from "@repo/ui/tableDesktop";
import {VenueRowTable} from "./table";

export default function EnclosureColumns({ item }: { item: VenueRowTable }) {
  const profile = { Image: item.Image };

  return (
    <>
      <FirstColum image={item.Image} name={item.Name}/>
  
      <Column title={item.Address}>{item.Address}</Column>

      <ColumnClick onClick={handleEvents}><NumberTable number={item.Events}/></ColumnClick>

      <ColumnClick onClick={handleBlueprints}><NumberTable number={item.TotalBluePrints} /></ColumnClick>

      <ColumnEdit post={"Recinto"} />
    </>
  );

  function handleEvents() {}

  function handleBlueprints() {}
}
