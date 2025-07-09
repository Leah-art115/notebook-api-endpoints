import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService, Note } from '../../services/notes.service';
import { NotificationService } from '../../notifications/notification.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
})
export class NoteFormComponent implements OnInit {
  note: Partial<Note> = { title: '', content: '' };
  isEdit = false;
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService,
    private notificationService: NotificationService 
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.notesService.getById(this.id).subscribe({
        next: (note) => (this.note = note),
        error: () =>
          this.notificationService.show('Note not found.', 'error'), 
      });
    }
  }

  saveNote() {
    if (!this.note.title || !this.note.content) {
      this.notificationService.show('Title and content are required.', 'warning'); 
      return;
    }

    if (this.isEdit && this.id !== null) {
      this.notesService.update(this.id, this.note).subscribe({
        next: () => {
          this.notificationService.show('Note updated!', 'success'); 
          this.router.navigate(['/notes']);
        },
        error: () =>
          this.notificationService.show('Failed to update note.', 'error'), 
      });
    } else {
      this.notesService.create(this.note).subscribe({
        next: () => {
          this.notificationService.show('Note created!', 'success'); 
          this.router.navigate(['/notes']);
        },
        error: () =>
          this.notificationService.show('Failed to create note.', 'error'), 
      });
    }
  }
}
