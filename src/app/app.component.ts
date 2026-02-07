import { Component } from '@angular/core';
import { UserSearchComponent } from './user-search/user-search.component';

@Component({
  selector: 'app-root',
  imports: [UserSearchComponent],
  template: `
    <app-user-search class="mat-elevation-z3" />
  `,
})
export class AppComponent {}

