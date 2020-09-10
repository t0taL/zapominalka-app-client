import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'app/api/services/api.service';

import { ISaveLearnResultRequest } from '@api/interfaces/learn/learn-request.interface';
import { IGetWordsResponse, ISaveLearnResultResponse } from '@api/interfaces/learn/learn-response.interface';


@Injectable()
export class LearnService {
  constructor(private apiService: ApiService) {
  }

  getWords(): Observable<IGetWordsResponse> {
    return this.apiService.get<IGetWordsResponse>('learn');
  }

  saveLearnResult(words: ISaveLearnResultRequest): Observable<ISaveLearnResultResponse> {
    return this.apiService.put<ISaveLearnResultResponse>('learn', words);
  }
}
