import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './pages/tasks/task-list/task-list.component';
import { TaskDetailComponent } from './pages/tasks/task-detail/task-detail.component';
import { EditTaskComponent } from './pages/tasks/edit-task/edit-task.component';
import { AddTaskComponent } from './pages/tasks/add-task/add-task.component';
import { NgModule } from '@angular/core';
export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'taskList',
        component:TaskListComponent
    },
    {
        path:'taskdetail/:id',
        component:TaskDetailComponent
    },
    {
        path:'edit-task/:id',
        component:EditTaskComponent
    },
    {
        path:'addTask',
        component:AddTaskComponent
    }
];


