import axios from 'axios';
import { logError } from '../utils/errorHandling';

class ExternalAPIService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.EXTERNAL_API_KEY || '';
  }

  async getWeatherData(city: string): Promise<any> {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`);
      return response.data;
    } catch (error) {
      logError(error as Error, { context: 'ExternalAPIService.getWeatherData', city });
      throw new Error('Failed to fetch weather data');
    }
  }

  async getNewsHeadlines(category: string): Promise<any> {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${this.apiKey}`);
      return response.data.articles;
    } catch (error) {
      logError(error as Error, { context: 'ExternalAPIService.getNewsHeadlines', category });
      throw new Error('Failed to fetch news headlines');
    }
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`, {
        q: text,
        target: targetLanguage
      });
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      logError(error as Error, { context: 'ExternalAPIService.translateText', targetLanguage });
      throw new Error('Failed to translate text');
    }
  }
}

export const externalAPIService = new ExternalAPIService();