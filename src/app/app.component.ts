import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor(){
    debugger;
    this.createForm()
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null) {
      const parseData = JSON.parse(oldData);
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name, Validators.required),
      city: new FormControl(this.employeeObj.city, Validators.required),
      address: new FormControl(this.employeeObj.address, Validators.required),
      contactNo: new FormControl(this.employeeObj.contactNo, Validators.required),
      password: new FormControl(this.employeeObj.password, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
      state: new FormControl(this.employeeObj.state, Validators.required),
      pinCode: new FormControl(this.employeeObj.pinCode ,Validators.required),
      emailId: new FormControl(this.employeeObj.emailId ,[Validators.required, Validators.email])
    })
  }

  onSave(){
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empid'].setValue(parseData.length +1);           
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
  }
}
