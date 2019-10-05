import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
	selector: 'app-add-student',
	templateUrl: './add-student.component.html',
	styleUrls: [ './add-student.component.css' ]
})
export class AddStudentComponent implements OnInit {
	student = {
		stdId: 0,
		stdName: ''
	};
	registraion = {
		stdId: 0,
		stdName: ''
	};

	stdData = [];
	dataSource: any;
	displayedColumns: string[] = [ 'stdId', 'stdName' ];

	constructor(
		private firestore: AngularFirestore,
		private _snackBar: MatSnackBar,
		private route: Router,
		private service: LoginService
	) {}

	ngOnInit() {
		this.firestore.collection('student').valueChanges().subscribe((res) => {
			this.stdData = res;
			this.dataSource = new MatTableDataSource(this.stdData);
		});
	}

	applyFilter(filterValue: string) {
		console.log(filterValue);
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	newMember() {
		let count = this.stdData.findIndex((x: any) => x.stdId == this.registraion.stdId);
		console.log(count);
		if (count == -1) {
			this.firestore.collection('student').add(this.registraion).then((res) => {
				this._snackBar.open('Student add Successfully', 'success', {
					duration: 2000
				});
				this.registraion.stdId = 0;
				this.registraion.stdName = '';
				this.service.login(this.registraion);
				this.route.navigateByUrl('/add-class');
			});
		} else {
			this._snackBar.open('Id already used please entre another', 'error', {
				duration: 3000
			});
		}
	}

	existMember() {
		let count = this.stdData.find((x: any) => x.stdId == this.student.stdId && x.stdName == this.student.stdName);
		if (count == undefined) {
			this._snackBar.open('Login failed', 'Error', {
				duration: 2000
			});
		} else {
			this._snackBar.open('Successfully Login', 'Success', {
				duration: 3000
			});
			this.service.login(this.student);
			this.route.navigateByUrl('/add-class');
		}
	}
}
