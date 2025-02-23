import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import axios from 'axios';
import Graph from './Graph'; // Import the Graph component
import styled from 'styled-components';

// Styled Component for the Graph Container
const GraphContainer = styled.div`
  width: ${(props) => (props.isMinimized ? '250px' : '90%')};
  height: ${(props) => (props.isMinimized ? '150px' : '90vh')};
  position: absolute;
  top: 20px;
  right: 20px;
  transition: width 0.3s, height 0.3s;
  z-index: 1000;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  cursor: pointer;
`;

// Styled Component for the Text Display
const TextContainer = styled.div`
  width: 300px;
  height: 200px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #00F9FF;
  z-index: 1000;
  overflow-y: auto;
  max-height: 300px;
`;

const GlobeComponent = () => {
  const [countryData, setCountryData] = useState([]);
  const [geoJson, setGeoJson] = useState(null);
  const [clickedCountry, setClickedCountry] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGraphMinimized, setIsGraphMinimized] = useState(true);
  const [dynamicText, setDynamicText] = useState(''); // State to store dynamic text
  const globeRef = useRef(null);

  // Fetch mock country score data
  useEffect(() => {
    const mockData = [
      { name: "United States of America", score: 90, description: "The United States is a global superpower with the largest economy." },
      { name: "Brazil", score: 70, description: "Brazil is known for its rainforests, soccer, and Carnival festival." },
      { name: "Germany", score: 85, description: "Germany is a leading industrial country in Europe with a rich cultural history." },
      { name: "India", score: 60, description: "India is the world's largest democracy and a major economic force in Asia." },
      { name: "Australia", score: 80, description: "Australia is known for its unique wildlife, beautiful landscapes, and beaches." },
      { name: "Canada", score: 75, description: "Canada is the second-largest country by land area and famous for its natural beauty." },
      { name: "China", score: 95, description: "China is the world's most populous country and an economic powerhouse." },
      { name: "Russia", score: 50, description: "Russia is the largest country by land area and rich in natural resources." },
      { name: "South Africa", score: 65, description: "South Africa is known for its diverse cultures, wildlife, and beautiful landscapes." },
      { name: "Mexico", score: 55, description: "Mexico is known for its rich cultural heritage, cuisine, and beautiful beaches." }
    ];
    setCountryData(mockData);
  }, []);

  // Fetch GeoJSON data for countries
  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then((response) => {
        setGeoJson(response.data);
      })
      .catch((error) => {
        console.error('Error fetching GeoJSON data', error);
      });
  }, []);

  // Fetch dynamic text from backend (replace with your backend URL)
  useEffect(() => {
    axios.get('https://your-backend-api.com/get-text')  // Replace with actual API URL
      .then((response) => {
        setDynamicText(response.data.text);  // Assuming your API returns an object with a "text" field
      })
      .catch((error) => {
        console.error('Error fetching dynamic text', error);
      });
  }, []);

  // Map country data to GeoJSON feature properties
  const colorCountries = geoJson && countryData.length > 0 ? geoJson.features.map((feature) => {
    const countryName = feature.properties.name;
    const country = countryData.find(country => country.name === countryName);

    return {
      ...feature,
      properties: {
        ...feature.properties,
        score: country?.score,
        description: country?.description,
        color: country?.score !== undefined ? `rgba(255, 0, 0, ${Math.min(country.score / 100, 1)})` : 'rgba(255, 255, 255, 0.1)',
      }
    };
  }) : [];

  // Handle click event
  const handleClick = (country) => {
    setClickedCountry(country ? country.properties : null);
  };

  // Add lighting and camera controls
  useEffect(() => {
    if (globeRef.current) {
      const globe = globeRef.current;
      const scene = globe.scene();
      const camera = globe.camera();
      const renderer = globe.renderer();

      renderer.setPixelRatio(window.devicePixelRatio);

      const ambientLight = new THREE.AmbientLight(0xbbbbbb);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      scene.add(ambientLight);
      scene.add(directionalLight);

      camera.near = 0.1;
      camera.far = 5000;
      camera.updateProjectionMatrix();

      const controls = new TrackballControls(camera, renderer.domElement);
      controls.minDistance = 120;
      controls.rotateSpeed = 2;
      controls.zoomSpeed = 1;

      const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [globeRef]);

  // Check if globe image is loaded
  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = "//unpkg.com/three-globe/example/img/earth-topology.png";
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {!isLoaded && <div style={{ color: 'white', fontSize: '24px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading...</div>}
      
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        polygonsData={colorCountries}
        polygonCapColor={d => d.properties.color}
        polygonSideColor="rgba(0, 200, 0, 0.1)"
        polygonStrokeColor="#111"
        polygonAltitude={0.01}
        showGraticules
        onPolygonClick={handleClick}
      />
      
      {/* Input Form - Top Left */}
      <div 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '10px',
          background: 'rgba(0, 0, 0, 0.6)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          zIndex: 1000,
        }}
      >
        <input
          type="text"
          placeholder="Enter your hypothetical scenario"
          style={{
            padding: '15px',
            fontSize: '18px',
            border: '2px solid #00F9FF',
            borderRadius: '8px',
            color: '#fff',
            backgroundColor: 'transparent',
            width: '300px',
            textAlign: 'center',
            marginBottom: '20px',
            transition: 'all 0.3s ease-in-out',
            outline: 'none',
          }}
          onFocus={(e) => e.target.style.borderColor = '#00FF99'}
          onBlur={(e) => e.target.style.borderColor = '#00F9FF'}
        />
        <button
          style={{
            padding: '12px 18px',
            backgroundColor: '#00F9FF',
            color: 'black',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'all 0.3s ease-in-out',
            width: '200px',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#00FF99'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#00F9FF'}
        >
          Predict
        </button>
      </div>
      
      {/* Graph Container - Toggle Minimize/Expand */}
      <GraphContainer
        isMinimized={isGraphMinimized}
        onClick={() => setIsGraphMinimized(!isGraphMinimized)}
      >
        <Graph />
      </GraphContainer>

      {/* Dynamic Text Container */}
      <TextContainer>
        <h3>Dynamic Information</h3>
        <p>{dynamicText || "Loading dynamic text..."}</p>
      </TextContainer>

      {/* Popup for country info */}
      {clickedCountry && (
        <div 
          style={{
            position: 'absolute',
            bottom: '150px',
            right: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            maxWidth: '300px',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '2px solid #00F9FF',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0' }}>{clickedCountry.name}</h3>
          <p style={{ margin: 0 }}>{clickedCountry.description}</p>
        </div>
      )}
    </div>
  );
};

export default GlobeComponent;
