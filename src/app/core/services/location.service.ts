import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Province {
  id: number;
  name: string;
  districts: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:3000'; // JSON Server URL

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.apiUrl}/provinces`);
  }

  getDistricts(provinceId: number): Observable<string[]> {
    return this.http.get<Province>(`${this.apiUrl}/provinces/${provinceId}`).pipe(
      map(province => province.districts || [])
    );
  }
}
