import { logError } from '../utils/errorHandling';

interface UserPreferences {
  language: string;
  topics: string[];
  responseLength: 'short' | 'medium' | 'long';
}

interface UserProfile {
  id: string;
  preferences: UserPreferences;
  interactionHistory: string[];
}

class UserProfileService {
  private profiles: Map<string, UserProfile> = new Map();

  async getProfile(userId: string): Promise<UserProfile | null> {
    return this.profiles.get(userId) || null;
  }

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      let profile = this.profiles.get(userId);
      if (!profile) {
        profile = {
          id: userId,
          preferences: {
            language: 'en',
            topics: [],
            responseLength: 'medium'
          },
          interactionHistory: []
        };
      }
      
      this.profiles.set(userId, { ...profile, ...updates });
    } catch (error) {
      logError(error as Error, { context: 'UserProfileService.updateProfile', userId });
    }
  }

  async addInteraction(userId: string, interaction: string): Promise<void> {
    try {
      const profile = await this.getProfile(userId);
      if (profile) {
        profile.interactionHistory.push(interaction);
        if (profile.interactionHistory.length > 100) {
          profile.interactionHistory.shift(); // Keep only the last 100 interactions
        }
        await this.updateProfile(userId, profile);
      }
    } catch (error) {
      logError(error as Error, { context: 'UserProfileService.addInteraction', userId });
    }
  }

  async getPreferences(userId: string): Promise<UserPreferences | null> {
    const profile = await this.getProfile(userId);
    return profile ? profile.preferences : null;
  }
}

export const userProfileService = new UserProfileService();