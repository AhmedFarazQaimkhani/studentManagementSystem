import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-add-class',
	templateUrl: './add-class.component.html',
	styleUrls: [ './add-class.component.css' ]
})
export class AddClassComponent implements OnInit {
	classs = [
		{ id: 1, className: 'one' },
		{ id: 2, className: 'Two' },
		{ id: 3, className: 'Three' },
		{ id: 4, className: 'Four' },
		{ id: 5, className: 'Five' },
		{ id: 6, className: 'Six' },
		{ id: 7, className: 'Seven' },
		{ id: 8, className: 'Eight' },
		{ id: 9, className: 'Nine' },
		{ id: 10, className: 'Ten' }
	];

	enrolled = {
		stuId: 0,
		classId: 0
	};

	displayedColumns: string[] = [ 'id', 'className' ];
	dataSource = new MatTableDataSource(this.classs);
	stdData: any;
	enrolData: any;

	constructor(private firestore: AngularFirestore, private _snackBar: MatSnackBar) {}

	ngOnInit() {
		var loginData = JSON.parse(localStorage.getItem('login'));
		this.enrolled.stuId = loginData.stdId;
		console.log(loginData.stdId);

		this.firestore.collection('student').valueChanges().subscribe((res) => {
			this.stdData = res;
		});
		this.firestore
			.collection('enrolClass', (x) => x.where('stuId', '==', loginData.stdId))
			.valueChanges()
			.subscribe((res) => {
				this.enrolData = res;
			});
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	sumbit() {
		let count = this.enrolData.findIndex((x: any) => x.classId == this.enrolled.classId);
		if (count == -1) {
			this.firestore.collection('enrolClass').add(this.enrolled).then((res) => {
				this._snackBar.open('Enrolled Successfully', 'success', {
					duration: 3000
				});
			});
		} else {
			this._snackBar.open('you are alread enrolled in this class', 'error', {
				duration: 3000
			});
		}
	}

	getClassName(id: any) {
		let find = this.classs.find((x: any) => x.id == parseInt(id));
		if (find) {
			return find.className;
		}
	}

	delete(classId: string) {
		this.firestore.collection('enrolClass', (x) => x.where('classId', '==', classId)).ref.get().then((res) => {
			let id = res.docs[0].id;
			this.firestore.collection('enrolClass').doc(id).delete();
			this._snackBar.open('Delete Successfully', 'success', {
				duration: 2000
			});
		});
	}
}
