import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	title = 'Student Management';
	login: boolean;
	subscription: Subscription;

	constructor(private route: Router, private user: LoginService) {}

	ngOnInit() {
		this.subscription = this.user.user.subscribe((msg) => {
			if (msg) {
				this.login = true;
			} else {
				this.login = false;
			}
		});
	}

	logout() {
		this.user.logout();
		this.route.navigateByUrl('');
	}
}
