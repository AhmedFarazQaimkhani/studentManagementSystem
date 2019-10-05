import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClassComponent } from './add-class/add-class.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AppComponent } from './app.component';

const routes: Routes = [
	{
		path: '',
		component: AddStudentComponent
	},
	{
		path: 'add-class',
		component: AddClassComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
