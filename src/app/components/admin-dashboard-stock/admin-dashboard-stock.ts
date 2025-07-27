import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model';
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
  templateUrl: './admin-dashboard-stock.html',
  styleUrls: ['./admin-dashboard-stock.css'],
})
export class AdminDashboardStockComponent implements OnInit {
  stores: any[] = [];
  selectedStore: any = null;
  storeId: string = '';
  stocks: any[] = [];

  newStock = {
    productId: '',
    quantity: 0,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStores(); // load list of stores initially
  }

  fetchStores(): void {
    this.http.get<any[]>('http://localhost:8087/api/store/all').subscribe({
      next: (data) => {
        this.stores = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  onStoreSelect(event: any): void {
    const selected = event.data;
    if (selected && selected.id) {
      this.storeId = selected.id;
      this.fetchStocks();
    }
  }

  fetchStocks(): void {
    if (!this.storeId) return;

    this.http
      .get<any[]>(`http://localhost:8087/api/store/${this.storeId}/stock`)
      .subscribe({
        next: (data) => {
          this.stocks = data;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error fetching stocks:', err);
        },
      });
  }

  createStock(): void {
    if (!this.newStock.productId.trim() || this.newStock.quantity < 0) {
      return;
    }

    const payload = {
      storeId: this.storeId,
      productId: this.newStock.productId,
      quantity: this.newStock.quantity,
    };

    this.http
      .post('http://localhost:8087/api/store/stock/create', payload, {
        headers: { 'X-API-Version': 'v1' },
      })
      .subscribe({
        next: () => {
          this.newStock = { productId: '', quantity: 0 };
          this.fetchStocks();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error creating stock:', err);
        },
      });
  }
}
