# httpResource in Modern Angular (v19+)

This project demonstrates how to use Angular's new **httpResource** API
for fetching data in a signal-based way.

In traditional Angular apps, fetching data usually means managing
multiple things manually: - data - loading state - errors -
subscriptions - RxJS operators

`httpResource` simplifies all of this by wrapping everything into a
single reactive object.

------------------------------------------------------------------------

## What is httpResource?

`httpResource` is a signal-based wrapper around Angular's `HttpClient`.

It automatically manages: - API data - loading state - errors - request
lifecycle - re-fetching when dependencies change

Instead of manually subscribing and managing flags, you declare how data
should be fetched --- Angular handles the rest.

------------------------------------------------------------------------

## What does it return?

When you create a resource:

``` ts
users = httpResource(() => ({
  url: '/api/users'
}));
```

You get a reactive resource object with built-in signals:

-   `users.value()` → API data\
-   `users.isLoading()` → loading state\
-   `users.error()` → error details\
-   `users.status()` → Idle \| Loading \| Resolved \| Error\
-   `users.update()` → update local data without refetching

------------------------------------------------------------------------

## Why use httpResource?

### 1. Less boilerplate

Traditional approach requires: - loading variables - error variables -
subscriptions - RxJS operators

With httpResource, everything is handled automatically.

------------------------------------------------------------------------

### 2. Automatic re-fetching

If your request depends on signals:

``` ts
query = signal('');

users = httpResource(() => ({
  url: `/api/users?q=${this.query()}`
}));
```

Whenever `query` changes: - old request is cancelled - new request is
fired - no switchMap needed

------------------------------------------------------------------------

### 3. Built-in loading and error handling

No need to manually manage flags.

Template usage:

``` html
@if (users.isLoading()) { ... }
@if (users.error()) { ... }
```

------------------------------------------------------------------------

### 4. Local state updates

You can update fetched data without calling the API again:

``` ts
addUser() {
  this.users.update(list => [
    ...list,
    { id: Date.now(), name: 'New User' }
  ]);
}
```

UI updates instantly.

------------------------------------------------------------------------

### 5. Cleaner templates

Old Angular:

``` html
<div *ngIf="users$ | async as users">
```

Modern Angular:

``` html
@for (user of users.value()) {
  <li>{{ user.name }}</li>
}
```

No async pipe. No subscriptions.

------------------------------------------------------------------------

## Classic HttpClient vs httpResource

  Feature                   HttpClient + RxJS   httpResource
  ------------------------- ------------------- -----------------------
  Loading state             Manual              Automatic
  Error handling            Manual              Automatic
  Subscriptions             Required            Not required
  Refetch on input change   switchMap needed    Built-in
  Boilerplate               High                Low
  Template binding          AsyncPipe           Direct signals
  Local updates             Hard                Easy with `.update()`

------------------------------------------------------------------------

## When to use httpResource

Best for: - GET APIs - search pages - dashboards - filtered lists -
reactive data screens - server data that changes with user input

------------------------------------------------------------------------

## When NOT to use it

For actions like: - POST - PUT - DELETE - Save / Submit buttons

Use regular `HttpClient`.

Example:

``` ts
saveUser() {
  this.http.post('/api/users', body).subscribe(() => {
    this.users.reload();
  });
}
```

------------------------------------------------------------------------

## Important Note

`httpResource` is currently experimental (introduced in Angular 19). The
API may change slightly in future versions, but it reflects Angular's
shift toward signal-based data handling.

------------------------------------------------------------------------

## Mental Model

-   HttpClient → sends requests
-   httpResource → manages request state reactively

It shifts Angular from imperative fetching to declarative data flow.

------------------------------------------------------------------------

## Summary

`httpResource` makes data fetching: - simpler - reactive -
signal-friendly - less error-prone - easier to maintain

It removes much of the RxJS-heavy boilerplate and fits naturally into
Angular's signal-based architecture.
