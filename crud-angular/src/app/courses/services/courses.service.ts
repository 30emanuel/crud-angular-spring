import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Course } from './../model/course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses'

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Course[]>(this.API)
    .pipe(
      first(),
      //delay(2000),
      tap( courses => console.log(courses))
    )
  }

  save(course: Course){
    return this.http.post<Course>(this.API, course)
  }

}
