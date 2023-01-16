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
      //tap( courses => console.log(courses))
    )
  }

  loadById(id: string){
    return this.http.get<Course>(`${this.API}/${id}`)
  }

  save(course: Partial<Course>){
    if(course._id){
      return this.update(course)
    }
    return this.create(course)
  }

  private create(course: Partial<Course>){
    return this.http.post<Course>(this.API, course).pipe(first())
  }

  private update(course: Partial<Course>){
    return this.http.put<Course>(`${this.API}/${course._id}`, course).pipe(first())
  }

  remove(id: string) {
    return this.http.delete(`${this.API}/${id}`).pipe(first());
  }

}
