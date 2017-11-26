import {Injectable} from '@angular/core';

import {MessageService} from "./message.service";
import {User} from './user';
import {USERS} from './mock-users';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class UserService {

    constructor(private messageService: MessageService) {
    }

    getUsers(): Observable<User[]> {
        this.messageService.add('Carregou lista de usuários');
        return of(USERS);
    }

    getUser(id: number): Observable<User> {
        this.messageService.add(`Pegou o usuário ${id}`);
        return of(USERS.find(user => user.id === id));
    }
}
