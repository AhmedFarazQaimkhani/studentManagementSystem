import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private currentUser: BehaviorSubject<null>;
	user: Observable<null>;

	constructor() {
		this.currentUser = new BehaviorSubject(JSON.parse(localStorage.getItem('login')));
		this.user = this.currentUser.asObservable();
	}

	login(data: any) {
		let islogin: boolean = true;
		var data: any = Object.assign({}, data, islogin);
		localStorage.setItem('login', JSON.stringify(data));
		this.currentUser.next(data);
	}

	public logout() {
		localStorage.removeItem('login');
		this.currentUser.next(null);
	}
}
