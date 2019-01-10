import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';

import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: ''
  };
  users: User[];
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = false;
  showUserForm: boolean = false;
  @ViewChild('userForm') form: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // this.users = this.dataService.getUsers();

    // this.loaded = true;
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
      this.loaded = true;
    });
  }

  onSubmit({ value, valid }: { value: User; valid: boolean }) {
    if (!valid) {
      console.log('Form is not Valid');
    } else {
      this.dataService.addUser(value);
      this.form.reset();
    }
  }

  // toggleHide(user: User) {
  //   // if (user.hide) {
  //   //   return (user.hide = false);
  //   // } else {
  //   //   return (user.hide = true);
  //   // }
  //   // 2nd Refactor
  //   // return user.hide ? (user.hide = false) : (user.hide = true);
  //   // Final Refactor
  //   user.hide = !user.hide;
  // }
}
