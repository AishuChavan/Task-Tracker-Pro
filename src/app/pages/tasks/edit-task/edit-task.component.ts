import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { TaskServiceService } from '../../../service/task-service.service';
import { Task } from '../../../model/models/task';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})

export class EditTaskComponent implements OnInit {
  id=1;
  editForm!:FormGroup;
  TaskData:Task | undefined;
  constructor(private route:ActivatedRoute,
              private taskService:TaskServiceService,
              private fb:FormBuilder,
              private router:Router){}

  ngOnInit(): void {
        this.id=Number(this.route.snapshot.paramMap.get('id'));
        this.taskService.getTaskById(this.id).subscribe({
          next:(task)=>{
          if(task)
          {
              this.TaskData=task;
              this.editForm=this.fb.group(
              {
                
                title:[task.title],
                completed:[task.completed]
              }
            );
          }
          else
          {
            alert('Task not found');
            this.router.navigate(['/taskList']);
          }  
        },
        error:()=>
        {
          alert('Error fetching task');
          this.router.navigate(['/taskList']);
        }

    })

  }

  onSubmit():void{
    if(this.editForm.valid)
    {
      const updatedTask:Task={
        ...this.TaskData,
        ...this.editForm.value
      };
      this.taskService.editTaskById(this.id,updatedTask);
      alert('Task updated successfully');
      this.router.navigate(['/taskList']);
    }
    else
    {
      alert('Form is invalid');
    }
  }



}
