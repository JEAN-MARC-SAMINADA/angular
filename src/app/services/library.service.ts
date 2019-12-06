import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LibraryDTO } from '../shared-data/library-dto';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Observable
  getAllLibraries(): Observable<LibraryDTO[]> {
    return this.http.get<LibraryDTO[]>('http://localhost:8080/libraries');
  }

  // POST : add a new libraryto the server
  addLibrary(libraryDto: LibraryDTO): Observable<string> {
    return this.http.post<string>('http://localhost:8080/libraries', libraryDto, this.httpOptions);
  }

  // Observable
  getLibrary(id: string): Observable<LibraryDTO> {
    return this.http.get<LibraryDTO>('http://localhost:8080/libraries/' + id);
  }

  // Observable
  putLibrary(id: string, libraryDto: LibraryDTO): Observable<any> {
    return this.http.put<any>('http://localhost:8080/libraries/' + id, libraryDto, this.httpOptions);
  }

  // Observable
  deleteLibrary(id: string): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/libraries/' + id);
  }

  searchValue: Subject<string> = new Subject<string>();

}
