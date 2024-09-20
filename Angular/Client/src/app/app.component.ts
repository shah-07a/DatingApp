import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  //===Injecting web api service end point ===
  http = inject(HttpClient);
  title = 'Angular Dating Appilication';
  users : any;
  ngOnInit(): void {
    this.http.get("https://localhost:7093/API/Users").subscribe({
      next : response =>  this.users = response,
      error : error => console.log(error),
      complete: () => console.log("Current request has completed.")
    });
  }
}
