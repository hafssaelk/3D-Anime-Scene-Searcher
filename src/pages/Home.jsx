/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import "../components/Home.css";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (input) => {
    try {
      let imageUrl = input;
  
      if (input instanceof File) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          imageUrl = reader.result;
          performSearch(imageUrl);
        };
        reader.readAsDataURL(input);
      } else {
        performSearch(imageUrl);
      }
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };
  
  const performSearch = async (imageUrl) => {
    try {
      const response = await axios.get(
        `https://api.trace.moe/search?url=${encodeURIComponent(imageUrl)}`
      );
      navigate("/results", { state: { searchResults: response.data.result } });
    } catch (error) {
      console.error("Error fetching data from Trace.moe API:", error);
    }
  };

  const adjustIslandForScreensize = () => {
    let screenScale = null;
    let screenPosition = [0, -13, -80];
    let rotation = [0.1, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreensize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreensize();
  const [planeScale, planePosition] = adjustPlaneForScreensize();

  return (
    <section className="w-full h-screen relative">
      <SearchBar onSearch={handleSearch} />
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skycolor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          <Plane
            isRotating={isRotating}
            planeScale={planeScale}
            planePosition={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
