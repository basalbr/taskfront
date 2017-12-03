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
        id: null,
        email: null,
        name: null,
        password: null,
        created_at: null,
        updated_at: null
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

    add(): void {
        console.log(this.user);
        if (!this.user.name || !this.user.email || !this.user.password) {
            return;
        }
        this.userService.addUser(this.user as User)
            .subscribe(user => {
                this.users.push(user);
            });
        this.clear();
    }

    delete(user: User): void {
        this.users = this.users.filter(h => h !== user);
        this.userService.deleteUser(user).subscribe();
    }

    clear(): void {
        this.user.email = null;
        this.user.password = null;
        this.user.name = null;
    }

}
