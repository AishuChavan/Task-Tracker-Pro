import { Component,NgModule,OnInit } from '@angular/core';
import featurData from "./../../../assets/data/feature.json";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  featureData=featurData;
  ngOnInit():void{
    console.log(featurData);
  }

  constructor(private router:Router){}
  onClick()
  {
    console.log("inside the click");
    this.router.navigateByUrl('/login');
  }
}
