import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TextingService {
  private subjectMap = {};
  public statusSubjectName = 'status';
  constructor(private http: HttpClient) {
    this.subjectMap[this.statusSubjectName] = new Subject<any>();
  }

  public getSubject(subjectName: string) {
    return this.subjectMap[subjectName].asObservable();
  }

  // needs to be in +1<areacode><number>
  public convertTelephoneNumber(rawTelNumber: string): string {
    rawTelNumber = rawTelNumber.replace(/\D/g, '');
    // must enforce 10 digit number
    if (rawTelNumber.length !== 10) {
      // make the blank string invalid
      return '';
    } else {
      return `+1${rawTelNumber}`;
    }
  }

  private sendStatus(phoneNumber: string, status: string) {
    const statusObj = {
      phoneNumber: phoneNumber,
      status: status
    };
    this.subjectMap[this.statusSubjectName].next(statusObj);
  }


  public sendMessage(phoneNumber: string, message: string) {
    if (!phoneNumber || phoneNumber.length === 0) {
      return;
    } else {
      // add the +1 to the phoneNumber
      const formattedPhoneNumber = `+1${phoneNumber}`;
      // send request
      this.sendStatus(phoneNumber, 'Error');
    }
  }

}
