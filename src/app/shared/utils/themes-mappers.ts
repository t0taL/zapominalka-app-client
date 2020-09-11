import { Themes } from '@shared/enums/themes';


const themeColorMapper: { [key: string]: string } = {
  [Themes.LIGHT_DEFAULT]: '#8ec6c5',
  [Themes.LIGHT_GREEN]: '#cceabb',
  [Themes.LIGHT_BLUE]: '#a6b1e1',
  [Themes.LIGHT_PURPLE]: '#bb99cd',
  [Themes.DARK_DEFAULT]: '#6ba8a9',
  [Themes.DARK_GREEN]: '#1f6650',
  [Themes.DARK_BLUE]: '#36506c',
  [Themes.DARK_PURPLE]: '#4f3b78'
};

const themeNameMapper: { [key: string]: string } = {
  [Themes.LIGHT_DEFAULT]: 'Light default',
  [Themes.LIGHT_GREEN]: 'Light green',
  [Themes.LIGHT_BLUE]: 'Light blue',
  [Themes.LIGHT_PURPLE]: 'Light purple',
  [Themes.DARK_DEFAULT]: 'Dark default',
  [Themes.DARK_GREEN]: 'Dark green',
  [Themes.DARK_BLUE]: 'Dark blue',
  [Themes.DARK_PURPLE]: 'Dark purple'
};

export function getThemeColor(theme: Themes): string {
  return themeColorMapper[theme] || '';
}

export function getThemeName(theme: Themes): string {
  return themeNameMapper[theme] || '';
}
