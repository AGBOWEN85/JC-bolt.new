import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ecosystemIntelligence } from '../core/EcosystemIntelligence';

interface Organism {
  id: string;
  type: string;
  fitness: number;
  specialization: string;
}

interface Relationship {
  source: string;
  target: string;
  type: 'mutualism' | 'commensalism' | 'competition';
  strength: number;
}

const EcosystemVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [ecosystemStats, setEcosystemStats] = useState({
    diversity: 0,
    adaptability: 0,
    symbiosis: 0,
    resilience: 0
  });

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const width = 800;
      const height = 600;
      svg.attr('width', width).attr('height', height);

      const organisms = ecosystemIntelligence.getOrganisms();
      const relationships = ecosystemIntelligence.getRelationships();

      const simulation = d3.forceSimulation(organisms as d3.SimulationNodeDatum[])
        .force('link', d3.forceLink(relationships).id((d: any) => d.id).strength((d: any) => d.strength))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(width / 2, height / 2));

      const link = svg.append('g')
        .selectAll('line')
        .data(relationships)
        .enter().append('line')
        .attr('stroke-width', (d: Relationship) => d.strength * 2)
        .attr('stroke', (d: Relationship) => {
          switch (d.type) {
            case 'mutualism': return '#4CAF50';
            case 'commensalism': return '#2196F3';
            case 'competition': return '#F44336';
            default: return '#999';
          }
        });

      const node = svg.append('g')
        .selectAll('circle')
        .data(organisms)
        .enter().append('circle')
        .attr('r', (d: Organism) => 5 + d.fitness * 5)
        .attr('fill', (d: Organism) => {
          switch (d.type) {
            case 'bacteria': return '#66c2a5';
            case 'plant': return '#fc8d62';
            case 'insect': return '#8da0cb';
            case 'animal': return '#e78ac3';
            default: return '#a6d854';
          }
        })
        .call(d3.drag<SVGCircleElement, Organism>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any);

      node.append('title')
        .text((d: Organism) => `${d.type} (${d.specialization})\nFitness: ${d.fitness.toFixed(2)}`);

      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        node
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y);
      });

      function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Organism, Organism>, d: Organism) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: d3.D3DragEvent<SVGCircleElement, Organism, Organism>, d: Organism) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: d3.D3DragEvent<SVGCircleElement, Organism, Organism>, d: Organism) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      // Update ecosystem stats
      setEcosystemStats({
        diversity: ecosystemIntelligence.getOrganismDiversity(),
        adaptability: ecosystemIntelligence.getAdaptabilityScore(),
        symbiosis: ecosystemIntelligence.getSymbiosisStrength(),
        resilience: ecosystemIntelligence.getResilienceScore()
      });
    }
  }, []);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Ecosystem Visualization</h2>
      <svg ref={svgRef}></svg>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Ecosystem Stats</h3>
        <ul>
          <li>Diversity: {ecosystemStats.diversity.toFixed(2)}</li>
          <li>Adaptability: {ecosystemStats.adaptability.toFixed(2)}</li>
          <li>Symbiosis Strength: {ecosystemStats.symbiosis.toFixed(2)}</li>
          <li>Resilience: {ecosystemStats.resilience.toFixed(2)}</li>
        </ul>
      </div>
    </div>
  );
};

export default EcosystemVisualization;