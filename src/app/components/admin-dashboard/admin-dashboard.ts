import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TreeTableModule } from 'primeng/treetable';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    HttpClientModule,
    CommonModule,
    TableModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    TreeTableModule,
    FloatLabelModule,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  stores: any[] = [];
  showAddDialog: boolean = false;

  newStore = {
    location: '',
  };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStores();
  }

  fetchStores() {
    this.http.get<any[]>('http://localhost:8087/api/store').subscribe({
      next: (data) => {
        this.stores = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load stores', err);
      },
    });
  }

  createStore() {
    if (!this.newStore.location.trim()) {
      return; // skip if input is empty or just spaces
    }

    this.http
      .post('http://localhost:8087/api/store/create', this.newStore)
      .subscribe({
        next: () => {
          this.fetchStores(); // ✅ Reload the updated store list
          this.showAddDialog = false; // ✅ Close the dialog
          this.newStore.location = ''; // ✅ Clear the input field
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error creating store:', err); // ✅ Handle backend errors
        },
      });
  }
}
