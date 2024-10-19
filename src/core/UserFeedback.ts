import { logError } from '../utils/errorHandling';
import { advancedLanguageModel } from './AdvancedLanguageModel';
import { knowledgeGraph } from './KnowledgeGraph';

interface Feedback {
  userId: string;
  messageId: string;
  rating: number;
  comment?: string;
}

class UserFeedback {
  private feedbackBuffer: Feedback[] = [];
  private processingThreshold: number = 10;

  async addFeedback(feedback: Feedback): Promise<void> {
    this.feedbackBuffer.push(feedback);
    if (this.feedbackBuffer.length >= this.processingThreshold) {
      await this.processFeedback();
    }
  }

  private async processFeedback(): Promise<void> {
    try {
      const feedbackToProcess = [...this.feedbackBuffer];
      this.feedbackBuffer = [];

      const aggregatedFeedback = this.aggregateFeedback(feedbackToProcess);
      await this.updateKnowledgeBase(aggregatedFeedback);
      await this.adjustResponseGeneration(aggregatedFeedback);
    } catch (error) {
      logError(error as Error, { context: 'UserFeedback.processFeedback' });
    }
  }

  private aggregateFeedback(feedbackList: Feedback[]): Map<string, { avgRating: number, comments: string[] }> {
    const aggregated = new Map<string, { totalRating: number, count: number, comments: string[] }>();

    for (const feedback of feedbackList) {
      const current = aggregated.get(feedback.messageId) || { totalRating: 0, count: 0, comments: [] };
      current.totalRating += feedback.rating;
      current.count += 1;
      if (feedback.comment) current.comments.push(feedback.comment);
      aggregated.set(feedback.messageId, current);
    }

    return new Map(
      Array.from(aggregated.entries()).map(([messageId, data]) => [
        messageId,
        { avgRating: data.totalRating / data.count, comments: data.comments }
      ])
    );
  }

  private async updateKnowledgeBase(aggregatedFeedback: Map<string, { avgRating: number, comments: string[] }>): Promise<void> {
    for (const [messageId, { avgRating, comments }] of aggregatedFeedback.entries()) {
      if (avgRating < 3) { // For low-rated responses
        const combinedComments = comments.join(' ');
        const analysis = await advancedLanguageModel.generateText(
          `Analyze the following feedback and suggest improvements: ${combinedComments}`,
          true // Use GPT-4 for analysis
        );
        const keywords = await advancedLanguageModel.generateText(
          `Extract key concepts from this analysis: ${analysis}`,
          true
        );
        const keywordList = keywords.split(',').map(k => k.trim());

        for (const keyword of keywordList) {
          await knowledgeGraph.addConcept(keyword, { needsImprovement: true, suggestedImprovement: analysis });
        }
      }
    }
  }

  private async adjustResponseGeneration(aggregatedFeedback: Map<string, { avgRating: number, comments: string[] }>): Promise<void> {
    const overallAvgRating = Array.from(aggregatedFeedback.values())
      .reduce((sum, { avgRating }) => sum + avgRating, 0) / aggregatedFeedback.size;

    if (overallAvgRating < 4) { // If overall satisfaction is low
      const allComments = Array.from(aggregatedFeedback.values())
        .flatMap(({ comments }) => comments)
        .join(' ');

      const improvementSuggestion = await advancedLanguageModel.generateText(
        `Based on this feedback, suggest improvements for our response generation: ${allComments}`,
        true // Use GPT-4 for analysis
      );

      // Here, you would implement logic to adjust your response generation based on the suggestion
      // For example, you could update prompt templates, adjust model parameters, or flag certain topics for review
      console.log('Improvement suggestion for response generation:', improvementSuggestion);
    }
  }
}

export const userFeedback = new UserFeedback();