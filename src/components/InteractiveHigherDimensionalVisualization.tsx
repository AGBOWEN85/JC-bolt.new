import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist-min';

interface InteractiveHigherDimensionalVisualizationProps {
  data: number[][];
  title: string;
}

const InteractiveHigherDimensionalVisualization: React.FC<InteractiveHigherDimensionalVisualizationProps> = ({ data, title }) => {
  const plotRef = useRef<HTMLDivElement>(null);
  const [selectedDimensions, setSelectedDimensions] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    if (plotRef.current) {
      updatePlot();
    }
  }, [data, selectedDimensions]);

  const updatePlot = () => {
    const dimensions = data[0].length;
    const traces = [{
      type: 'scatter3d',
      mode: 'markers',
      x: data.map(point => point[selectedDimensions[0]]),
      y: data.map(point => point[selectedDimensions[1]]),
      z: data.map(point => point[selectedDimensions[2]]),
      marker: {
        size: 5,
        color: data.map(point => point[dimensions - 1]),
        colorscale: 'Viridis'
      }
    }];

    Plotly.react(plotRef.current, traces, {
      title: title,
      scene: {
        xaxis: { title: `Dimension ${selectedDimensions[0] + 1}` },
        yaxis: { title: `Dimension ${selectedDimensions[1] + 1}` },
        zaxis: { title: `Dimension ${selectedDimensions[2] + 1}` }
      },
      height: 600,
      margin: { l: 0, r: 0, b: 0, t: 50, pad: 4 }
    });
  };

  const handleDimensionChange = (index: number, value: number) => {
    const newDimensions = [...selectedDimensions];
    newDimensions[index] = value;
    setSelectedDimensions(newDimensions);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex space-x-4 mb-4">
        {[0, 1, 2].map((index) => (
          <select
            key={index}
            value={selectedDimensions[index]}
            onChange={(e) => handleDimensionChange(index, parseInt(e.target.value))}
            className="border rounded p-2"
          >
            {data[0].map((_, dimIndex) => (
              <option key={dimIndex} value={dimIndex}>
                Dimension {dimIndex + 1}
              </option>
            ))}
          </select>
        ))}
      </div>
      <div ref={plotRef} />
    </div>
  );
};

export default InteractiveHigherDimensionalVisualization;