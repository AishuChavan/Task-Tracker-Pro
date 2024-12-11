import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/models/task';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  //api url
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  //to notify the updation of task 
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  // Observable for components to subscribe to task updates
  tasks$ = this.tasksSubject.asObservable();

  //constructor called
  constructor(private http:HttpClient) { 
    this.loadTasks();
  }
 
  private loadTasks():void
  {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this.tasksSubject.next(tasks); // Initialize BehaviorSubject with the fetched tasks
    });
  }

  //get task function called
  getTasks():Observable<Task[]>
  {
    return this.tasks$;
  }

  //indivual function called
  getTaskById(id:number): Observable<Task| undefined>
  {
    return this.tasks$.pipe(
      map((tasks) => tasks.find((task) => task.id === id))
    );
    
  }

  //updation in the task
  updateTaskStatusById(id:number,checked:boolean):void{

    //get tha task list data
    const tasks=this.tasksSubject.value;
    const taskIndex=tasks.findIndex((task)=>task.id === id)


    if(taskIndex !== -1)
    {
      console.log("inside checked service update func");
      tasks[taskIndex].completed=checked;
    }
    else
    {
      console.error(`task with Id ${id} not found`);
    }
   
  }


 
  editTaskById(id: number, updatedTask: Task): void {
    // Get the current task list
    const tasks = [...this.tasksSubject.value]; // Create a copy to avoid direct mutation
    const taskIndex = tasks.findIndex((task) => task.id === id);
    
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask }; // Update the task
      this.tasksSubject.next(tasks); // Push updated task list to BehaviorSubject
      console.log(`Task with ID ${id} updated successfully`);
    } else {
      console.error(`Task with ID ${id} not found`);
    }
  }
    
  //add task 
  addTask(taskData: Task):boolean
  {
    if(taskData)
    {
      const tasks=this.tasksSubject.value;
      tasks.push({...taskData , id:tasks.length + 1});
      return true;
    }
    else
    {
      console.error("taskData not found");
      return false;
    }
    
  }
}
