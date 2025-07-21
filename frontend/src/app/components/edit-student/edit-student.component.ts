import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {AppServiceService} from '../../app-service.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentData: any;
  id: string | number | undefined;

  constructor(private service: AppServiceService, private router: Router) {
    // Try to get id from navigation state (when navigated from within app)
    const navigation = this.router.getCurrentNavigation();
    this.id = navigation?.extras?.state?.id;
    // If not found, try to get from localStorage or fallback (for direct URL access)
    if (!this.id) {
      const storedId = window.history.state?.id;
      if (storedId) {
        this.id = storedId;
      }
    }
  }

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData(): void {
    if (this.id === undefined || this.id === null) {
      console.error('No student id found in navigation state or URL');
      return;
    }
    const student = { id: this.id };
    this.service.getOneStudentData(student).subscribe((response: any) => {
      this.studentData = response[0];
    }, (error: any) => {
      console.log('ERROR - ', error);
    });
  }

  editStudent(values: any): void {
    if (this.id === undefined || this.id === null) {
      console.error('No student id found in navigation state or URL');
      return;
    }
    values.id = this.id;
    this.service.editStudent(values).subscribe((response: any) => {
      this.studentData = response[0];
    }, (error: any) => {
      console.log('ERROR - ', error);
    });
  }

}
