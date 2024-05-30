import {ExpansiveContainerInformation} from "@repo/ui/tableMobile";
import {ReadOnlyModal} from "@repo/ui/misc";

export default function ServiceExpand({item}: { item: any }) {

    return (
      <ExpansiveContainerInformation>
        <ReadOnlyModal props={{Pre: "Recinto"}}>{item.Name}</ReadOnlyModal>
        <ReadOnlyModal props={{Pre: "Direccion" }}>{item.Address}</ReadOnlyModal>
        <ReadOnlyModal props={{Pre: "Eventos" }}>{item.Events}</ReadOnlyModal>
        <ReadOnlyModal props={{Pre: "Recintos" }}>{item.Blueprints}</ReadOnlyModal>
      </ExpansiveContainerInformation>
    );
}
