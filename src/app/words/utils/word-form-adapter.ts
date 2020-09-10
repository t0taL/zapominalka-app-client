import { IWord } from '@api/models/word.model';


export function wordTranslationFromFormAdapter({ locale, value, translation }): IWord {
  const translationArray = [ ...translation.split(', ') ];
  return { locale, value, translation: translationArray } as IWord;
}

export function wordTranslationToFormAdapter({ locale, value, translation }): IWord {
  const translationString = translation.join(', ');
  return { locale, value, translation: translationString } as IWord;
}
