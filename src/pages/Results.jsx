/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Sky from "../models/Sky"; 
import InfoPane from "../components/InfoPane";
import Result from "../components/Result";
import "../pages/Results.css";

const Results = () => {
  const location = useLocation();
  const { searchResults } = location.state || {};
  const [selectedResult, setSelectedResult] = useState(null);

  const handleCloseInfoPane = () => {
    setSelectedResult(null);
  };

  if (!searchResults || searchResults.length === 0) {
    return (
      <Layout title="No Results">
        <p>No results found.</p>
        <button onClick={() => window.history.back()} className="btn-back">
          Go Back
        </button>
      </Layout>
    );
  }

  return (
    <section className="w-full h-screen relative">
      <Canvas className="w-full h-screen bg-transparent">
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <Sky />
        </Suspense>
      </Canvas>
      <div className="results-container">
        {searchResults.map((result, index) => (
          <Result
            key={index}
            searchResult={result}
            active={selectedResult === result}
            onClick={() => setSelectedResult(result)}
          />
        ))}
      </div>
      <div className={selectedResult ? "info-pane-visible" : "info-pane-hidden"}>
        {selectedResult && (
          <InfoPane
            result={selectedResult}
            onClose={handleCloseInfoPane} // Passing the close handler to InfoPane
          />
        )}
      </div>
    </section>
  );
};

export default Results;
