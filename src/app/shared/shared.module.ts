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
         MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
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
    MatSelectModule

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
    MatSelectModule
  ]
})
export class SharedModule { }
