export type SettingType = 'toggle' | 'select' | 'button';

export type SettingMeta = {
  id: string;
  label: string;
  type: SettingType;
  implemented?: boolean; // if false, will be greyed out
  description?: string;
  options?: string[]; // for select
}

const SETTINGS: SettingMeta[] = [
  { id: 'sound', label: 'Sound effects', type: 'toggle', implemented: true, description: 'Enable in-game sound effects' },
  { id: 'music', label: 'Music', type: 'toggle', implemented: true, description: 'Toggle background music' },
  { id: 'difficulty', label: 'Difficulty', type: 'select', implemented: true, options: ['easy','normal','hard'], description: 'AI and game speed' },
  { id: 'skin', label: 'Skin', type: 'select', implemented: true, options: ['classic','neon','ghost'], description: 'Player skin selection' },
  { id: 'highContrast', label: 'High Contrast Mode', type: 'toggle', implemented: false, description: 'Experimental accessibility mode (coming soon)' },
  { id: 'onlineLeaderboard', label: 'Online Leaderboards', type: 'toggle', implemented: false, description: 'Upload scores to global leaderboard (not yet implemented)' }
];

export default SETTINGS;
