export interface IWord {
  _id: string;
  locale: Locale;
  value: string;
  translation: string[];
  repeatCount: number;
}

export enum Locale {
  EN = 'en',
  RU = 'ru'
}

export interface IWords {
  newWords: IWord[];
  completedWords: IWord[];
}
