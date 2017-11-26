import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserDetailComponent} from "./user-detail/user-detail.component";

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'users', component: UsersComponent},
    {path: 'user/:id', component: UserDetailComponent},
    {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
