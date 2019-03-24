import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
         MatCardModule,
         MatDialogModule,
         MatInputModule,
         MatTableModule,
         MatToolbarModule,
         MatMenuModule,
         MatIconModule,
         MatProgressSpinnerModule,
         MatSidenavModule,
         MatButtonToggleModule,
         MatListModule,
         MatSnackBarModule,
         MatSelectModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatAutocompleteModule,
         MatChipsModule,
         MatExpansionModule,
         MatBadgeModule,
         MatTreeModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherComponent } from './components/teacher/teacher.component';
@NgModule({
  declarations: [TeacherComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatTreeModule

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TeacherComponent,
    MatAutocompleteModule,
    MatChipsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatTreeModule

  ]
})
export class SharedModule { }
