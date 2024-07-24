import CSS from "./administration.module.css";
import { TableDesktop, Row, EmptyRow, TableProps } from "@repo/ui/tableDesktop";
import EnclosureColumns from "./enclosure-columns";
import { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { useVenueProvider } from "../provider";

export const VenueTable = () => {
  const { Venues } = useVenueProvider();

  const total = Venues.length;

  const rowRender = (index: number, key: string, style: CSSProperties) => {
    const item = Venues[index];
    if (item === undefined)
      return <EmptyRow key={key} style={style} index={index} />;
    else
      return (
        <Row
          key={key}
          Columns={<EnclosureColumns item={item} />}
          style={style}
          index={index}
          grid={CSS.grid!}
          onMutation={() => handleMutation(item.Id)}
        />
      );
  };
  const props: TableProps = {
    TotalRows: total,
    ListHeader: [
      { Name: "Recinto" },
      { Name: "Direccion" },
      { Name: "Eventos" },
      { Name: "Planos" },
      { Name: "Editar" },
    ],
    FilterSelected: undefined,
    GridHeader: CSS.grid!,
    OnRowEnd: () => {},
    RowRender: rowRender,
  };
  const { push } = useRouter();

  return <TableDesktop props={props} />;

  function handleMutation(id: string) {
    push(`/events/venue/${id}`);
  }
};
