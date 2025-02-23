import React, { useState, useEffect } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import styled from "styled-components";
import { stratify, tree } from "d3-hierarchy";

// Styled Components for better UI
const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(12, 12, 62);
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

// Mock JSON Data
let mockData = JSON.parse(
  '{"nodes": [{"id": "0", "data": {"label": "Global Silicon Shortage"}}, {"id": "1", "data": {"label": "Semiconductor Industry"}}, {"id": "2", "data": {"label": "Renewable Energy"}}, {"id": "3", "data": {"label": "Consumer Electronics"}}, {"id": "4", "data": {"label": "Automotive Industry"}}, {"id": "5", "data": {"label": "Aerospace Industry"}}, {"id": "6", "data": {"label": "Telecommunications Sector"}}, {"id": "7", "data": {"label": "Car Sales Plummet"}}, {"id": "8", "data": {"label": "Auto Parts Suppliers Struggle"}}, {"id": "9", "data": {"label": "Electric Vehicle Adoption Slows"}}, {"id": "10", "data": {"label": "Investor Confidence Drop"}}, {"id": "11", "data": {"label": "Automaker Bankruptcies"}}, {"id": "12", "data": {"label": "Government Subsidies Increase"}}, {"id": "13", "data": {"label": "Job Losses"}}, {"id": "14", "data": {"label": "Economic Downturn"}}, {"id": "15", "data": {"label": "Government Bailouts"}}, {"id": "16", "data": {"label": "Automotive Industry"}}, {"id": "17", "data": {"label": "Consumer Electronics"}}, {"id": "18", "data": {"label": "Renewable Energy"}}, {"id": "19", "data": {"label": "Personal Computer Prices"}}, {"id": "20", "data": {"label": "Smartphone Availability"}}, {"id": "21", "data": {"label": "Data Center Capacity"}}, {"id": "22", "data": {"label": "Consumer Spending Power"}}, {"id": "23", "data": {"label": "Social Services Demand"}}, {"id": "24", "data": {"label": "Housing Market"}}, {"id": "25", "data": {"label": "Consumer Electronics"}}, {"id": "26", "data": {"label": "Solar Panel Industry"}}, {"id": "27", "data": {"label": "Automotive Industry"}}, {"id": "28", "data": {"label": "Retail Sales"}}, {"id": "29", "data": {"label": "E-commerce Platforms"}}, {"id": "30", "data": {"label": "Luxury Goods Sales"}}, {"id": "31", "data": {"label": "Smartphone Production"}}, {"id": "32", "data": {"label": "Data Center Expansion"}}, {"id": "33", "data": {"label": "Telecommunications Infrastructure"}}, {"id": "34", "data": {"label": "Luxury Goods Manufacturers"}}, {"id": "35", "data": {"label": "Luxury Goods Suppliers"}}, {"id": "36", "data": {"label": "Luxury Goods Investors"}}, {"id": "37", "data": {"label": "High-End Fashion Brands"}}, {"id": "38", "data": {"label": "Luxury Goods Suppliers"}}, {"id": "39", "data": {"label": "Luxury Goods Retailers"}}, {"id": "40", "data": {"label": "High-End Fashion Brands"}}, {"id": "41", "data": {"label": "Luxury Goods Suppliers"}}, {"id": "42", "data": {"label": "Luxury Goods Retailers"}}], "edges": [{"id": "e0-1", "source": "0", "target": "1", "label": "Production delays expected"}, {"id": "e0-2", "source": "0", "target": "2", "label": "Solar panel production slows"}, {"id": "e0-3", "source": "0", "target": "3", "label": "Device prices may rise"}, {"id": "e1-4", "source": "1", "target": "4", "label": "Production Delays"}, {"id": "e1-5", "source": "1", "target": "5", "label": "Project Delays"}, {"id": "e1-6", "source": "1", "target": "6", "label": "Infrastructure Delays"}, {"id": "e4-7", "source": "4", "target": "7", "label": "Reduced Revenue Streams"}, {"id": "e4-8", "source": "4", "target": "8", "label": "Supply Chain Disruptions"}, {"id": "e4-9", "source": "4", "target": "9", "label": "Sustainable Growth Stifled"}, {"id": "e7-10", "source": "7", "target": "10", "label": "Stock Market Volatility"}, {"id": "e7-11", "source": "7", "target": "11", "label": "Financial Instability"}, {"id": "e7-12", "source": "7", "target": "12", "label": "Fiscal Burden"}, {"id": "e11-13", "source": "11", "target": "13", "label": "Mass layoffs"}, {"id": "e11-14", "source": "11", "target": "14", "label": "Industry recession"}, {"id": "e11-15", "source": "11", "target": "15", "label": "Financial assistance"}, {"id": "e13-16", "source": "13", "target": "16", "label": "Increased Unemployment Rates"}, {"id": "e13-17", "source": "13", "target": "17", "label": "Supply Chain Labor Shortages"}, {"id": "e13-18", "source": "13", "target": "18", "label": "Reduced Solar Panel Manufacturing"}, {"id": "e14-19", "source": "14", "target": "19", "label": "Prices increase significantly"}, {"id": "e14-20", "source": "14", "target": "20", "label": "Limited models and stock"}, {"id": "e14-21", "source": "14", "target": "21", "label": "Expansion projects delayed"}, {"id": "e16-22", "source": "16", "target": "22", "label": "Decreased purchasing power"}, {"id": "e16-23", "source": "16", "target": "23", "label": "Increased demand"}, {"id": "e16-24", "source": "16", "target": "24", "label": "Potential decrease in demand"}, {"id": "e19-25", "source": "19", "target": "25", "label": "Higher PC Prices Expected"}, {"id": "e19-26", "source": "19", "target": "26", "label": "Reduced Production Capacity"}, {"id": "e19-27", "source": "19", "target": "27", "label": "Increased Costs for In-Dash Computers"}, {"id": "e22-28", "source": "22", "target": "28", "label": "Sales figures decline"}, {"id": "e22-29", "source": "22", "target": "29", "label": "Revenue drops significantly"}, {"id": "e22-30", "source": "22", "target": "30", "label": "Market share shrinks"}, {"id": "e25-31", "source": "25", "target": "31", "label": "Limited models and stock"}, {"id": "e25-32", "source": "25", "target": "32", "label": "Delayed projects"}, {"id": "e25-33", "source": "25", "target": "33", "label": "Slower development"}, {"id": "e30-34", "source": "30", "target": "34", "label": "Revenue decreases"}, {"id": "e30-35", "source": "30", "target": "35", "label": "Demand falls"}, {"id": "e30-36", "source": "30", "target": "36", "label": "Stock price drops"}, {"id": "e34-37", "source": "34", "target": "37", "label": "Reduced Production Capacity"}, {"id": "e34-38", "source": "34", "target": "38", "label": "Decreased Supply Chain"}, {"id": "e34-39", "source": "34", "target": "39", "label": "Reduced Inventory Levels"}, {"id": "e37-40", "source": "37", "target": "40", "label": "Reduced Production Capacity"}, {"id": "e37-41", "source": "37", "target": "41", "label": "Decreased Supply Chain"}, {"id": "e37-42", "source": "37", "target": "42", "label": "Reduced Inventory Levels"}]}'
);

// Function to auto-position nodes in a tree layout
const getLayoutedElements = (nodes, edges) => {
  if (nodes.length === 0) return { nodes, edges };

  // Create a hierarchy
  const hierarchy = stratify()
    .id((node) => node.id)
    .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);

  // Find the root node
  const root = hierarchy(nodes);

  // Define the tree layout
  const layout = tree().nodeSize([200, 200]);

  // Position the nodes
  const layoutedNodes = layout(root)
    .descendants()
    .map((node) => ({
      ...node.data,
      position: { x: node.x, y: node.y },
    }));

  return { nodes: layoutedNodes, edges };
};

// Custom Node Component
const CustomNode = ({ data }) => (
  <CustomNodeStyle>{data.label}</CustomNodeStyle>
);

const Graph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(mockData.edges);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      mockData.nodes,
      mockData.edges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, []);

  return (
    <GraphContainer>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={{ custom: CustomNode }}>
        <Background />
        <MiniMap nodeStrokeColor="gray" nodeColor="lightblue" />
        <Controls />
      </ReactFlow>
    </GraphContainer>
  );
};

export default Graph;
