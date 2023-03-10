import { Course } from './../../model/course';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
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
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    category: ['', [Validators.required]]
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

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName)

    if(field?.hasError('required')){
      return 'Campo obrigatório.'
    }

    if(field?.hasError('minlength')){
      const requiredLength: number  = field.errors ? field.errors['minlength']['requiredLength']: 5
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres.`
    }

    if(field?.hasError('maxlength')){
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength']: 100
      return `Tamanho maximo exedido de ${requiredLength} caracteres.`
    }

    return 'Campo inválido.'

  }

}
