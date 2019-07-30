import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {
  textForm: FormGroup;
  isSubmitted  =  false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.textForm  =  this.formBuilder.group({
      message: ['', Validators.required],
      numbers: ['', Validators.required]
    });
  }

  get formControls() { return this.textForm.controls; }

  public sendMessages() {
    console.log('sending messages');
    if (this.textForm.valid) {
      // split the strings by comma
      // put in format +1123456789
      // send to aws
    }
  }

}
