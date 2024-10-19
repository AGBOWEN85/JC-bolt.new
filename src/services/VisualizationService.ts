import * as d3 from 'd3';

class VisualizationService {
  async createQuantumStateVisualization(amplitudes: number[], phases: number[]): Promise<void> {
    const svg = d3.select('#quantum-state-visualization');
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    svg.attr('width', width).attr('height', height);

    const x = d3.scaleBand()
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleLinear<string>()
      .domain([0, Math.PI, 2 * Math.PI])
      .range(['#ff0000', '#00ff00', '#0000ff']);

    x.domain(amplitudes.map((_, i) => i.toString()));
    y.domain([0, d3.max(amplitudes) || 0]);

    svg.selectAll('.bar')
      .data(amplitudes)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i.toString()) || 0)
      .attr('y', d => y(d))
      .attr('width', x.bandwidth())
      .attr('height', d => height - margin.bottom - y(d))
      .attr('fill', (d, i) => color(phases[i]));

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 5)
      .attr('text-anchor', 'middle')
      .text('Quantum State');
  }
}

export const visualizationService = new VisualizationService();