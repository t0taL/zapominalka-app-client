import { IWord } from '../../models/word.model';


interface IWordsRequest {
  wordId: string;
  word: IWord;
}

export interface IAddWordRequest extends Pick<IWordsRequest, 'word'> {
}

export interface IEditWordRequest extends Pick<IWordsRequest, 'word'> {
}

export interface IDeleteWordRequest extends Pick<IWordsRequest, 'wordId'> {
}

export interface ICompleteWordRequest extends Pick<IWordsRequest, 'wordId'> {
}

export interface IReturnWordRequest extends Pick<IWordsRequest, 'wordId'> {
}
