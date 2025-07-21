import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  studentData: any;
  selected: any;

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent(){
    this.router.navigate(['addStudent'])
  }

  editStudent(id: any): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id : id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras )
  }

  getStudentData(): void {
    this.service.getStudentData().subscribe((response: any) => {
      this.studentData = Object.keys(response).map((key: string) => [response[key]]);
    }, (error: any) => {
      console.log('ERROR - ', error)
    });
  }

  deleteStudent(itemid: any): void {
    const student = {
      id: itemid
    }
    this.service.deleteStudent(student).subscribe((response)=>{
      this.getStudentData()
    })
  }

  search(value: string): void {
    const searchText = value.trim().toLowerCase();
    if (searchText.length === 0) {
      this.getStudentData();
    } else {
      this.studentData = this.studentData.filter((student: any) => {
        const name = student[0]?.name?.toLowerCase() || '';
        return name.includes(searchText);
      });
    }
  }
}
