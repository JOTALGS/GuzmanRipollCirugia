import React from "react";
import { ResultsCarousel } from "../components/resultados/results-carousel";

export default function Resultados() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      color: 'black',
      margin: 0,
      padding: 0
    }}>
      {/* NavBar ya está incluido en App.js, no lo duplicamos aquí */}
      <main style={{ paddingTop: '80px' }}>
        <ResultsCarousel />
      </main>
    </div>
  );
}
