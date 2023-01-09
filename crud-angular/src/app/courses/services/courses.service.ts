import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Course } from './../model/course';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json'

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Course[]>(this.API)
    .pipe(
      first(),
      tap( courses => console.log(courses))
    )
  }
}
