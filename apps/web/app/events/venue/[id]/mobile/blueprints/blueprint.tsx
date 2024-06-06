import { DefaultCardMobile, IDefaultCard } from "@repo/ui/defaultCard";
import {BlueprintResume} from "../../provider";

export default function Blueprint({ e }: { e: BlueprintResume }) {
  const props: IDefaultCard = {
     First: e.Name,
     Second: `${e.Sections} ${e.Sections === 1 ? "Seccion" : "Secciones"}`,
     Image: e.Image
  };
  return <DefaultCardMobile props={props}/>;
}
