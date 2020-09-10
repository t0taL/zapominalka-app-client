import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from 'app/api/services/api.service';

import {
  IAddWordRequest,
  IEditWordRequest,
  IDeleteWordRequest,
  ICompleteWordRequest,
  IReturnWordRequest
} from '@api/interfaces/words/words-request.interface';
import {
  IGetWordsResponse,
  IAddWordResponse,
  IEditWordResponse,
  IDeleteWordResponse,
  ICompleteWordResponse,
  IReturnWordResponse
} from '@api/interfaces/words/words-response.interface';


@Injectable()
export class WordsService {
  constructor(private apiService: ApiService) {
  }

  getWords(): Observable<IGetWordsResponse> {
    return this.apiService.get<IGetWordsResponse>('words');
  }

  addWord(data: IAddWordRequest): Observable<IAddWordResponse> {
    return this.apiService.post<IAddWordResponse>('words', data);
  }

  editWord(data: IEditWordRequest): Observable<IEditWordResponse> {
    return this.apiService.put<IEditWordResponse>('words', data);
  }

  deleteWord(data: IDeleteWordRequest): Observable<IDeleteWordResponse> {
    const params = new HttpParams().set('wordId', data.wordId);
    return this.apiService.delete<IDeleteWordResponse>('words', params);
  }

  completeWord(data: ICompleteWordRequest): Observable<ICompleteWordResponse> {
    const params = new HttpParams().set('wordId', data.wordId);
    return this.apiService.post<ICompleteWordResponse>('words/complete', {}, params);
  }

  returnWord(data: IReturnWordRequest): Observable<IReturnWordResponse> {
    const params = new HttpParams().set('wordId', data.wordId);
    return this.apiService.post<IReturnWordResponse>('words/return', {}, params);
  }
}
