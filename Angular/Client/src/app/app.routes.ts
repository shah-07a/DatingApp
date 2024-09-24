import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailsComponent } from './components/members/member-details/member-details.component';
import { ListComponent } from './components/list/list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { authGuard } from './_guard/auth.guard';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    { //===Dummy Route ===
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children:
        [
            {path: 'members', component: MemberListComponent},
            {path: 'members/:id', component: MemberDetailsComponent},
            {path: 'list', component: ListComponent},
            {path: 'messages', component: MessagesComponent},
        ]
    },
  //=== apply auth gaurd to a route=== {path: 'members', component: MemberListComponent, canActivate: [authGuard]},
    
    {path: '**', component: HomeComponent, pathMatch: 'full'}
];
