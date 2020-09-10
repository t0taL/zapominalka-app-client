import { Pipe, PipeTransform } from '@angular/core';

import { IWord } from '@api/models/word.model';


@Pipe({ name: 'searcher' })
export class SearcherPipe implements PipeTransform {
  transform(words: IWord[], searchedValue: string): IWord[] {
    searchedValue = searchedValue.toLowerCase();
    return words.filter((word: IWord) => word.value.includes(searchedValue));
  }
}
