import React, { useState, useEffect } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import styled from "styled-components";

// Styled Components for better UI
const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f4f4f9;
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
const mockData = {
  nodes: [
    { id: "1", data: { label: "Trump" } },
    { id: "2", data: { label: "Royce" } },
    { id: "3", data: { label: "Master Shifu" } },
    { id: "4", data: { label: "The Big Friendly Giant" } },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2", label: "Shoots the motherfucker in the head and kills him."},
    { id: "e2-3", source: "2", target: "3", label: "Beheads" },
    { id: "e3-4", source: "3", target: "4", label: "Marries" },
  ],
};



// Function to auto-position nodes
const generateLayout = (nodes) => {
  const spacingX = 200; // Horizontal spacing
  const spacingY = 150; // Vertical spacing
  return nodes.map((node, index) => ({
    ...node,
    position: { x: index * spacingX, y: (index % 2) * spacingY },
  }));
};

const Graph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(mockData.edges);

  useEffect(() => {
    // Auto-place nodes when component mounts
    setNodes(generateLayout(mockData.nodes));
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
