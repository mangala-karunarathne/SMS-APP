import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { Teacher } from "src/app/models/teacher";
import { TeacherService } from "src/app/services/teacher.service";

@Component({
  selector: "app-add-teachers",
  templateUrl: "./add-teachers.component.html",
  styleUrls: ["./add-teachers.component.css"]
})
export class AddTeachersComponent implements OnInit {
  teacher: Teacher;
  teacherForm: FormGroup;
  selectedFile = null;

  fullnametxt: string = "";
  nameinitialstxt: string = "";
  teacheridtxt: string = "";
  positiontxt: string = "";
  subjecttxt: string = "";
  gendertxt: string = "";
  dobtxt: string = "";
  nictxt: string = "";
  addresstxt: string = "";
  contacttxt: string = "";
  emailtxt: string = "";
  firstadmissiontxt: string = "";
  scladmissiontxt: string = "";

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private teacherService: TeacherService
  ) {
    this.teacherForm = fb.group({
      fullname: [null, Validators.required],
      nameinitials: [null, Validators.required],
      teacherid: [null, Validators.required],
      position: [null, Validators.required],
      subject: [null, Validators.required],
      gender: [null, Validators.required],
      dob: [null, Validators.required],
      nic: [null, Validators.required],
      address: [null, Validators.required],
      contact: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      firstadmission: [null, Validators.required],
      scladmission: [null, Validators.required],
      file: [null, null]
    });
  }

  ngOnInit() {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  Save(data) {
    if (this.teacherForm.invalid) return;

    Swal.showLoading();

    data.file = this.selectedFile;

    this.teacherService.registerTeacher(data).subscribe(
      data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        }).then(result => {
          this.router.navigate(["./home/admin/teachers"], {});
        });
      },
      error => {
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.error
        });
      }
    );
  }

  getError(texttype) {
    return texttype.hasError("required")
      ? "You must enter a value"
      : texttype.hasError("email")
      ? "Not a valid email"
      : "";
  }
}
