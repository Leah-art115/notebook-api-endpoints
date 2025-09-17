// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NoteFormComponent } from './notes/note-form/note-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NotesListComponent },
  { path: 'create', component: NoteFormComponent },
  { path: 'edit/:id', component: NoteFormComponent },
  { path: '**', redirectTo: 'notes' }
];
