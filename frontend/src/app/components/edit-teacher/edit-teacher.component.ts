import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {AppServiceService} from '../../app-service.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {


  teacherData: any;


  constructor(private service : AppServiceService, private router: Router) { }

  navigation: any;

  ngOnInit(): void {
    this.navigation = this.router.getCurrentNavigation();
    this.getTeacherData();
  }

  getTeacherData(): void {
    const id = this.navigation?.extras?.state?.id;
    if (id === undefined || id === null) {
      console.error('No teacher id found in navigation state');
      return;
    }
    let teacher = { id };
    this.service.getOneTeacherData(teacher).subscribe((response: any) => {
      this.teacherData = response[0];
    }, (error: any) => {
      console.log('ERROR - ', error)
    });
  }

  editTeacher(values: any): void {
    const id = this.navigation?.extras?.state?.id;
    if (id === undefined || id === null) {
      console.error('No teacher id found in navigation state');
      return;
    }
    values.id = id;
    this.service.editTeacher(values).subscribe((response: any) => {
      this.teacherData = response[0];
    }, (error: any) => {
      console.log('ERROR - ', error)
    });
  }

}