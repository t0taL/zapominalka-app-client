import { IWord } from '../../models/word.model';


interface ILearnResponse {
  words: IWord[];
  message: string;
}

export interface IGetWordsResponse extends Pick<ILearnResponse, 'words'> {
}

export interface ISaveLearnResultResponse extends Pick<ILearnResponse, 'message'> {
}
