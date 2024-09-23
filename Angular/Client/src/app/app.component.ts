import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { error } from 'console';
import { response } from 'express';
import { NavComponent } from "./components/nav/nav.component";
import { AccountService } from './_services/account.service';
import { stringify } from 'querystring';
import { HomeComponent } from "./components/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  //===Injecting web api service end point ===
  private accountService = inject(AccountService);
  title = 'Angular Dating Appilication';

  ngOnInit(): void {
      this.setCurrentUser();
  }

  setCurrentUser()
  {
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
 
}
