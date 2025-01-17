/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from './Employee.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-employee',
  templateUrl: './Employee.component.html',
  styleUrls: ['./Employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  employeeId = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  PhoneNo = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  employer = new FormControl('', Validators.required);


  constructor(public serviceEmployee: EmployeeService, fb: FormBuilder) {
    this.myForm = fb.group({
      employeeId: this.employeeId,
      firstName: this.firstName,
      lastName: this.lastName,
      PhoneNo: this.PhoneNo,
      email: this.email,
      address: this.address,
      employer: this.employer
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceEmployee.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.cvv.employee.Employee',
      'employeeId': this.employeeId.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'PhoneNo': this.PhoneNo.value,
      'email': this.email.value,
      'address': this.address.value,
      'employer': this.employer.value
    };

    this.myForm.setValue({
      'employeeId': null,
      'firstName': null,
      'lastName': null,
      'PhoneNo': null,
      'email': null,
      'address': null,
      'employer': null
    });

    return this.serviceEmployee.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'employeeId': null,
        'firstName': null,
        'lastName': null,
        'PhoneNo': null,
        'email': null,
        'address': null,
        'employer': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.cvv.employee.Employee',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'PhoneNo': this.PhoneNo.value,
      'email': this.email.value,
      'address': this.address.value,
      'employer': this.employer.value
    };

    return this.serviceEmployee.updateParticipant(form.get('employeeId').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceEmployee.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceEmployee.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'employeeId': null,
        'firstName': null,
        'lastName': null,
        'PhoneNo': null,
        'email': null,
        'address': null,
        'employer': null
      };

      if (result.employeeId) {
        formObject.employeeId = result.employeeId;
      } else {
        formObject.employeeId = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.PhoneNo) {
        formObject.PhoneNo = result.PhoneNo;
      } else {
        formObject.PhoneNo = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.employer) {
        formObject.employer = result.employer;
      } else {
        formObject.employer = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'employeeId': null,
      'firstName': null,
      'lastName': null,
      'PhoneNo': null,
      'email': null,
      'address': null,
      'employer': null
    });
  }
}
