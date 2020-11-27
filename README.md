# React App for Ultimate AI Test.

steps to run the project

1) clone the project.

2) execute 'npm install' to install dependencieis.

3) execute 'npm run start' to start the project

## Problem Statement.
- Your page allows users to get an overview over all the pretrained
intents that are available (see intents.json).
- Clients can see what each intent is used for and see at least one
example expression without any extra clicks.
- Clients can select/unselect intents individually or all at once.
- There is no need to persist the selection upon reloading the page.

## Project Explanation

As there is no backend, the changes are persistant only on frontend and will be lost if you refresh. we use React hooks to maintain persistence behavior on frontned


### Home page 


### Directory Structure

Styled folder has all the reusable style components.

Core folder has a navigation component and redux folder which contain store management.

pages folder has the viewable pages components.

Theme folder stores the color scheme that is used throughout the project.


### The tech stack and libraries.

Redux and Redux-saga is used as default store to get data.

React-hooks are used to maintain state throughout the project.

Styled-components are used as default style provider instead of css/sass.


