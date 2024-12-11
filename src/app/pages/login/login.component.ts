import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any={
    firstName:'',
    lastName:'',
    emailId:'',
    password:'',
    address:'',
    position:'Student'
  }
  constructor(private router:Router){}
  formValue:any;
  submitHandler()
  {
    this.formValue=this.loginObj;
    console.log(this.formValue);
    if(this.formValue.emailId=="admin@gmail.com" && this.formValue.password=="admin")
    {
      alert("Login Successfull...");
      localStorage.setItem("email",this.formValue.emailId);

      this.router.navigate(['/taskList']);
    }
    else
    {
      alert("Invalid credentials... please try again!")
    }
  }
}
