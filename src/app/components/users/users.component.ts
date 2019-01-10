import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {
    this.users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@test.com',
        isActive: true,
        registered: new Date('01/02/2018 08:30:00'),
        hide: true
      },
      {
        firstName: 'Kevin',
        lastName: 'Johnson',
        email: 'test@test.com',
        isActive: false,
        registered: new Date('03/11/2017 06:20:00'),
        hide: true
      },
      {
        firstName: 'Karen',
        lastName: 'Williams',
        email: 'test@test.com',
        isActive: true,
        registered: new Date('11/02/2016 10:30:00'),
        hide: true
      }
    ];

    this.loaded = true;
  }

  // addUser() {
  //   this.users.unshift(this.user);

  //   // This will reset form to blank values
  //   this.user = {
  //     firstName: '',
  //     lastName: '',
  //     email: ''
  //   };
  // }

  onSubmit(e) {
    e.preventDefault();
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
