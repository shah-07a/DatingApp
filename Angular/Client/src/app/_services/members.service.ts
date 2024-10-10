//===import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
//=== import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  //=== private accountServices = inject(AccountService);
  baseUrl = environment.apiUrl;
  
  getMembers() {
    //=== return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string) {
    //=== return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getHttpOptions());   
      return this.http.get<Member>(this.baseUrl + 'users/' + username);   
  }

  getMemberById(id: number) {
    //=== return this.http.get<Member>(this.baseUrl + 'users/' + id, this.getHttpOptions());
    return this.http.get<Member>(this.baseUrl + 'users/' + id)
  }
/*=== It can be achieved through interceptor ===
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accountServices.currentUser()?.token}`
      })
    };
  }
  ===*/
}
