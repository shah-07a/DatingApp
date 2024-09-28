import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailsComponent } from './components/members/member-details/member-details.component';
import { ListComponent } from './components/list/list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { authGuard } from './_guard/auth.guard';
import { TestErrorsComponent } from './components/errors/test-errors/test-errors.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';


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
    {path: 'errors', component: TestErrorsComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: '**', component: HomeComponent, pathMatch: 'full'}
];
