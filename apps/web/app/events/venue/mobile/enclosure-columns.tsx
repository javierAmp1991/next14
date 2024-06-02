import {
  ColumnEdit,
  ColumnClick,
  Column,
  NumberTable,
  FirstColumn,
} from "@repo/ui/tableMobile";
import { VenueRowTable } from "../provider";

export default function EnclosureColumns({ item }: { item: VenueRowTable }) {
  const profile = { Image: item.Image };

  return (
    <>
      <FirstColumn image={item.Image} name={item.Name} />

      <Column>{item.Address}</Column>

      <ColumnClick onClick={handleEvents}>
        <NumberTable number={item.Events} />
      </ColumnClick>

      <ColumnClick onClick={handleBlueprints}>
        <NumberTable number={item.TotalBluePrints} />
      </ColumnClick>

      <ColumnEdit post={"Recinto"} />
    </>
  );

  function handleEvents() {}

  function handleBlueprints() {}
}
