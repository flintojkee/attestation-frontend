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
         MatListModule
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
    MatListModule
  ]
})
export class SharedModule { }
