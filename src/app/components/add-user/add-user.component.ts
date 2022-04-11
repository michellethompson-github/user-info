import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

  }

  addUser() {
    let Record = {};
    Record['username'] = this.form.value.username;
    Record['address'] = this.form.value.address;
    Record['contact'] = this.form.value.contact;
    Record['age'] = this.form.value.age;
    Record['experience'] = this.form.value.experience;
    Record['date'] = this.convert(this.form.value.date);

    this.userService.createUser(Record).then(res => {
      this.form.reset();
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


}
