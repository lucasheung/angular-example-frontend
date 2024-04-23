import { Component } from '@angular/core';
import { StockService } from '../services/stock.service';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddStockDialogComponent } from '../add-stock-dialog-component/add-stock-dialog-component.component'; // Import your dialog component
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { Options } from '../../types';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatButtonModule],


})
export class HomeComponent {
  constructor(
    private stockService: StockService,
    private dialog: MatDialog,
    private loginService: LoginService
  ) { }
  stocks: any[] = []
  displayedColumns: string[] = ['stock_name', 'current_price'];
  ngOnInit() {
    let loggedIn = this.loginService.isLoggedIn()
    if (!loggedIn) {
      this.loginService.logout()
    }
    this.stockService.getStocks('http://localhost:8080/api/stock/all').subscribe(
      (data: any) => {
        this.stocks = data;// Assign the received array of Stock objects to stocks
      },
      error => {
        console.error('Error fetching stocks:', error);
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddStockDialogComponent, {
      width: '500px',
      data: {} // You can pass data to your dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      const url = 'http://localhost:8080/api/stock/add'; // Replace 'your-api-url' with your actual API endpoint
      const body = JSON.stringify(result)
      const options: Options = {
        responseType: 'text' as 'json'
      };
      this.stockService.addStock(url, result, options).subscribe(() => {
        location.reload();
      })
      console.log('The dialog was closed');
      // You can handle the result here if needed
    });
  }
}
