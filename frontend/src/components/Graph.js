import React from 'react';
import { Network } from 'react-vis-network';

const Graph = () => {
  // Mock data for nodes and edges
  const nodes = [
    { id: 1, label: 'Node 1', value: 10 },
    { id: 2, label: 'Node 2', value: 20 },
    { id: 3, label: 'Node 3', value: 15 },
    { id: 4, label: 'Node 4', value: 25 },
  ];

  const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
  ];

  // Options for customizing the appearance
  const options = {
    nodes: {
      shape: 'circle',
      size: 30,
      font: {
        size: 14,
      },
    },
    edges: {
      width: 2,
      color: '#000000',
      smooth: { type: 'continuous' },
    },
    physics: {
      enabled: true,
    },
  };

  return (
    <div style={{ height: '400px',paddingTop:'1000px' }}>
      <Network
        data={{ nodes, edges }}
        options={options}
      />
    </div>
  );
};

export default Graph;
