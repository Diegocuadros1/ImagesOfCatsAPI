import "./styles.css";
import { useState } from "react";
import Header from "./Header";
import CatForm from "./CatForm";

export default function App() {
  return (
    <main>
      <Header />
      <section>
        <CatForm />
      </section>
    </main>
  );
}
