import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Task } from '../../../model/models/task';
import { TaskServiceService } from '../../../service/task-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit{
  
  constructor(private TaskService:TaskServiceService,private route:ActivatedRoute,private router:Router){}
  id=0;
  taskDetails:Task|undefined;
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id inside the task details ",this.id);
      // this.TaskService.getTaskById(this.id).subscribe((data)=>(
      //   this.taskDetails=data
      // ));
      
     this.TaskService.getTaskById(this.id).subscribe((task) => {
      this.taskDetails = task;
      console.log("Task Details:", this.taskDetails);
    });
  }
 
}

