import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextingService } from '../texting.service';
import { each } from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit, OnDestroy {
  textForm: FormGroup;
  isSubmitted = false;
  subscriptions = {};
  messageStatuses: object = {};
  numbersList: Array<string> = [];
  constructor(private formBuilder: FormBuilder, private texting: TextingService) { }

  ngOnInit() {
    this.textForm  =  this.formBuilder.group({
      message: ['', Validators.required],
      numbers: ['', Validators.required]
    });
    this._registerSubscriptions();
  }

  ngOnDestroy() {
    this._deregisterSubscriptions();
  }

  get formControls() { return this.textForm.controls; }

  public resetForm() {
    this.textForm.reset();
    this.isSubmitted = false;
  }

  public resetStatuses() {
    this.messageStatuses = {};
    this.numbersList = [];
  }

  public generateNumbersList() {
    this.numbersList = this.textForm.get('numbers').value.split(',');
    this.numbersList = this.numbersList.map((rawNumber: string) => {
      return this.texting.convertTelephoneNumber(rawNumber);
    }).filter((convertedNumber: string) => {
      return convertedNumber.length > 0;
    });
  }

  public populateStatuses() {
    this.numbersList.forEach((validNumber: string) => {
      this.messageStatuses[validNumber] = 'Pending';
    });
  }

  public sendMessages() {
    if (this.textForm.valid) {
      this.isSubmitted = true;
      this.resetStatuses();
      this.generateNumbersList();
      this.populateStatuses();
      const message = this.textForm.get('message').value;
      this.numbersList.forEach((phoneNumber: string) => {
        this.texting.sendMessage(phoneNumber, message);
      });
      // split the strings by comma
      // put in format +1123456789
      // send to aws
    }
  }

  public updatePendingMessageStatus( status: { phoneNumber: string, status: string } ) {
    this.messageStatuses[status.phoneNumber] = status.status;
  }

  private _registerSubscriptions() {
    this.subscriptions[this.texting.statusSubjectName] =
      this.texting.getSubject(this.texting.statusSubjectName)
        .subscribe( status => {
          this.updatePendingMessageStatus(status);
        });
  }

  private _deregisterSubscriptions() {
    each(this.subscriptions, (sub: Subscription, key: string) => {
      sub.unsubscribe();
    });
  }

}
