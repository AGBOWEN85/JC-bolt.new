import { logError } from '../utils/errorHandling';

class SpeechToTextService {
  private recognition: SpeechRecognition | null = null;

  constructor() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  startListening(onResult: (text: string) => void, onError: (error: string) => void): void {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser.');
      return;
    }

    this.recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      onResult(text);
    };

    this.recognition.onerror = (event) => {
      onError(`Error occurred in recognition: ${event.error}`);
    };

    try {
      this.recognition.start();
    } catch (error) {
      logError(error as Error, { context: 'SpeechToTextService.startListening' });
      onError('Failed to start speech recognition.');
    }
  }

  stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

export const speechToTextService = new SpeechToTextService();