import React, { useState, useEffect } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import styled from "styled-components";

// Styled Components for better UI
const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color:rgb(12, 12, 62);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  overflow: hidden;
`;

const CustomNodeStyle = styled.div`
  background: #3498db;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

// Mock JSON Data (No Position)
let mockData = '{"nodes": [{"id": "0", "data": {"label": "tech industry"}}, {"id": "1", "data": {"label": "chip manufacturing"}}, {"id": "2", "data": {"label": "smartphone sales"}}, {"id": "3", "data": {"label": "electric vehicle production"}}, {"id": "4", "data": {"label": "Gaming console production"}}, {"id": "5", "data": {"label": "Automotive industry"}}, {"id": "6", "data": {"label": "Laptop manufacturing"}}, {"id": "7", "data": {"label": "Battery production"}}, {"id": "8", "data": {"label": "Automotive supply chain"}}, {"id": "9", "data": {"label": "Green energy initiatives"}}, {"id": "10", "data": {"label": "Gaming community"}}, {"id": "11", "data": {"label": "Console manufacturers"}}, {"id": "12", "data": {"label": "Holiday sales"}}, {"id": "13", "data": {"label": "Electric Vehicle Manufacturing"}}, {"id": "14", "data": {"label": "Renewable Energy Systems"}}, {"id": "15", "data": {"label": "Portable Electronics"}}, {"id": "16", "data": {"label": "Console sales"}}, {"id": "17", "data": {"label": "Gamer satisfaction"}}, {"id": "18", "data": {"label": "Esports industry"}}, {"id": "19", "data": {"label": "Automotive Industry"}}, {"id": "20", "data": {"label": "Green Energy Initiatives"}}, {"id": "21", "data": {"label": "Gaming Console Production"}}, {"id": "22", "data": {"label": "Gaming community"}}, {"id": "23", "data": {"label": "Console manufacturers"}}, {"id": "24", "data": {"label": "Esports industry"}}, {"id": "25", "data": {"label": "Employment rates"}}, {"id": "26", "data": {"label": "Auto part suppliers"}}, {"id": "27", "data": {"label": "Car prices"}}, {"id": "28", "data": {"label": "Gamer satisfaction"}}, {"id": "29", "data": {"label": "Esports industry"}}, {"id": "30", "data": {"label": "Console sales"}}, {"id": "31", "data": {"label": "Gaming industry"}}, {"id": "32", "data": {"label": "Esports industry"}}, {"id": "33", "data": {"label": "Gamer satisfaction"}}, {"id": "34", "data": {"label": "Unemployment benefits"}}, {"id": "35", "data": {"label": "Consumer spending"}}, {"id": "36", "data": {"label": "Government revenue"}}], "edges": [{"id": "e0-1", "source": "0", "target": "1", "label": "Production delays"}, {"id": "e0-2", "source": "0", "target": "2", "label": "Reduced supply"}, {"id": "e0-3", "source": "0", "target": "3", "label": "Component scarcity"}, {"id": "e1-4", "source": "1", "target": "4", "label": "Delayed releases"}, {"id": "e1-5", "source": "1", "target": "5", "label": "Component scarcity"}, {"id": "e1-6", "source": "1", "target": "6", "label": "Reduced output"}, {"id": "e3-7", "source": "3", "target": "7", "label": "Reduced capacity"}, {"id": "e3-8", "source": "3", "target": "8", "label": "Disrupted logistics"}, {"id": "e3-9", "source": "3", "target": "9", "label": "Slowed adoption"}, {"id": "e4-10", "source": "4", "target": "10", "label": "Frustrated gamers"}, {"id": "e4-11", "source": "4", "target": "11", "label": "Losses mounting"}, {"id": "e4-12", "source": "4", "target": "12", "label": "Lower revenues"}, {"id": "e7-13", "source": "7", "target": "13", "label": "Slowed Production"}, {"id": "e7-14", "source": "7", "target": "14", "label": "Limited Supply"}, {"id": "e7-15", "source": "7", "target": "15", "label": "Reduced Availability"}, {"id": "e10-16", "source": "10", "target": "16", "label": "Lower sales"}, {"id": "e10-17", "source": "10", "target": "17", "label": "Decreased morale"}, {"id": "e10-18", "source": "10", "target": "18", "label": "Tournament delays"}, {"id": "e13-19", "source": "13", "target": "19", "label": "Reduced Output"}, {"id": "e13-20", "source": "13", "target": "20", "label": "Slowed Adoption"}, {"id": "e13-21", "source": "13", "target": "21", "label": "Component Scarcity"}, {"id": "e16-22", "source": "16", "target": "22", "label": "Frustrated users"}, {"id": "e16-23", "source": "16", "target": "23", "label": "Losses mounting"}, {"id": "e16-24", "source": "16", "target": "24", "label": "Tournament delays"}, {"id": "e19-25", "source": "19", "target": "25", "label": "Job losses"}, {"id": "e19-26", "source": "19", "target": "26", "label": "Revenue decline"}, {"id": "e19-27", "source": "19", "target": "27", "label": "Price increase"}, {"id": "e22-28", "source": "22", "target": "28", "label": "Decreased morale"}, {"id": "e22-29", "source": "22", "target": "29", "label": "Tournament delays"}, {"id": "e22-30", "source": "22", "target": "30", "label": "Lower sales"}, {"id": "e23-31", "source": "23", "target": "31", "label": "Revenue decline"}, {"id": "e23-32", "source": "23", "target": "32", "label": "Tournament delays"}, {"id": "e23-33", "source": "23", "target": "33", "label": "Decreased morale"}, {"id": "e25-34", "source": "25", "target": "34", "label": "Claims increase"}, {"id": "e25-35", "source": "25", "target": "35", "label": "Reduced demand"}, {"id": "e25-36", "source": "25", "target": "36", "label": "Tax loss"}]}';
mockData = JSON.parse(mockData);

// Function to auto-position nodes in a circular layout
const generateCircularLayout = (nodes, parentId) => {
  const parentNode = nodes.find((node) => node.id === parentId);
  if (!parentNode) return nodes;

  const radius = 200; // radius of the circle
  const centerX = 300; // x position of the center
  const centerY = 300; // y position of the center
  const angleStep = (2 * Math.PI) / (nodes.length - 1);

  return nodes.map((node, index) => {
    if (node.id === parentId) {
      return {
        ...node,
        position: { x: centerX, y: centerY },
      };
    }
    
    const angle = angleStep * index;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return {
      ...node,
      position: { x, y },
    };
  });
};

const Graph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(mockData.edges);

  useEffect(() => {
    // Auto-place nodes when component mounts with circular layout
    setNodes(generateCircularLayout(mockData.nodes, "0"));
  }, []);

  return (
    <GraphContainer>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <MiniMap nodeStrokeColor="gray" nodeColor="lightblue" />
        <Controls />
      </ReactFlow>
    </GraphContainer>
  );
};

export default Graph;
