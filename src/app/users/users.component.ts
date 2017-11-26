import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from "../user.service";



@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    user: User = {
        id: 1,
        email: 'basal_@hotmail.com',
        name: 'Aldir Baseggio Junior'
    };

    users: User[];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers().subscribe(users => this.users = users);
    }

}
