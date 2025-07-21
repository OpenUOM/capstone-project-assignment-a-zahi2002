import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';
@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  teacherData: any;
  selected: any;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher() {
    this.router.navigate(['addTeacher'])
  }

  editTeacher(id: any): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editTeacher'], navigationExtras)
  }

  initializeDB(){
    this.service.initializeDB().subscribe((response: any) => {
      console.log('DB is Initialized')
    }, (error: any) => {
      console.log('ERROR - ', error)
    });
  }

  getTeacherData() {
    this.selected = 'Teachers';
    this.service.getTeacherData().subscribe((response: any) => {
      this.teacherData = Object.keys(response).map((key: string) => [response[key]]);
    }, (error: any) => {
      console.log('ERROR - ', error)
    });
  }

  getStudentData() {
    this.selected = 'Students';
    this.service.getStudentData().subscribe((response: any) => {
      this.teacherData = response;
    }, (error: any) => {
      console.log('ERROR - ', error)
    });
  }


  search(value: string): void {
    const searchText = value.trim().toLowerCase();
    if (searchText.length === 0) {
      this.getTeacherData();
    } else {
      this.teacherData = this.teacherData.filter((teacher: any) => {
        const name = teacher[0]?.name?.toLowerCase() || '';
        return name.includes(searchText);
      });
    }
  }


  deleteTeacher(itemid: any): void {
    const test = {
      id: itemid
    };
    this.service.deleteTeacher(test).subscribe((response: any) => {
      this.getTeacherData();
    });
  }
}
