import { IWord } from '../../models/word.model';


interface ILearnRequest {
  words: IWord[];
}

export interface ISaveLearnResultRequest extends Pick<ILearnRequest, 'words'> {
}
