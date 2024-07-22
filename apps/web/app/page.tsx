import styles from "./page.module.css";
import Link from "next/link";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Algo",
  description: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
}

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Link href={"/events/venue"}>Ir a Eventos</Link>
    </main>
  );
}
