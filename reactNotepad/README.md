# React Notepad

Notes application provides a simple list of notes.

This task uses **React Hooks** and **React Testing Library (`@testing-library/react`)**.

This app was created with [CRA v4.0](https://github.com/facebook/create-react-app).



## Introduction

Your task is to complete simple notes application using provided `NotesService` to retrieve and update notes:
- you can choose to implement the task with either class of function React components. The tests don't check the type of components.
- you shall stick to the names of the props, so that tests don't break.
- all tests have to pass.

## Problem Statement

- Notes application should provide a simple list of notes where each note contains `id`, `title` and `text` attributes.
- Notes application should let the user make a new note or to update an existing one.
- When a new note button is clicked, an empty form should be given to the user that will append a new note to the array of existing notes.
- When an existing note is selected, the user has options to:
  - save - which will update the selected note with new `title` and `text`
  - cancel - which will deselect the note
- When there are no notes selected, `New Note` button should be displayed to the user as an option.

### 1. App and NotesService

- `NotesService` that's passed as `service` prop to `App` component should be used
- When a form is submitted, async `saveNote` method should be called on service with the updated note
- When `App` is created, async `getNotes` method should be called on service and the appropriate component show notes as a list
- When a new note is added, it should be displayed on the list
- *New Note* button should be displayed if no notes are currently selected
- *New Note* on click should call `newNote` method that puts an empty note object as a selected one
- When an existing note is saved, it should be updated on the list

### 2. Note Form

- `NoteForm` should be a stateless component. Use the `note` prop for data
- When the selected note is provided via `note` prop, title and note input fields should be populated
- When *Cancel* is clicked, tbe selected note should be reset
- When any field value changes, it should call `onChange` prop with tbe updated note object that will update the selected object appropriately
- When the form is submitted, it should call `onSubmit` with updated note object
- `onSubmit` will then use the appropriate service method and update the state accordingly

### 3. Use `NotesServices` to populate the list of notes

- Each item in the list should show a note title
- List component should not keep state, use `notes` prop
- List component should notify its parent on item click with `onSelect` prop
- When note component gets passed a note via `selected` prop, it should add `active` class to the correct list item

## Setup
Follow these steps for correct application setup :

1. `npm install` – install dependencies
2. `npm test` – run all tests (should fail unless you fix the app)
3. `npm start` – serve the app at [http://localhost:3000/](http://localhost:3000/) (it automatically opens the app in your default browser)

**Good Luck!**

