import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;


    constructor(private http: HttpClientModule) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    users = [{ "userId": "abc@media.com", "password": "abc123", "userName": "Tom" },
    { "userId": "def@media.com", "password": "def123", "userName": "Dick" }];

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(userId: string, password: string) {
        const user = this.users.find(x => x.userId === userId && x.password === password);

        if (user) {
            // store user details in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }

        if (!user) {
            return this.error('Username or password is incorrect');

        }

        return this.ok({
            id: user.userId,
            username: user.userName,
            token: 'fake-jwt-token'
        });

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    error(message) {
        return throwError({ message });
    }

    ok(body?) {
        return of(new HttpResponse({ status: 200, body }))
    }
}