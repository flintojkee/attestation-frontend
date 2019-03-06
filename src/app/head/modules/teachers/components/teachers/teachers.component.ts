import { Component, OnInit } from '@angular/core';
import { HeadService } from '@atestattion/head/shared/head.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.sass']
})
export class TeachersComponent implements OnInit {

  constructor(private headService: HeadService) { }
  teachers = [];
  isLoaded = true;

  ngOnInit() {
    this.headService.getAllTeachers().subscribe(data => {
      this.teachers = data;
      console.log(data);
      this.isLoaded = false;
    });
  }

}
