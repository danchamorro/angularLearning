import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor() {}

  ngOnInit() {
    this.users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        address: {
          street: '50 Main st',
          city: 'Boston',
          state: 'MA'
        }
      },
      {
        firstName: 'Chris',
        lastName: 'Mike',
        age: 22,
        address: {
          street: '05 Main st',
          city: 'Boston',
          state: 'MA'
        }
      },
      {
        firstName: 'Eric',
        lastName: 'Smith',
        age: 40,
        address: {
          street: '150 Main st',
          city: 'Boston',
          state: 'MA'
        }
      }
    ];
  }
}
