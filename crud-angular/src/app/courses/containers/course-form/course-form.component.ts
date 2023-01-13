import { Course } from './../../model/course';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  })

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
    ){
    //this.form = this.formBuilder.group({
      //name: [''],
      //category: ['']
    //})
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course']
    console.log(course)
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe(
      result =>
        this.onSucess(),
      error =>
        this.onError()

    )
  }

  onCancel(){
    this.location.back()
  }

  private onSucess(){
    this.snackBar.open('Curso salvo com sucesso!', '', {duration: 3000})
    this.onCancel()
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso.', '', {duration: 3000})
  }

}
