import { Component } from '@angular/core';
import { TaskServiceService } from '../../../service/task-service.service';
import { OnInit } from '@angular/core';
import { Task } from '../../../model/models/task';
import { CommonModule } from '@angular/common';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,TaskDetailComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  taskData:Task[] = [];
  id:number=0;
  constructor(private taskService:TaskServiceService,private router:Router){}
  ngOnInit() {
      console.log("inside the tasklist oninit");
      this.taskService.getTasks().subscribe((data)=>
      (
        this.taskData=data
      ));
  }
  onClickView(id:number)
  {
    console.log("on click of view",id);
   
    this.id=id;
    this.router.navigate(['/taskdetail',this.id]);
  }
  onTaskStatusChange(id:number,checked:boolean): void
  {
    this.taskService.updateTaskStatusById(id,checked);
  }

  onClickEdit(id:number)
  {
    console.log("on edit task");
    this.id=id;
    this.router.navigate(['/edit-task',this.id]);
  }
 
  onSubmit()
  {
    console.log("on submit of add task");
    this.router.navigateByUrl("/addTask");
  }
  
}
