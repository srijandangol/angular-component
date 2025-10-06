import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseTableRequest, BaseTableResponse } from '../models/table-column.model';

@Injectable({ providedIn: 'root' })
export class BaseTableService {
  constructor(private http: HttpClient) { }

  fetch(request: BaseTableRequest): Observable<BaseTableResponse<any>> {
    const endpoint = request.endpoint || 'http://localhost:3000/users';

    // Build query parameters
    const params = new URLSearchParams();
    params.set('page', request.page.toString());
    params.set('pageSize', request.pageSize.toString());

    if (request.sort) {
      params.set('sort', `${request.sort.field}:${request.sort.direction}`);
    }


    const fullUrl = `${endpoint}?${params.toString()}`;
    console.log('API Service - Making request to:', fullUrl);
    console.log('API Service - Request object:', request);

    return this.http.get<any>(fullUrl).pipe(
      map((res) => {
        console.log('API Service - Response received:', res);
        return {
          total: res.total || res.length,
          items: res.items || res
        };
      })
    );
  }
}
