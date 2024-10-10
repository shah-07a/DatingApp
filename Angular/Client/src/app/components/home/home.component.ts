import { Component, inject, OnInit } from '@angular/core';
import { register } from 'module';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
//===Injecting web api service end point ===
//===  http = inject(HttpClient);
  registerMode = false;  
 users : any;
  /*===
  ngOnInit(): void {
    this.getUsers();
  }
    ===*/
  registerToggle()
  {
    this.registerMode = !this.registerMode
  }

  cancelRegisterMode(event: boolean)
  {
    this.registerMode = event;
  }
  /*===
  getUsers()
  {
    this.http.get("https://localhost:7093/API/Users").subscribe({
      next : response =>  this.users = response,
      error : error => console.log(error),
      complete: () => console.log("Current request has completed.")
    });
  }
    ===*/
}
