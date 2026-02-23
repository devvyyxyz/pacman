export type Difficulty = 'easy' | 'normal' | 'hard';

export const DEFAULT_CONFIG = {
  assets: {
    coinPath: '/assets/coin',
    ghostPath: '/assets/ghost'
  },
  settings: {
    sound: true,
    music: true,
    difficulty: 'normal' as Difficulty,
    skin: 'classic'
  },
  // leave empty here in source control; prefer using VITE_DISCORD_WEBHOOK_URL
  discordWebhook: '' as string,
  // path to a JSON file containing level / map data
  gameDataPath: '/game-data.json'
};

export type AppConfig = typeof DEFAULT_CONFIG;
