import styles from "./page.module.css";
import Link from "next/link";
export const metadata = {
  title: "Algo",
  Content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
}

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Link href={"/events/venue"}>Ir a Eventos</Link>
    </main>
  );
}
