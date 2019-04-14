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
import { revokePositionService } from './revokePosition.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-revokeposition',
  templateUrl: './revokePosition.component.html',
  styleUrls: ['./revokePosition.component.css'],
  providers: [revokePositionService]
})
export class revokePositionComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  positionId = new FormControl('', Validators.required);
  currentEmployeeId = new FormControl('', Validators.required);
  terminationCause = new FormControl('', Validators.required);
  punctualityRating = new FormControl('', Validators.required);
  teamworkRating = new FormControl('', Validators.required);
  performanceRating = new FormControl('', Validators.required);
  cultureRating = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicerevokePosition: revokePositionService, fb: FormBuilder) {
    this.myForm = fb.group({
      positionId: this.positionId,
      currentEmployeeId: this.currentEmployeeId,
      terminationCause: this.terminationCause,
      punctualityRating: this.punctualityRating,
      teamworkRating: this.teamworkRating,
      performanceRating: this.performanceRating,
      cultureRating: this.cultureRating,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicerevokePosition.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.cvv.position.revokePosition',
      'positionId': this.positionId.value,
      'currentEmployeeId': this.currentEmployeeId.value,
      'terminationCause': this.terminationCause.value,
      'punctualityRating': this.punctualityRating.value,
      'teamworkRating': this.teamworkRating.value,
      'performanceRating': this.performanceRating.value,
      'cultureRating': this.cultureRating.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'positionId': null,
      'currentEmployeeId': null,
      'terminationCause': null,
      'punctualityRating': null,
      'teamworkRating': null,
      'performanceRating': null,
      'cultureRating': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicerevokePosition.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'positionId': null,
        'currentEmployeeId': null,
        'terminationCause': null,
        'punctualityRating': null,
        'teamworkRating': null,
        'performanceRating': null,
        'cultureRating': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.cvv.position.revokePosition',
      'positionId': this.positionId.value,
      'currentEmployeeId': this.currentEmployeeId.value,
      'terminationCause': this.terminationCause.value,
      'punctualityRating': this.punctualityRating.value,
      'teamworkRating': this.teamworkRating.value,
      'performanceRating': this.performanceRating.value,
      'cultureRating': this.cultureRating.value,
      'timestamp': this.timestamp.value
    };

    return this.servicerevokePosition.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.servicerevokePosition.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.servicerevokePosition.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'positionId': null,
        'currentEmployeeId': null,
        'terminationCause': null,
        'punctualityRating': null,
        'teamworkRating': null,
        'performanceRating': null,
        'cultureRating': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.positionId) {
        formObject.positionId = result.positionId;
      } else {
        formObject.positionId = null;
      }

      if (result.currentEmployeeId) {
        formObject.currentEmployeeId = result.currentEmployeeId;
      } else {
        formObject.currentEmployeeId = null;
      }

      if (result.terminationCause) {
        formObject.terminationCause = result.terminationCause;
      } else {
        formObject.terminationCause = null;
      }

      if (result.punctualityRating) {
        formObject.punctualityRating = result.punctualityRating;
      } else {
        formObject.punctualityRating = null;
      }

      if (result.teamworkRating) {
        formObject.teamworkRating = result.teamworkRating;
      } else {
        formObject.teamworkRating = null;
      }

      if (result.performanceRating) {
        formObject.performanceRating = result.performanceRating;
      } else {
        formObject.performanceRating = null;
      }

      if (result.cultureRating) {
        formObject.cultureRating = result.cultureRating;
      } else {
        formObject.cultureRating = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'positionId': null,
      'currentEmployeeId': null,
      'terminationCause': null,
      'punctualityRating': null,
      'teamworkRating': null,
      'performanceRating': null,
      'cultureRating': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
