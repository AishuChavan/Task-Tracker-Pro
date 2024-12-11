import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../model/models/task';
import { TaskServiceService } from '../../../service/task-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent  {

  formData!:FormGroup;
  submitedTask:Task|undefined;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private Fb:FormBuilder,
              private service:TaskServiceService)
  {
    this.formData=this.Fb.group({
      title:['',Validators.required],
      completed:[false],
    })
  }
  
  onSubmit()
  {
    if(this.formData.valid)
    {
      const addedTask={...this.submitedTask,...this.formData.value}
      
      if(this.service.addTask(addedTask))
      {
        console.warn("task successfully added");
        this.router.navigateByUrl('/taskList');
      }
      else
      {
        console.error("please try again!!! ");
      }
    }
  }


}
