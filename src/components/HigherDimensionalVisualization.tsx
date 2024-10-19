import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

interface HigherDimensionalVisualizationProps {
  data: number[][];
  title: string;
}

const HigherDimensionalVisualization: React.FC<HigherDimensionalVisualizationProps> = ({ data, title }) => {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (plotRef.current) {
      const dimensions = data[0].length;
      const traces = [];

      if (dimensions <= 3) {
        // 3D scatter plot for 3 or fewer dimensions
        traces.push({
          type: 'scatter3d',
          mode: 'markers',
          x: data.map(point => point[0]),
          y: data.map(point => point[1]),
          z: dimensions > 2 ? data.map(point => point[2]) : Array(data.length).fill(0),
          marker: {
            size: 5,
            color: data.map(point => point[dimensions - 1]),
            colorscale: 'Viridis'
          }
        });
      } else {
        // Parallel coordinates plot for higher dimensions
        const dimensions = data[0].map((_, i) => ({
          label: `Dim ${i + 1}`,
          values: data.map(point => point[i])
        }));

        traces.push({
          type: 'parcoords',
          line: {
            color: data.map(point => point[0]),
            colorscale: 'Viridis'
          },
          dimensions: dimensions
        });
      }

      Plotly.newPlot(plotRef.current, traces, {
        title: title,
        height: 600,
        margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 }
      });
    }
  }, [data, title]);

  return <div ref={plotRef} />;
};

export default HigherDimensionalVisualization;