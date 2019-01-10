# Angular App

# Objective

To learn more about Angular.

- Setup & File Structure
- Understating Components
- Template Syntax
- Events & Forms
- Services. HTTP, Input & Output
- Angular Routing

# Includes

- Bootstrap
- Font Awesome

# Notes

## What is Angular?

Angular is a frontend Javascript framework built by Google.

- Create an App: `ng new (app name)`
- Start an App: `ng serve`

---

Angular is very similar to react as it uses components.
The main app component is found in ​`/src/app`​ and is called ​`app.component.ts​`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: '../user/user.component.html'
})
export class UserComponent {}
```

- selector: is what you will name your component when you add to the app html. Sort of like `<AppUser` in React.
- templateUrl: is the path to the html file for your component.

---

This is how you nest your component in the app.

```html
<h1>Angular App</h1>
<app-user></app-user>
```

---

You can automatically create your own components from the terminal. `ng g c components/users` this will create a component already scaffolded.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() { <-------------------- This is a life cycle method.
  }

}
```

## Property Binding

This is how to add a property on an element. You can call functions right from the button as a property.

```html
<button [disabled]="!enabledAdd" class="btn btn-light btn-block mb-3">
  Add New User
</button>
```

## Pipes

Pipes are like methods on your html element.
Set to uppercase would be :

```html
<p>My name is {{ user.name | uppercase }}</p>
```

## Events

To add an event you put the name of the event then pass in the event.

```html
<button
  (click)="fireEvent($event)"
  [disabled]="!enableAdd"
  class="btn btn-block mb-3"
></button>
```

```typescript
fireEvent(e) {
    console.log('Button Clicked');
  }
```
