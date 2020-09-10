import { IWord, IWords } from '../../models/word.model';


interface IWordsResponse {
  wordId: string;
  word: IWord;
  words: IWords;
}

export interface IGetWordsResponse extends Pick<IWordsResponse, 'words'> {
}

export interface IAddWordResponse extends Pick<IWordsResponse, 'word'> {
}

export interface IEditWordResponse extends Pick<IWordsResponse, 'word'> {
}

export interface IDeleteWordResponse extends Pick<IWordsResponse, 'wordId'> {
}

export interface ICompleteWordResponse extends Pick<IWordsResponse, 'word'> {
}

export interface IReturnWordResponse extends Pick<IWordsResponse, 'word'> {
}
