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

- **selector**: is what you will name your component when you add to the app html. Sort of like `<AppUser` in React.
- **templateUrl**: is the path to the html file for your component.

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

## Services

- Classes that can send functionality and data across multiple components
- Keeps components lean
- DRY - Dont Repeat Yourself
- Ideal place for Ajax calls using Http module (you're not limited to the Http module, Angular will let you use other services like Axios)

If we have data that we are fetching from a server and we need to access that data on multiple components we dont want to make that Ajax request in each component, instead we put the logic in a service one time than call that service from each component.

##### Steps To Create A Service

- Create a file `/services/my-service.service.ts`
- Import `@Injectable` and create class
- Add as a provider to `@ngModule`
- Call from component(s)

##### To Add a Service

`ng g s services/data --module=app.module`
`module=app.module` automatically adds it to the module file.

In our service file we can add our data with a method to call in our component. (Normally it would be an API call not hard coded data)

```typescript
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  users: User[];

  constructor() {
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
  }

  getUsers(): User[] { <--------------- Added method
    return this.users;
  }
}
```

Now in our user.component we can:

```typescript
import { DataService } from '../../services/data.service';
```

Then call the method in `ngOnInit`:

```typescript
ngOnInit() {
    this.users = this.dataService.getUsers();
  }
```

**_Angular 6_** You dont need to add to the providers. Its done automatically now with:

```typescript
@Injectable({
  providedIn: 'root'
})
```

**_Just make sure to restart the server for changes to take effect._**

## Observables

The way our data is hard coded now does allow our app to function correctly. But that is only because we are getting the data synchronously. Normally we would get our data from a server and that call will be asynchronous. So to handle this we use Observables in Angular. Basically this means our app is constantly watching for data streams.

Let's import it to `data.service`, also we will import `of`. This will allow us to return an array as an Observable so we can mimic asynchronous call.

```typescript
import { Observable, of } from 'rxjs';
```

Refactor our `getUsers()`:

```typescript
// getUsers(): User[] {
  //   return this.users;
  // }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
```

Then is `users.component` we refactor:

```typescript
ngOnInit() {
    // this.users = this.dataService.getUsers();

    // this.loaded = true;
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
      this.loaded = true;
    });
  }
```

## HTTP Client Setup & GET Request

- Create a Post component: `ng g c components/posts`
- Create a Service for your Post: `ng g s services/post`
- Create a Model for Post

Let's create a model/interface of what are data will be that comes back from [JSON Placeholder](https://jsonplaceholder.typicode.com/)

```typescript
export interface Post {
  id: number;
  title: string;
  body: string;
}
```

Now we want to add `HttpClientModule` into our `app.modules` and add it imports.

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    NavbarComponent,
    PostsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
```

Now we want to import `HttpClient`, `Observable` and `Post` into our Services. Then ineject the `HttpClient` as a dependency into our constructor and create a method to `getPosts()`.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }
}
```

Now we want to import `Post` and `PostService` into our Post Component. Then `subscribe` to the `observable`.

```typescript
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
```

Now we can render the posts in our HTML with `*ngFor`.

```html
<h2>Posts</h2>
<div class="card mb-3" *ngFor="let post of posts">
  <div class="card-body">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </div>
</div>
```

## HTTP Client POST Request

Create a variable for our HTTP Header, then a method to send posts in our Post Services.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

const httpOptions = { <--------------------------
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {} <----------------------

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  savePost(post: Post): Observable<Post> { <-----------------------
    return this.http.post<Post>(this.postsUrl, post, httpOptions);
  }
}
```

Now in our Post From Component we create a method to add posts and call savePost() from our Post Service.

```typescript
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  constructor(private postService: PostService) {}

  ngOnInit() {}

  addPost(title, body) {
    if (!title || !body) {
      alert('Please add post');
    } else {
      this.postService.savePost({ title, body } as Post).subscribe(post => {
        console.log(post);
      });
    }
  }
}
```
