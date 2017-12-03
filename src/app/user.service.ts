import {Injectable} from '@angular/core';

import {MessageService} from "./message.service";
import {User} from './user';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()
export class UserService {
    private usersUrl = 'http://localhost/taskserver/users';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJiZjI5NTA0YWI2NzdmNTVhNDRmZGFiZTVmYmRjODNkNjFkZTBmOWEyYzE4ZmQ' +
                '5OTQyMWJkZjRkZGM4MGM5OGRhYmQ5MGMxY2VkYzA2MzA3In0.eyJhdWQiOiIyIiwianRpIjoiMmJmMjk1MDRhYjY3N2Y1NWE0NGZkYWJlNWZiZGM4' +
            'M2Q2MWRlMGY5YTJjMThmZDk5NDIxYmRmNGRkYzgwYzk4ZGFiZDkwYzFjZWRjMDYzMDciLCJpYXQiOjE1MTA1NzcyMTcsIm5iZiI6MTUxMDU3NzIxNywiZXhw' +
            'IjoxNTQyMTEzMjE3LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.bOuBaFNxEpkn0DtUxe78kzsLdFWw1RXJwMZ6eEiQToyZd3cbFj1zM24OL8z3b4v4Iht1n4j' +
            'CEJ8VeCf91TyTYs1c1h2w1a0I6b3b8uTzXEENX9jdwec5A_OIcMPygbDHDX_iJcN03fcls6iTcJA7zv1kd9130aoKhWDnf_qzwrraPzR_seurGRjKj2IqCC' +
            'D-mxs0O0F2CPZjVAClmobe87v3QfSfrrfqdnR-bNXa71HQyVEDo0mEIbzj4swEGhCp6pJAgbeg-Vcq1MNQhg7q0zCOgc6bKFsb2j2rp9X-ucGfB2oaMi5nVF' +
            'pk1gv7VYUgMweXRyF4vkDBWZAbtOwP22aSYtmCiUlJAeOLMHDSk9aCp2RexnHlfGHHsaoU7ri3ZD6Bjjcz-imyg-a4Nkt5nwYtLeilEfISUV9zkxHwvdEhHc' +
            'rn-7Jk_SeZDVEUa7LaffLpH9AuSOlMifBlHfKnAaRqlAxJfq2xm-lflyitXNFDFkNnvTkFgp6PfWBW7ztncrphgiFVG-8V1-HPiJuUtvJoOae271PtA2NyUm0' +
            '6Rqj2NOsWhrPZJ0TRPuAXHBRjHH2Jidz9H_ABfnM69Lb1no_RWL1eZmCa8IJp8L_MngmnSSFf7WEZT2-TgRSeKJxFCQ_rV3-IiJk0CnXD4Ps3_m' +
            'SCDC0xov3WQy84q4uqUhg'
        })
    };

    constructor(private http: HttpClient,
                private messageService: MessageService) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl, this.httpOptions
        ).pipe(tap(users => this.log(`fetched users`)), catchError(this.handleError('getHeroes', [])));
    }

    /** GET hero by id. Will 404 if id not found */
    getUser(id: number): Observable<User> {
        const url = `${this.usersUrl}/${id}`;
        return this.http.get<User>(url, this.httpOptions).pipe(
            tap(_ => this.log(`fetched user id=${id}`)),
            catchError(this.handleError<User>(`getUser id=${id}`))
        );
    }

    private log(message: string) {
        this.messageService.add('UserService: ' + message);
    }

    updateUser(user: User): Observable<any> {
        return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
            tap(_ => this.log(`updated user id=${user.id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

    /** POST: add a new hero to the server */
    addUser (user: User): Observable<User> {
        return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
            tap((user: User) => this.log(`added user w/ id=${user.id}`)),
            catchError(this.handleError<User>('addUser'))
        );
    }

    /** DELETE: delete the user from the server */
    deleteUser (user: User | number): Observable<User> {
        const id = typeof user === 'number' ? user : user.id;
        const url = `${this.usersUrl}/${id}`;

        return this.http.delete<User>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted user id=${id}`)),
            catchError(this.handleError<User>('deleteUser'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
