# CustomerCase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

The project is composed of the following components.

1. The API server using the express
2. The Front-end using the angular

<br/>

## Features

- JWT based user control
- Role based access control
- User Interface based on Angular Material

<br/>

## Requirements & Features

- task list

- status input (status is impression of workflow)

- sort by status

- search task

- add role based access feature

  - Authorization Router Guard

  - `ngxAllow` Structural Directive

  - Backend: `checkIfAuthorized` middleware

<br/>

## How to run servers

- ### API server

  Run `npm run server` for the API server.

- ### Front-end server

  Run `npm start` for the front-end server. Navigate to `http://localhost:4200/`.

<br/>

## Components

- Login Page
  - You can login with user@gmail.com or admin@gmail.com
- Case List Page
  - Only Admin user see **_the add icon_** in the top right corner.
  - You can click the view button to see the details.
  - You can sort for each field in the table.
  - You can search in the table.
  - Sort/Pagenation/Search in the table is occurred in the front-end for the simplicity.
- Case Detail Page
  - Only Admin user see **_the Edit button_** in the top right corner.
  - You can click the company icon to return the Case List Page.
- Create/Edit Case Page
  - Status is based on the progress (Open/Investigation/Resolved)
  - Only Admin user can create/edit case page
  - Readonly columns are gray backgounded ones.
