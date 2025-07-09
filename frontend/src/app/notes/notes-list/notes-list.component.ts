import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotesService, Note } from '../../services/notes.service';
import { NotificationService } from '../../notifications/notification.service';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';  

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmModalComponent], 
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  loading = true;

  //  Modal state
  showModal = false;
  noteToDelete: number | null = null;

  constructor(
    private notesService: NotesService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notesService.getAll().subscribe({
      next: (data) => {
        this.notes = data;
        this.loading = false;
      },
      error: () => {
        this.notificationService.show('Failed to load notes.', 'error');
        this.loading = false;
      },
    });
  }

  //  Trigger confirm modal
  deleteNote(id: number) {
    this.noteToDelete = id;
    this.showModal = true;
  }

  //  Handle modal result
  confirmDelete() {
    if (this.noteToDelete === null) return;
    this.notesService.delete(this.noteToDelete).subscribe({
      next: () => {
        this.notes = this.notes.filter((n) => n.id !== this.noteToDelete);
        this.notificationService.show('Note deleted!', 'success');
        this.resetModal();
      },
      error: () => {
        this.notificationService.show('Failed to delete note.', 'error');
        this.resetModal();
      },
    });
  }

  cancelDelete() {
    this.resetModal();
  }

  private resetModal() {
    this.noteToDelete = null;
    this.showModal = false;
  }
}
