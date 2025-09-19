import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseTableRequest, BaseTableResponse } from '../models/table-column.model';

@Injectable({ providedIn: 'root' })
export class BaseTableService {
  constructor(private http: HttpClient) {}

  fetch(request: BaseTableRequest): Observable<BaseTableResponse<any>> {
    const endpoint = request.endpoint || 'http://localhost:3000/users';

    return this.http.get<any>(endpoint).pipe(
      map((res) => ({
        total: res.total,
        items: res.items
      }))
    );
  }
}
