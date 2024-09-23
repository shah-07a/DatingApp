import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../_models/users';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //=== Injecting Web Api =====//
  private http = inject(HttpClient);  
  currentUser = signal<User | null>(null); //Save loging info
  baseUrl = 'https://localhost:7093/api/';

  Login(model:any)
  {
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map(user => {
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);

        }
      })
    );
  }
 
  Register(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }
  Logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  
}
