import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TextingService {
  private subjectMap = {};
  public errorSubjectName = 'error';
  public successSubectName = 'success';
  constructor(private http: HttpClient) {
    this.subjectMap[this.errorSubjectName] = new Subject<any>();
    this.subjectMap[this.successSubectName] = new Subject<any>();
  }

  public getSubject(subjectName: string) {
    return this.subjectMap[subjectName].asObservable();
  }

}
