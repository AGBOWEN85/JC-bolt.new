import { Complex } from 'complex.js';

class EvolutionaryOptimizer {
  private populationSize: number;
  private mutationRate: number;

  constructor(populationSize: number, mutationRate: number) {
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
  }

  async optimize(
    initialField: Complex[][],
    fitnessFunction: (field: Complex[][]) => number,
    generations: number
  ): Promise<Complex[][]> {
    let population = this.initializePopulation(initialField);
    
    for (let gen = 0; gen < generations; gen++) {
      const fitnessScores = await Promise.all(population.map(fitnessFunction));
      const parents = this.selectParents(population, fitnessScores);
      const offspring = this.crossover(parents);
      this.mutate(offspring);
      population = this.selectSurvivors(population, offspring, fitnessScores);
    }

    const finalFitnessScores = await Promise.all(population.map(fitnessFunction));
    const bestIndex = finalFitnessScores.indexOf(Math.max(...finalFitnessScores));
    return population[bestIndex];
  }

  private initializePopulation(initialField: Complex[][]): Complex[][][] {
    return Array(this.populationSize).fill(0).map(() => 
      initialField.map(row => row.map(complex => new Complex(complex.re, complex.im)))
    );
  }

  private selectParents(population: Complex[][][], fitnessScores: number[]): Complex[][][] {
    const totalFitness = fitnessScores.reduce((sum, score) => sum + score, 0);
    return Array(this.populationSize).fill(0).map(() => {
      let r = Math.random() * totalFitness;
      let index = 0;
      while (r > 0) {
        r -= fitnessScores[index];
        index++;
      }
      return population[index - 1];
    });
  }

  private crossover(parents: Complex[][][]): Complex[][][] {
    return parents.map((parent, i) => {
      if (i % 2 === 0) {
        const partner = parents[i + 1] || parents[0];
        const crossoverPoint = Math.floor(Math.random() * parent.length);
        return [
          ...parent.slice(0, crossoverPoint),
          ...partner.slice(crossoverPoint)
        ];
      }
      return parent;
    });
  }

  private mutate(population: Complex[][][]): void {
    population.forEach(individual => {
      individual.forEach(row => {
        row.forEach((complex, i) => {
          if (Math.random() < this.mutationRate) {
            const mutationFactor = new Complex(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1);
            row[i] = complex.add(mutationFactor);
          }
        });
      });
    });
  }

  private selectSurvivors(
    oldPopulation: Complex[][][],
    offspring: Complex[][][],
    oldFitnessScores: number[]
  ): Complex[][][] {
    const combinedPopulation = [...oldPopulation, ...offspring];
    const combinedFitnessScores = [...oldFitnessScores, ...offspring.map(() => -Infinity)];
    const sortedIndices = combinedFitnessScores
      .map((score, index) => ({ score, index }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.index);
    return sortedIndices.slice(0, this.populationSize).map(index => combinedPopulation[index]);
  }
}

export const evolutionaryOptimizer = new EvolutionaryOptimizer(50, 0.05);