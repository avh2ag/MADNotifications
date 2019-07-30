import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextingService } from '../texting.service';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {
  textForm: FormGroup;
  isSubmitted  =  false;
  constructor(private formBuilder: FormBuilder, private texting: TextingService) { }

  ngOnInit() {
    this.textForm  =  this.formBuilder.group({
      message: ['', Validators.required],
      numbers: ['', Validators.required]
    });
    console.log(this.texting);
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
