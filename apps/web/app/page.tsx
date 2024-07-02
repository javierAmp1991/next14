import styles from "./page.module.css";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Link href={"/events/venue"}>Ir a Eventos</Link>
    </main>
  );
}
