import { Themes } from '@shared/enums/themes';


const themeColorMapper: { [key: string]: string } = {
  [Themes.LIGHT_DEFAULT]: '#8ec6c5',
  [Themes.LIGHT_GREEN]: '#75daad',
  [Themes.LIGHT_BLUE]: '#3282b8',
  [Themes.LIGHT_YELLOW]: '#e3b04b',
  [Themes.LIGHT_RED]: '#c81912',
  [Themes.DARK_DEFAULT]: '#4f8a8b',
  [Themes.DARK_GREEN]: '#6ba8a9',
  [Themes.DARK_BLUE]: '#5893d4',
  [Themes.DARK_YELLOW]: '#ffdb40',
  [Themes.DARK_RED]: '#f73859'
};

const themeNameMapper: { [key: string]: string } = {
  [Themes.LIGHT_DEFAULT]: 'Light default',
  [Themes.LIGHT_GREEN]: 'Light green',
  [Themes.LIGHT_BLUE]: 'Light blue',
  [Themes.LIGHT_YELLOW]: 'Light yellow',
  [Themes.LIGHT_RED]: 'Light red',
  [Themes.DARK_DEFAULT]: 'Dark default',
  [Themes.DARK_GREEN]: 'Dark green',
  [Themes.DARK_BLUE]: 'Dark blue',
  [Themes.DARK_YELLOW]: 'Dark yellow',
  [Themes.DARK_RED]: 'Dark red'
};

export function getThemeColor(theme: Themes): string {
  return themeColorMapper[theme] || '';
}

export function getThemeName(theme: Themes): string {
  return themeNameMapper[theme] || '';
}
